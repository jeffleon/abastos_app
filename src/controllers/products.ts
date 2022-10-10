import { JsonController, Res, Param, Body, Get, Post, Put, Delete, Header, Authorized } from 'routing-controllers';
import { Service } from 'typedi';
import { Response } from 'express';
import ProductsService from '../service/products';
import { ProductsI } from '../types/products';

@JsonController(`${process.env.APIROOT}/user/:user_id/products`)
@Header("Content-Type", "application/json")
@Authorized()
@Service()
export class ProductsController {
    constructor(public _productsService: ProductsService) { }
    
    @Get('/')
    async getAll(@Param('user_id') user_id: number,@Res() response: Response) {
      try {
        const products = await this._productsService.getAllProducts(user_id);
        return response.status(200).json({data: products});
      } catch(error){
        return response.status(500).json({error})
      }
    }
  
    @Get('/:id')
    async getOne(@Param('id') id: number, @Res() response: Response) {
      try {
        const product = await this._productsService.getProduct(id);
        if (product === null){
          return response.status(404).json({msg: "product not found"});
        }
        return response.status(200).json({data: product});
      } catch(error){
        return response.status(500).json({error: error.message})
      }
    }
  
    @Post('/')
    async post(@Body() product: ProductsI, @Res() response: Response) {
      try {
        const resp = await this._productsService.saveProduct(product);
        return response.status(200).json({data: resp});
      } catch(error) {
        return response.status(500).json({error: error.message});
      }
    }
  
    @Put('/:id')
    async put(@Param('id') id: number, @Body() product: ProductsI, @Res() response: Response) {
      try {
        const resp = await this._productsService.updateProduct(id, product);
        return response.status(200).json({data: resp});
      } catch(error) {
        return response.status(500).json({error: error.message});
      }
    }

    @Delete('/:id')
    async remove(@Param('id') id: number, @Res() response: Response) {
      try {
        const resp = await this._productsService.deleteProduct(id);
        return response.status(200).json({data: resp.affected});
      } catch(error) {
        return response.status(500).json({error: error.message})
      }
    }
}