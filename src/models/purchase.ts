import { Column, PrimaryGeneratedColumn, Entity, ManyToMany, CreateDateColumn,UpdateDateColumn  } from "typeorm";
import { Productos } from "./products";

@Entity()
export class Compras {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    provedor: string

    @Column()
    telefono: string

    @Column()
    valor_total: string

    @Column()
    valor_deuda: number

    @Column()
    cantidad_total: number

    @ManyToMany(() => Productos, (productos) => productos.compras)
    productos: Productos[]

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updated_at: Date;
}