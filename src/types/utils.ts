import { DataSource } from "typeorm/data-source";
import { Repository } from "typeorm/repository/Repository";
import { Productos } from "../models/productos";

export interface RepositoriesI  {
    Products: Repository<Productos>
    DataSource: DataSource
}