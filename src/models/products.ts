import { IsInt, IsString, MinLength } from "class-validator";
import { Column, PrimaryGeneratedColumn, Entity } from "typeorm";

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
    inventario: number

    @IsInt()
    @Column()
    precio_promedio: number

    @Column({nullable: true})
    image_url: string

    @Column()
    usuario_id: number
}