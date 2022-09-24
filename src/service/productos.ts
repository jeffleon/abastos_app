import { Service } from 'typedi';
import { Repositories } from '../config/db/config';
import { ProductsI } from '../types/products';

@Service()
class ProductsService {
    async saveProduct(products: ProductsI) {
      const product = await Repositories.Products.save(products);
      return product;
    }
}

export default ProductsService;