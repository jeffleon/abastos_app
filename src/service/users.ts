import { Service } from 'typedi';
import { Repositories } from '../config/db/config';
import { Usuarios } from '../models/users';
import { DecodedI, LoginI, UsersI } from '../types/users';
import bcrypt from 'bcrypt';
import { createToken, tokenVerification } from '../utils/jwt';
import { validate } from 'class-validator';

@Service()
class UsersService {
  
    async createUser(user: UsersI):Promise<Usuarios> {
        const validation = await this.createUservalidation(user);
        if (validation instanceof Error) {
            return validation
        }
        const response = await this.getUser(user.usuario);
        if (response) {
            throw new Error("user is already created");
        }
        user.contrasena = await bcrypt.hash(user.contrasena, 8);
        const resp = await Repositories.Users.save(user);
        delete resp.contrasena;
        return resp;
    }

    async login(user: LoginI) {
        const verified = await this.userVerification(user);
        if (!verified.validation) {
            throw new Error(verified.msg);
        }
        const {nombre, usuario } = verified.account;
        const token = createToken(nombre, usuario);
        verified.account.token = token;
        const response = await Repositories.Users.save(verified.account);
        delete response.contrasena;
        return response;
    }

    async logout(token: string) {
        const result = tokenVerification(token);
        if (!result.validation){
            throw new Error(result.msg);
        }
        const resp = JSON.stringify(result.data);
        const resp_json:DecodedI = JSON.parse(resp);
        const user = await this.getUser(resp_json.usuario);
        if (!user){
            throw new Error("User don't match with token"); 
        }
        const saved = await Repositories.Users.save({...user, token: ''});
        return {msg:"user sucessfull, logOut", user: saved.nombre}
    }

    async getUser(user: string) {
        const result = await Repositories.Users.findOne(
            { where:
                { usuario: user }
            }
        );
        return result;
    }


    private async createUservalidation(user: UsersI) {
        const usuario = new Usuarios
        usuario.contrasena = user.contrasena
        usuario.nombre = user.nombre
        usuario.usuario = user.usuario
        const errors = await validate(usuario)
        if (errors.length > 0) {
            throw new Error(`Validation failed! ${errors}`)
        }
        return usuario
    }

    private async userVerification(user: LoginI) {
        const account = await this.getUser(user.usuario);
        if (!account) {
            return {validation: false, msg: "Username is not correct"};
        }
        if (!bcrypt.compareSync(user.contrasena, account.contrasena)) {
            return {validation: false, msg: "Password is not correct"};
        }
        return {validation: true, account};
    }

}

export default UsersService;