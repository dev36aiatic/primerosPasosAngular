
import {
    Entity, PrimaryGeneratedColumn, Column,
    Unique, CreateDateColumn, UpdateDateColumn,
    OneToOne, JoinColumn
} from "typeorm";
import { Profile } from './Profile';

//Ejemplo de clase
/**
 * Clase definida para crear un usuario (si no existe) cuando la persona ingrese por medio de Facebook o Google
 */
@Entity()
@Unique(['email','idFb'])
export class SocialUser {

    @PrimaryGeneratedColumn()
    user_id: number;

    @Column()
    provider: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column({
        type: String,
        default: '',
        nullable: true
    })
    idFb?: string;

    //Al colocarle eager a usuario le digo que me cargue la informacion que tiene relacionadas
    //De esta forma me cargan los datos de la tabla profile relacioandas a este usuario
    @OneToOne(() => Profile, profile => profile.social_user, { eager: true })
    @JoinColumn({ name: "profile_id" })
    profile: Profile;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

}
