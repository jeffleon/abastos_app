import { IsInt, IsNotEmpty, IsString, MinLength } from "class-validator";
import { Column, Entity, CreateDateColumn,UpdateDateColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductosVendidos} from "./sale_products";

@Entity()
export class Ventas {
    
    @PrimaryGeneratedColumn()
    id: number

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @Column()
    nombre: string

    @Column({nullable: true})
    telefono: string

    @IsInt()
    @Column()
    valor_total: number

    @Column()
    ganancia_venta: number

    @IsInt()
    @Column()
    cantidad_total: number

    @OneToMany(() => ProductosVendidos, (productoVendido:ProductosVendidos) => productoVendido.venta)
    productos: ProductosVendidos[]

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updated_at: Date;

    @Column()
    usuario_id: number
}