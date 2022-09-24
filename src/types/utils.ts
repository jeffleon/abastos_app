import { Repository } from "typeorm/repository/Repository";
import { Productos } from "../models/productos";

export interface RepositoriesI  {
    Products: Repository<Productos>
}