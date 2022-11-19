import { DataSource } from "typeorm/data-source";
import { Repository } from "typeorm/repository/Repository";
import { Productos } from "../models/products";
import { Compras } from "../models/purchase";
import { ProductosComprados } from "../models/purchase_products";
import { Ventas } from "../models/sales";
import { ProductosVendidos } from "../models/sale_products";
import { Usuarios } from "../models/users";

export interface RepositoriesI  {
    Products: Repository<Productos>
    DataSource: DataSource
    Users: Repository<Usuarios>
    Purchase: Repository<Compras>
    Sales: Repository<Ventas>
    ProductSales: Repository<ProductosVendidos>
    ProductPurchase: Repository<ProductosComprados>
}