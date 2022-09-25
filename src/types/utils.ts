import { DataSource } from "typeorm/data-source";
import { Repository } from "typeorm/repository/Repository";
import { Productos } from "../models/products";
import { Compras } from "../models/purchase";
import { Usuarios } from "../models/users";

export interface RepositoriesI  {
    Products: Repository<Productos>
    DataSource: DataSource
    Users: Repository<Usuarios>
    Purchase: Repository<Compras>
}