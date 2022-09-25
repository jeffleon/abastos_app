import { Column, PrimaryGeneratedColumn, Entity} from "typeorm";

@Entity()
export class Usuarios {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nombre: string

    @Column()
    usuario: string
    
    @Column()
    contrasena: string

    @Column({nullable: true})
    token: string

}