import { Service } from 'typedi';
import { Repositories } from '../config/db/config';
import { Between  } from "typeorm";
import { todayHelper } from '../utils/dates';
import { SaleI } from '../types/sales';

@Service()
class SaleService {
    async saveSale(purchase: SaleI):Promise<SaleI> {
        const product = await Repositories.Sales.save(purchase);
        return product;
    }

    async getSalesToday() {
      const today = todayHelper();
      const sales = await Repositories.Sales.find({
        where: {
          created_at: Between(today.start, today.end),
        },
      });
      return sales;
    }
    
    async updateSale(id: number, data2Change: SaleI) {
      const result = await Repositories.Sales
                          .createQueryBuilder()
                          .update({...data2Change})
                          .where({
                            id
                          })
                          .returning('*')
                          .execute()
      return result.raw[0];
    }

    async getSaleByID(id: number) {
      const sale = await Repositories.Sales.findOne({
        where: {
        id
        }
      });
      return sale;
    }
    
}

export default SaleService;