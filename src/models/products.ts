import { IsInt, IsString, MinLength } from "class-validator";
import { Column, PrimaryGeneratedColumn, Entity, ManyToMany, JoinTable } from "typeorm";
import { Compras } from "./purchase";
import { Ventas } from "./sales";

@Entity()
export class Productos {
    @PrimaryGeneratedColumn()
    id: number

    @IsString()
    @MinLength(3)
    @Column()
    nombre: string

    @IsString()
    @Column()
    descripcion: string

    @Column()
    inventario: string

    @IsInt()
    @Column()
    precio_promedio: number

    @Column({nullable: true})
    image_url: string

    @ManyToMany(() => Compras, (compra) => compra.productos)
    @JoinTable()
    compras: Compras[]

    @ManyToMany(() => Ventas, (venta) => venta.productos)
    @JoinTable()
    ventas: Ventas[]
}