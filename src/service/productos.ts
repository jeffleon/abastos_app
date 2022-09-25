import { Service } from 'typedi';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Repositories } from '../config/db/config';
import { ProductsI } from '../types/products';

@Service()
class ProductsService {
    async saveProduct(products: ProductsI):Promise<ProductsI> {
      const product = await Repositories.Products.save(products);
      return product;
    }

    async getProduct(id: number):Promise<ProductsI> {
      const product = await Repositories.Products.findOneBy({
        id,
      })
      return product;
    }

    async getAllProducts():Promise<ProductsI[]> {
      const products = await Repositories.Products.find();
      return products;
    }

    async updateProduct(id: number, changeData: ProductsI):Promise<UpdateResult> {
      const result = await Repositories.Products.createQueryBuilder()
                          .update({...changeData})
                          .where({
                            id
                          })
                          .returning('*')
                          .execute()
      return result.raw[0];
    }

    async deleteProduct(id: number):Promise<DeleteResult> {
      const result = await Repositories.Products.delete({id});
      return result;
    }
}

export default ProductsService;