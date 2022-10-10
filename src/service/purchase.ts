import { Service } from 'typedi';
import { Repositories } from '../config/db/config';
import { PurchaseI } from '../types/purchase';
import { MoreThan, Between  } from "typeorm";
import { todayHelper } from '../utils/dates';
import { Compras } from '../models/purchase';
import { validate } from 'class-validator';

@Service()
class PurchaseService {
    async savePurchase(purchase: PurchaseI):Promise<PurchaseI> {
        const validation = await this.createPurchaseValidation(purchase);
        if (purchase instanceof Error) {
          return validation; 
        }
        const product = await Repositories.Purchase.save(purchase);
        return product;
    }

    async getTotalValuePurchase(purchase:Compras[]) {
      const sumPurchaseToday = purchase.reduce((prevVal, curVal) => prevVal + curVal.valor_total,0);
      return sumPurchaseToday;
    } 

    async getDebts() {
      const debtPurchase = await Repositories.Purchase.find({
        where: {
          valor_deuda: MoreThan(0)
        },
      });
      const total = await this.getTotalValuePurchase(debtPurchase);
      return {data: debtPurchase, total};
    }

    async getPurchaseToday() {
      const today = todayHelper();
      const purchase = await Repositories.Purchase.find({
        where: {
          created_at: Between(today.start, today.end),
        },
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
    
    private async createPurchaseValidation(purchase: PurchaseI) :Promise<Compras> {
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