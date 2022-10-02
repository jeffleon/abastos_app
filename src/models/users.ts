import { IsNotEmpty, IsString, MinLength } from "class-validator";
import { Column, PrimaryGeneratedColumn, Entity} from "typeorm";

@Entity()
export class Usuarios {
    @PrimaryGeneratedColumn()
    id: number

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @Column()
    nombre: string

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @Column()
    usuario: string
    
    @IsString()
    @IsNotEmpty()
    @MinLength(7)
    @Column()
    contrasena: string

    @Column({nullable: true})
    token: string

}