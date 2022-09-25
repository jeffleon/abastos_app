import { JsonController, Res, Body, Post, Header, HeaderParam, Authorized } from 'routing-controllers';
import { Service } from 'typedi';
import { Response } from 'express';
import { LoginI, UsersI } from '../types/users';
import UsersService from '../service/users';

@JsonController('/users')
@Header("Content-Type", "application/json")
@Service()
export class UsersController {
    constructor(public _usersService: UsersService) { }
    @Post('/signUp')
    async singUp(@Body() user: UsersI, @Res() response: Response) {
      try {
        const resp = await this._usersService.createUser(user);
        return response.status(200).json({status:200, msg:'user created sucessfull', data: resp});
      } catch(error){
        return response.status(500).json({error: true, status:500, msg: error.message})
      }
    }
  
    @Post('/login')
    async login(@Body() user: LoginI, @Res() response: Response) {
      try {
        const result = await this._usersService.login(user);
        return response.status(200).json({status:200, msg:'user login sucessfull', data: result});
      } catch(error){
        return response.status(401).json({error: true, status:401, msg: error.message})
      }
    }
  
    @Authorized()
    @Post('/logout')
    async post(@HeaderParam('Authorization') token: string, @Res() response: Response) {
      try {
        const BearerToken = token.split(' ')[1]; 
        const resp = await this._usersService.logout(BearerToken);
        return response.status(200).json({data: resp});
      } catch(error) {
        return response.status(500).json({error: true, status:500, msg: error.message});
      }
    }
  
}