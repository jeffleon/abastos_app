import { Service } from 'typedi';
import { Repositories } from '../config/db/config';
import { Between  } from "typeorm";
import { todayHelper } from '../utils/dates';
import { SaleI, SaleProductsI, SaleRequestI } from '../types/sales';
import { Ventas } from '../models/sales';
import { validate } from 'class-validator';

@Service()
class SaleService {
    async saveSale(sale: SaleRequestI):Promise<SaleI> {
      const validation = await this.createSaleValidation(sale);
      if (validation instanceof Error) {
        return validation
      }
      const productWithProfit = this.addProfit(sale);
      const totalProfit = this.getTotalProfit(productWithProfit);
      const product = await Repositories.Sales.save({...sale, ganancia_venta: totalProfit});
      const productWithSale = productWithProfit.map((el)=> {
        return {...el, venta: product}
      })
      await this.saveProductSales(productWithSale)
      return product;
    }

    getTotalProfit(products:SaleProductsI[]):number {
      return products.reduce((el, act) => el + act.ganancia, 0)
    }

    addProfit(sale: SaleRequestI):SaleProductsI[] {
      return sale.productos.map((el)=>{
        const profit = el.cantidad * (el.valor_unitario - el.precio_promedio) 
        return {...el, ganancia: profit};
      });
    }

    async saveProductSales(productSales: SaleProductsI[]) {
      const response = await Repositories.ProductSales.save(productSales)
      return response
    }

    async getTotalValueSale(sales:Ventas[]) {
      return sales.reduce((prevVal, curVal) => prevVal + curVal.valor_total,0);
    } 

    async getTotalProfitSale(sales:Ventas[]) { 
      return sales.reduce((prevVal, curVal) => prevVal + curVal.ganancia_venta,0);
    } 

    async getSalesToday(user_id: number) {
      const today = todayHelper();
      const sales = await Repositories.Sales.find({
        where: {
          created_at: Between(today.start, today.end),
          usuario_id: user_id,
        },
        relations: {
          productos: true,
        }
      });
      const total = await this.getTotalValueSale(sales);
      const totalProfit = await this.getTotalProfitSale(sales);
      return {data:sales, total, ganancia_total: totalProfit};
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

    private async createSaleValidation(sale: SaleRequestI) {
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