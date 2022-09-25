import "reflect-metadata";
import { DataSource } from "typeorm";
import { Productos } from "../../models/products";
import { Usuarios } from "../../models/users";
import { RepositoriesI } from "../../types/utils";

const AppDataSource = new DataSource({
    type: "postgres",
    host: 'localhost',
    port: 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWD,
    database: process.env.DB_NAME,
    entities: [Productos, Usuarios],
    synchronize: true,
    logging: false,
});

const productsRepository = AppDataSource.getRepository(Productos);
const usersRepository = AppDataSource.getRepository(Usuarios);
export const Repositories: RepositoriesI = {
    Products: productsRepository,
    Users: usersRepository,
    DataSource: AppDataSource
}

export default AppDataSource;