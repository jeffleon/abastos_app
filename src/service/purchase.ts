import { Service } from 'typedi';
import { Repositories } from '../config/db/config';
import { PurchaseI, PurchaseProductsI, PurchaseRequestI } from '../types/purchase';
import { MoreThan, Between  } from "typeorm";
import { todayHelper } from '../utils/dates';
import { Compras } from '../models/purchase';
import { validate } from 'class-validator';

@Service()
class PurchaseService {
    async savePurchase(purchase: PurchaseRequestI):Promise<PurchaseI> {
        const validation = await this.createPurchaseValidation(purchase);
        if (purchase instanceof Error) {
          return validation; 
        }
        const product = await Repositories.Purchase.save(purchase);
        const productWithPurchase = purchase.productos.map((element)=>{
          return {...element, compra: product}
        })
        await this.saveProductPurchase(productWithPurchase)
        return product;
    }

    async saveProductPurchase(productPurchase: PurchaseProductsI[]) {
      const response = await Repositories.ProductPurchase.save(productPurchase)
      return response
    }

    async deletePurchase(id:number) {
      const del = await Repositories.Purchase.delete(id);
      return del;
    }

    async getTotalValuePurchase(purchase:Compras[]) {
      const sumPurchaseToday = purchase.reduce((prevVal, curVal) => prevVal + curVal.valor_total,0);
      return sumPurchaseToday;
    } 

    async getDebts(user_id: number) {
      const debtPurchase = await Repositories.Purchase.find({
        where: {
          valor_deuda: MoreThan(0),
          usuario_id: user_id
        },
        relations: {
          productos: true,
        }
      });
      const total = await this.getTotalValuePurchase(debtPurchase);
      return {data: debtPurchase, total};
    }

    async getPurchaseToday(user_id: number) {
      const today = todayHelper();
      const purchase = await Repositories.Purchase.find({
        where: {
          created_at: Between(today.start, today.end),
          usuario_id: user_id
        },
        relations: {
          productos: true,
        }
      });
      const total = await this.getTotalValuePurchase(purchase);
      return {data: purchase, total};
    }
    
    async updatePurchase(id: number, data2Change: PurchaseI) {
      const result = await Repositories.Purchase
                          .createQueryBuilder()
                          .update({...data2Change})
                          .where({
                            id
                          })
                          .returning('*')
                          .execute()
      return result.raw[0];
    }

    async getPurchaseByID(id: number) {
      const purchase = await Repositories.Purchase.findOne({
        where: {
        id
        }
      });
      return purchase;
    }
    
    private async createPurchaseValidation(purchase: PurchaseRequestI) :Promise<Compras> {
      const compra = new Compras
      compra.provedor = purchase.provedor
      compra.cantidad_total = purchase.cantidad_total
      compra.valor_deuda = purchase.valor_deuda
      compra.valor_total = purchase.valor_total
      compra.usuario_id = purchase.usuario_id
      const errors = await validate(compra)
      if (errors.length > 0) {
          throw new Error(`Validation failed! ${errors}`);
      }
      return compra;
    }
}

export default PurchaseService;