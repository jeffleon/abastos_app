import { Service } from 'typedi';
import { Repositories } from '../config/db/config';
import { Between  } from "typeorm";
import { todayHelper } from '../utils/dates';
import { SaleI } from '../types/sales';
import { Ventas } from '../models/sales';
import { validate } from 'class-validator';

@Service()
class SaleService {
    async saveSale(sale: SaleI):Promise<SaleI> {
      const validation = await this.createSaleValidation(sale);
      if (validation instanceof Error) {
        return validation
      }
      const product = await Repositories.Sales.save(sale);
      return product;
    }

    async getTotalValueSale(sales:Ventas[]) {
      const sumPurchaseToday = sales.reduce((prevVal, curVal) => prevVal + curVal.valor_total,0);
      return sumPurchaseToday;
    } 

    async getSalesToday(user_id: number) {
      const today = todayHelper();
      const sales = await Repositories.Sales.find({
        where: {
          created_at: Between(today.start, today.end),
          usuario_id: user_id,
        },
      });
      const total = await this.getTotalValueSale(sales);
      return {data:sales, total};
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

    private async createSaleValidation(sale: SaleI) {
      const venta = new Ventas
      venta.cantidad_total = sale.cantidad_total;
      venta.nombre = sale.nombre;
      venta.valor_total = sale.valor_total;
      const errors = await validate(venta)
      if (errors.length > 0) {
          throw new Error(`Validation failed! ${errors}`);
      }
      return venta;
    }
    
}

export default SaleService;