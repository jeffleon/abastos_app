import { JsonController, Res, Body, Post, Header, Get, Authorized} from 'routing-controllers';
import { Service } from 'typedi';
import { Response } from 'express';
import ProductsService from '../service/products';
import SaleService from '../service/sales';
import { SaleI } from '../types/sales';

@JsonController(`${process.env.APIROOT}/sales`)
@Header("Content-Type", "application/json")
@Authorized()
@Service()
export class SalesController {
    constructor(public _saleService: SaleService, public _productsService: ProductsService) { }

    @Post('/')
    async post(@Body() sale: SaleI, @Res() response: Response) {
      try {
        const resp = await this._saleService.saveSale(sale);
        // sustract in the stock
        resp.productos.forEach((product)=>{
            this._productsService.updateProduct(product.id, product);
        });
        return response.status(200).json({data: resp});
      } catch(error) {
        return response.status(500).json({error: error});
      }
    }
    
    @Get('/')
    async getSalesToday(@Res() response: Response){
      try {
        const resp = await this._saleService.getSalesToday();
        return response.status(200).json({data: resp});
      } catch(error) {
        return response.status(500).json({error: error});
      }
    }
}