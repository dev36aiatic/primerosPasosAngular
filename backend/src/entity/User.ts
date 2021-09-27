import {
    Entity, PrimaryGeneratedColumn, Column,
    Unique, CreateDateColumn, UpdateDateColumn,
    OneToOne, JoinColumn
} from "typeorm";
import { Profile } from './Profile';

//Ejemplo de Usuario
/**
 * Clase definida para crear un Usuario ( si no existe ) cuando la persona se registre.
 */
@Entity()
@Unique(['email'])
export class User {

    @PrimaryGeneratedColumn()
    user_id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    //Al colocarle eager a usuario  carga la informacion que tiene relacionadas
    //De esta forma me cargan los datos de la tabla profile relacionadas a este usuario
    @OneToOne(() => Profile, profile => profile.user,{eager: true})
    @JoinColumn({ name: "profile_id" })
    profile:Profile;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

}
