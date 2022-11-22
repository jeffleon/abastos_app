import { IsInt, IsNotEmpty, IsString, MinLength } from "class-validator";
import { Column, Entity, Generated, ManyToOne, PrimaryColumn } from "typeorm";
import { Ventas } from "./sales";

@Entity()
export class ProductosVendidos {
    
    @PrimaryColumn({select: false})
    @Generated("uuid")
    id: number

    @Column()
    producto_id: number

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @Column()
    nombre: string

    @IsInt()
    @Column()
    valor_total: number

    @IsInt()
    @Column()
    valor_unitario: number

    @IsInt()
    @Column()
    precio_promedio: number
    
    @IsInt()
    @Column()
    cantidad: number

    @IsInt()
    @Column()
    ganancia: number

    @ManyToOne(() => Ventas, (ventas: Ventas) => ventas.productos)
    venta:Ventas

}