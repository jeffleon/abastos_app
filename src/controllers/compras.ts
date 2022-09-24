import { JsonController, Req, Res, Param, Body, Get, Post, Put, Delete, Header } from 'routing-controllers';
import { Service } from 'typedi';
import { Request, Response } from 'express';
import ExampleInjectedService from '../service/compras';

@JsonController()
@Header("Content-Type", "application/json")
@Service()
export class ComprasController {
    constructor(public _exampleInjectable: ExampleInjectedService) { }
    @Get('/')
    getAll(@Req() request: Request, @Res() response: Response) {
      this._exampleInjectable.printMessage();
      return response.status(200).json({'msg':'This action returns all users'});
    }
  
    @Get('/:id')
    getOne(@Param('id') id: number) {
      return 'This action returns user #' + id;
    }
  
    @Post('/')
    post(@Body() user: any) {
      return 'Saving user...';
    }
  
    @Put('/:id')
    put(@Param('id') id: number, @Body() user: any) {
      return 'Updating a user...';
    }
  
    @Delete('/:id')
    remove(@Param('id') id: number) {
      return 'Removing user...';
    }
}