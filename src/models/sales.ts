import { Column, PrimaryGeneratedColumn, Entity, ManyToMany, CreateDateColumn,UpdateDateColumn  } from "typeorm";
import { Productos } from "./products";

@Entity()
export class Ventas {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nombre: string

    @Column({nullable: true})
    telefono: string

    @Column()
    valor_total: number

    @Column()
    cantidad_total: number

    @ManyToMany(() => Productos, (productos) => productos.compras)
    productos: Productos[]

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updated_at: Date;
}