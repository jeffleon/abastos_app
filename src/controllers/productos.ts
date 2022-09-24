import { JsonController, Req, Res, Param, Body, Get, Post, Put, Delete, Header } from 'routing-controllers';
import { Service } from 'typedi';
import { Request, Response } from 'express';
import ProductsService from '../service/productos';
import { ProductsI } from '../types/products';

@JsonController()
@Header("Content-Type", "application/json")
@Service()
export class ComprasController {
    constructor(public _productsService: ProductsService) { }
    @Get('/')
    getAll(@Req() request: Request, @Res() response: Response) {
      return response.status(200).json({'msg':'This action returns all users'});
    }
  
    @Get('/:id')
    getOne(@Param('id') id: number) {
      return 'This action returns user #' + id;
    }
  
    @Post('/')
    async post(@Body() product: ProductsI, @Res() response: Response) {
      const resp = await this._productsService.saveProduct(product);
      return response.status(200).json(resp);
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