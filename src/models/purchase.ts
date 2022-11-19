import { IsInt, IsNotEmpty, IsString, MinLength } from "class-validator";
import { Column, PrimaryGeneratedColumn, Entity, CreateDateColumn,UpdateDateColumn, OneToMany  } from "typeorm";
import { ProductosComprados } from "./purchase_products";

@Entity()
export class Compras {
    @PrimaryGeneratedColumn()
    id: number

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @Column()
    provedor: string

    @Column({nullable: true})
    telefono: string

    @IsInt()
    @Column()
    valor_total: number

    @IsInt()
    @Column()
    valor_deuda: number

    @IsInt()
    @Column()
    cantidad_total: number

    @Column()
    usuario_id: number

    @OneToMany(() => ProductosComprados, (productoComprado:ProductosComprados) => productoComprado.compra)
    productos: ProductosComprados[]

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updated_at: Date;
}