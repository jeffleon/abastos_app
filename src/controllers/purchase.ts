import { JsonController, Res, Body, Post, Header } from 'routing-controllers';
import { Service } from 'typedi';
import { Response } from 'express';
import PurchaseService from '../service/purchase';
import { PurchaseI } from '../types/purchase';
import ProductsService from '../service/products';

@JsonController('/purchase')
@Header("Content-Type", "application/json")
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
        return response.status(500).json({error: error});
      }
    }
    
    // @Authorized()
    // @Get('/')
    // async getAll(@Res() response: Response) {
    //   try {
    //     const products = await this._productsService.getAllProducts();
    //     return response.status(200).json({data: products});
    //   } catch(error){
    //     return response.status(500).json({error})
    //   }
    // }
  
    // @Authorized()
    // @Get('/:id')
    // async getOne(@Param('id') id: number, @Res() response: Response) {
    //   try {
    //     const product = await this._productsService.getProduct(id);
    //     if (product === null){
    //       return response.status(404).json({msg: "product not found"});
    //     }
    //     return response.status(200).json({data: product});
    //   } catch(error){
    //     return response.status(500).json({error})
    //   }
    // }
    
    // @Authorized()
    // @Put('/:id')
    // async put(@Param('id') id: number, @Body() product: ProductsI, @Res() response: Response) {
    //   try {
    //     const resp = await this._productsService.updateProduct(id, product);
    //     return response.status(200).json({data: resp});
    //   } catch(error) {
    //     return response.status(500).json({error});
    //   }
    // }
  
    // @Authorized()
    // @Delete('/:id')
    // async remove(@Param('id') id: number, @Res() response: Response) {
    //   try {
    //     const resp = await this._productsService.deleteProduct(id);
    //     return response.status(200).json({data: resp.affected});
    //   } catch(error) {
    //     return response.status(500).json({error})
    //   }
    // }
}