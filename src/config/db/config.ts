import "reflect-metadata";
import { DataSource } from "typeorm";
import { Productos } from "../../models/products";
import { Compras } from "../../models/purchase";
import { Ventas } from "../../models/sales";
import { Usuarios } from "../../models/users";
import { RepositoriesI } from "../../types/utils";

const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWD,
    database: process.env.DB_NAME,
    entities: [Productos, Usuarios, Compras, Ventas],
    synchronize: true,
    logging: false,
});

const productsRepository = AppDataSource.getRepository(Productos);
const usersRepository = AppDataSource.getRepository(Usuarios);
const purchaseRepository = AppDataSource.getRepository(Compras);
const salesRepository = AppDataSource.getRepository(Ventas);

export const Repositories: RepositoriesI = {
    Products: productsRepository,
    Users: usersRepository,
    Purchase: purchaseRepository,
    Sales: salesRepository,
    DataSource: AppDataSource,
}

export default AppDataSource;