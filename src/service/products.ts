import { validate } from 'class-validator';
import { Service } from 'typedi';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Repositories } from '../config/db/config';
import { Productos } from '../models/products';
import { ProductsI } from '../types/products';

@Service()
class ProductsService {
    async saveProduct(products: ProductsI):Promise<ProductsI> {
      const validation = await this.createProductvalidation(products);
      if (validation instanceof Error) {
        return validation;
      }
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

    private async createProductvalidation(products: ProductsI) {
      const producto = new Productos
      producto.nombre = products.nombre;
      producto.precio_promedio = products.precio_promedio;
      producto.descripcion = products.descripcion;
      const errors = await validate(producto)
      if (errors.length > 0) {
          throw new Error(`Validation failed! ${errors}`)
      }
      return producto;
  }

    async deleteProduct(id: number):Promise<DeleteResult> {
      const result = await Repositories.Products.delete({id});
      return result;
    }
}

export default ProductsService;