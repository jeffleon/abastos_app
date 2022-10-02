import { IsInt, IsNotEmpty, IsString, MinLength } from "class-validator";
import { Column, PrimaryGeneratedColumn, Entity, ManyToMany, CreateDateColumn,UpdateDateColumn  } from "typeorm";
import { Productos } from "./products";

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

    @IsString()
    @IsNotEmpty()
    @Column()
    valor_total: string

    @IsInt()
    @Column()
    valor_deuda: number

    @IsInt()
    @Column()
    cantidad_total: number

    @ManyToMany(() => Productos, (productos) => productos.compras)
    productos: Productos[]

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updated_at: Date;
}