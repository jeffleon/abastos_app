import { Column, PrimaryGeneratedColumn, Entity, ManyToMany, JoinTable } from "typeorm";
import { Compras } from "./purchase";

@Entity()
export class Productos {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nombre: string

    @Column()
    descripcion: string

    @Column()
    inventario: string

    @Column()
    precio_promedio: number

    @ManyToMany(() => Compras, (compra) => compra.productos)
    @JoinTable()
    compras: Compras[]
}