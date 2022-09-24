import "reflect-metadata";
import { DataSource } from "typeorm";
import { Productos } from "../../models/productos";
import { RepositoriesI } from "../../types/utils";

const AppDataSource = new DataSource({
    type: "postgres",
    host: 'localhost',
    port: 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWD,
    database: process.env.DB_NAME,
    entities: [Productos],
    synchronize: true,
    logging: false,
});

const productsRepository = AppDataSource.getRepository(Productos);
export const Repositories: RepositoriesI = {
    Products: productsRepository
}

export default AppDataSource;