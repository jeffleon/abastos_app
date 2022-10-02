import { IsInt, IsNotEmpty, IsString, MinLength } from "class-validator";
import { Column, PrimaryGeneratedColumn, Entity, ManyToMany, JoinTable } from "typeorm";
import { Compras } from "./purchase";
import { Ventas } from "./sales";

@Entity()
export class Productos {
    @PrimaryGeneratedColumn()
    id: number

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @Column()
    nombre: string

    @IsString()
    @Column()
    descripcion: string

    @IsString()
    @IsNotEmpty()
    @Column()
    inventario: string

    @IsInt()
    @Column()
    precio_promedio: number

    @ManyToMany(() => Compras, (compra) => compra.productos)
    @JoinTable()
    compras: Compras[]

    @ManyToMany(() => Ventas, (venta) => venta.productos)
    @JoinTable()
    ventas: Ventas[]
}