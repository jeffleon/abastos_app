import { JsonController, Res, Body, Post, Header, Get, Put, Param, Authorized } from 'routing-controllers';
import { Service } from 'typedi';
import { Response } from 'express';
import PurchaseService from '../service/purchase';
import { paymentI, PurchaseRequestI } from '../types/purchase';
import ProductsService from '../service/products';
import { ItemsIToProductsPurchase } from '../utils/cast';

@JsonController(`${process.env.APIROOT}/user/:user_id/purchase`)
@Header("Content-Type", "application/json")
@Authorized()
@Service()
export class PurchaseController {
    constructor(public _purchaseService: PurchaseService, public _productsService: ProductsService) { }

    @Post('/')
    async post(@Body() purchase: PurchaseRequestI, @Res() response: Response) {
      try { 
        const res = ItemsIToProductsPurchase(purchase);
        const resp = await this._purchaseService.savePurchase(res);
        const products = await Promise.all(purchase.productos.map(async (element) => {
          const product = await this._productsService.getProduct(element.id);
          const resultProduct = await this._productsService.sumAvgProduct(product, element);
          await this._productsService.updateProduct(resultProduct.id, resultProduct);
          return resultProduct;
        }));
        resp.productos = products;
        return response.status(200).json({data: resp});
      } catch(error) {
        return response.status(500).json({error: error.message});
      }
    }
    
    @Get('/debts')
    async getDebts(@Res() response: Response) {
      try {
        const resp = await this._purchaseService.getDebts();
        return response.status(200).json(resp);
      } catch(error) {
        return response.status(500).json({error: error});
      }
    }

    @Put('/payment/:id')
    async payment(@Param('id') id: number, @Body() payment: paymentI, @Res() response: Response) {
      try {
        const purchase = await this._purchaseService.getPurchaseByID(id);
        if (!purchase) {
          return response.status(404).json({error: 'la cuenta que solicita no se encontro'});
        }
        if (purchase.valor_deuda < payment.payment) {
          return response.status(400).json({error: 'su cuenta es menor a lo que desea pagar'});
        }
        purchase.valor_deuda -= payment.payment; 
        const resp = await this._purchaseService.updatePurchase(id, purchase);
        return response.status(200).json({data: resp});
      } catch(error) {
        return response.status(500).json({error: error});
      }
    }

    @Get('/')
    async getPurchaseToday(@Res() response: Response){
      try {
        const resp = await this._purchaseService.getPurchaseToday();
        return response.status(200).json(resp);
      } catch(error) {
        return response.status(500).json({error: error});
      }
    }
}