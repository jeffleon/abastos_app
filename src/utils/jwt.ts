import jwt from 'jsonwebtoken';
import { usersConfig } from '../config/users/config';

export function tokenVerification(token: string) {
    try {
        const decoded = jwt.verify(token, usersConfig.tokenSecret);
        return {data: decoded, validation: true};
      } catch(err) {
        return {msg: "invalid token", validation: false}
      }
}

export function createToken(nombre:string, usuario:string){
    const token = jwt.sign({
        nombre, usuario
    }, usersConfig.tokenSecret , { expiresIn: usersConfig.tokenExpire });
    return token;
}