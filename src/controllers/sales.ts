import { JsonController, Res, Body, Post, Header, Get, Authorized} from 'routing-controllers';
import { Service } from 'typedi';
import { Response } from 'express';
import ProductsService from '../service/products';
import SaleService from '../service/sales';
import {SaleRequestI } from '../types/sales';
import { ItemsIToProductsSale } from '../utils/cast';

@JsonController(`${process.env.APIROOT}/sales`)
@Header("Content-Type", "application/json")
@Authorized()
@Service()
export class SalesController {
    constructor(public _saleService: SaleService, public _productsService: ProductsService) { }

    @Post('/')
    async post(@Body() sale: SaleRequestI, @Res() response: Response) {
      try {
        const res = ItemsIToProductsSale(sale);
        const resp = await this._saleService.saveSale(res);
        const products = await Promise.all(sale.productos.map(async(element)=>{
          const product = await this._productsService.getProduct(element.id);
          const resultsale = await this._productsService.lessProduct(product, element);
          await this._productsService.updateProduct(product.id, resultsale);
          return resultsale;
        }));
        resp.productos = products;
        return response.status(200).json({data: resp});
      } catch(error) {
        return response.status(500).json({error: error.message});
      }
    }
    
    @Get('/')
    async getSalesToday(@Res() response: Response){
      try {
        const resp = await this._saleService.getSalesToday();
        return response.status(200).json(resp);
      } catch(error) {
        return response.status(500).json({error: error.message});
      }
    }
}