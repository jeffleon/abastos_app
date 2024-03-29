import { JsonController, Res, Body, Post, Header, Get, Authorized, Param} from 'routing-controllers';
import { Service } from 'typedi';
import { Response } from 'express';
import ProductsService from '../service/products';
import SaleService from '../service/sales';
import {SaleRequestI } from '../types/sales';

@JsonController(`${process.env.APIROOT}/user/:user_id/sales`)
@Header("Content-Type", "application/json")
@Authorized()
@Service()
export class SalesController {
    constructor(public _saleService: SaleService, public _productsService: ProductsService) { }

    @Post('/')
    async post(@Param('user_id') user_id: number ,@Body() sale: SaleRequestI, @Res() response: Response) {
      try {
        sale.usuario_id = user_id;
        const resp = await this._saleService.saveSale(sale);
        await Promise.all(sale.productos.map(async(element)=> {
          const product = await this._productsService.getProduct(element.producto_id);
          const resultsale = await this._productsService.lessProduct(product, element);
          await this._productsService.updateProduct(product.id, resultsale);
          return resultsale;
        }));
        return response.status(200).json({data: resp});
      } catch(error) {
        return response.status(500).json({error: error.message});
      }
    }
    
    @Get('/')
    async getSalesToday(@Param('user_id') user_id: number, @Res() response: Response){
      try {
        const resp = await this._saleService.getSalesToday(user_id);
        return response.status(200).json(resp);
      } catch(error) {
        return response.status(500).json({error: error.message});
      }
    }
}