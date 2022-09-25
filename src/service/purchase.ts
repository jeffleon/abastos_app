import { Service } from 'typedi';
import { Repositories } from '../config/db/config';
import { ProductsI } from '../types/products';
import { PurchaseI } from '../types/purchase';

@Service()
class PurchaseService {
    async savePurchase(purchase: PurchaseI):Promise<PurchaseI> {
        const product = await Repositories.Purchase.save(purchase);
        return product;
    }
  
    //   async getProduct(id: number):Promise<ProductsI> {
    //     const product = await Repositories.Products.findOneBy({
    //       id,
    //     })
    //     return product;
    //   }
  
      async getAllProducts():Promise<ProductsI[]> {
        const products = await Repositories.Products.find();
        return products;
      }
  
    //   async updateProduct(id: number, changeData: ProductsI):Promise<UpdateResult> {
    //     const result = await Repositories.Products.createQueryBuilder()
    //                         .update({...changeData})
    //                         .where({
    //                           id
    //                         })
    //                         .returning('*')
    //                         .execute()
    //     return result.raw[0];
    //   }
  
    //   async deleteProduct(id: number):Promise<DeleteResult> {
    //     const result = await Repositories.Products.delete({id});
    //     return result;
    //   }
}

export default PurchaseService;