import { IsInt, IsNotEmpty, IsString, MinLength } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Compras } from "./purchase";

@Entity()
export class ProductosComprados {
    
    @PrimaryGeneratedColumn()
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
    cantidad: number

    @ManyToOne(() => Compras, (compras: Compras) => compras.productos)
    compra:Compras
}