import { JsonController, Res, Body, Post, Header, Get, Put, Param, Authorized, Delete } from 'routing-controllers';
import { Service } from 'typedi';
import { Response } from 'express';
import PurchaseService from '../service/purchase';
import { paymentI, PurchaseRequestI } from '../types/purchase';
import ProductsService from '../service/products';

@JsonController(`${process.env.APIROOT}/user/:user_id/purchase`)
@Header("Content-Type", "application/json")
@Authorized()
@Service()
export class PurchaseController {
    constructor(public _purchaseService: PurchaseService, public _productsService: ProductsService) { }

    @Post('/')
    async post(@Param('user_id') user_id: number , @Body() purchase: PurchaseRequestI, @Res() response: Response) {
      try {
        purchase.usuario_id = user_id; 
        const resp = await this._purchaseService.savePurchase(purchase);
        await Promise.all(purchase.productos.map(async (element) => {
          const product = await this._productsService.getProduct(element.producto_id);
          const resultProduct = await this._productsService.sumAvgProduct(product, element);
          await this._productsService.updateProduct(resultProduct.id, resultProduct);
          return resultProduct;
        }));
        return response.status(200).json({data: resp});
      } catch(error) {
        return response.status(500).json({error: error.message});
      }
    }
    
    @Get('/debts')
    async getDebts(@Param('user_id') user_id: number, @Res() response: Response) {
      try {
        const resp = await this._purchaseService.getDebts(user_id);
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

    @Delete('/:id')
    async deletePurchase(@Param('id') id:number, @Res() response: Response) {
      try {
        const resp = await this._purchaseService.deletePurchase(id)
        return response.status(200).json(resp);
      } catch(error) {
        return response.status(500).json({error: error});
      }
    }

    @Get('/')
    async getPurchaseToday(@Param('user_id') user_id: number, @Res() response: Response){
      try {
        const resp = await this._purchaseService.getPurchaseToday(user_id);
        return response.status(200).json(resp);
      } catch(error) {
        return response.status(500).json({error: error});
      }
    }
}