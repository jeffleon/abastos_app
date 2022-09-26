import { Service } from 'typedi';
import { Repositories } from '../config/db/config';
import { ProductsI } from '../types/products';
import { PurchaseI } from '../types/purchase';
import { MoreThan, Between  } from "typeorm";
import { todayHelper } from '../utils/dates';

@Service()
class PurchaseService {
    async savePurchase(purchase: PurchaseI):Promise<PurchaseI> {
        const product = await Repositories.Purchase.save(purchase);
        return product;
    }

    async getDebts() {
      const debtPurchase = await Repositories.Purchase.find({
        where: {
          valor_deuda: MoreThan(0)
        },
      });
      return debtPurchase;
    }

    async getPurchaseToday() {
      const today = todayHelper();
      const purchase = await Repositories.Purchase.find({
        where: {
          created_at: Between(today.start, today.end),
        },
      });
      return purchase;
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
    
}

export default PurchaseService;