import { Column, PrimaryGeneratedColumn, Entity } from "typeorm";

@Entity()
export class Productos {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nombre: string

    @Column()
    descripcion: string

    @Column()
    cantidad: string

    @Column()
    precio_promedio: number
}