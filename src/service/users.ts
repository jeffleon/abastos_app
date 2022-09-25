import { Service } from 'typedi';
import { Repositories } from '../config/db/config';
import { Usuarios } from '../models/users';
import { DecodedI, LoginI, UsersI } from '../types/users';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { usersConfig } from '../config/users/config';


@Service()
class UsersService {
    async createUser(user: UsersI):Promise<Usuarios> {
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
        const token = jwt.sign({
            nombre, usuario
        }, usersConfig.tokenSecret , { expiresIn: usersConfig.tokenExpire });
        verified.account.token = token;
        const response = await Repositories.Users.save(verified.account);
        delete response.contrasena;
        return response;
    }

    async logout(token: string) {
        const result = this.tokenVerifiaction(token);
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

    private tokenDecode(token: string) { 
        try{
            const {payload} = jwt.decode(token, {complete: true})
            return {validation: true, payload};
        } catch {
            return {validation:false, msg: "token decode failed"}
        }
    }
    private tokenVerifiaction(token: string) {
        try {
            const decoded = jwt.verify(token, usersConfig.tokenSecret);
            return {data: decoded, validation: true};
          } catch(err) {
            return {msg: "invalid token", validation: false}
          }
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

    async getUser(user: string) {
        const result = await Repositories.Users.findOne(
            { where:
                { usuario: user }
            }
        );
        return result;
    }
}

export default UsersService;