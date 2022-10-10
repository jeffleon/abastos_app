import { validate } from 'class-validator';
import { Service } from 'typedi';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Repositories } from '../config/db/config';
import { Productos } from '../models/products';
import { ProductsI } from '../types/products';
import { PurchaseProductsI } from '../types/purchase';
import { SaleProductsI } from '../types/sales';

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

    async lessProduct(product:ProductsI, item:SaleProductsI){ 
      product.inventario -= item.cantidad
      if (product.inventario < 0) {
        product.inventario = 0;
      }
      return product;
    }

    async sumAvgProduct(product:ProductsI, item:PurchaseProductsI){ 
      product.inventario += item.cantidad
      const avg = await this.avaragePrice(product.precio_promedio, item.valor_unitario);
      product.precio_promedio = avg;
      return product;
    }

    async avaragePrice(reference:number, price:number) {
      const diference = reference - price;
      if (reference === 0 ||  price === 0) {
        return reference >= price?reference:price;
      }
      if (Math.abs(diference) >= 10000) {
        return reference>=price?reference:price; 
      }
      const avg = Math.round((reference + price)/2)
      return avg;
    }

    async getProduct(id: number):Promise<ProductsI> {
      const product = await Repositories.Products.findOneBy({
        id,
      })
      return product;
    }

    async getAllProducts(user_id: number):Promise<ProductsI[]> {
      const products = await Repositories.Products.find({
        where: {
          usuario_id: user_id,
        },
      });
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