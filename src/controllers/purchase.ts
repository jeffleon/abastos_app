import { JsonController, Res, Body, Post, Header, Get, Put, Param, Authorized } from 'routing-controllers';
import { Service } from 'typedi';
import { Response } from 'express';
import PurchaseService from '../service/purchase';
import { paymentI, PurchaseI } from '../types/purchase';
import ProductsService from '../service/products';

@JsonController('/purchase')
@Header("Content-Type", "application/json")
@Authorized()
@Service()
export class PurchaseController {
    constructor(public _purchaseService: PurchaseService, public _productsService: ProductsService) { }

    @Post('/')
    async post(@Body() purchase: PurchaseI, @Res() response: Response) {
      try {
        const resp = await this._purchaseService.savePurchase(purchase);
        resp.productos.forEach((product)=>{
            this._productsService.updateProduct(product.id, product);
        });
        return response.status(200).json({data: resp});
      } catch(error) {
        return response.status(500).json({error: error.message});
      }
    }
    
    @Get('/debts')
    async getDebts(@Res() response: Response) {
      try {
        const resp = await this._purchaseService.getDebts();
        return response.status(200).json({data: resp});
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
        return response.status(200).json({data: resp});
      } catch(error) {
        return response.status(500).json({error: error});
      }
    }
}