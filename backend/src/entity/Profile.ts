import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { User } from './User';

@Entity()
export class Profile {

    @PrimaryGeneratedColumn()
    profileId:number;

    @Column({
        nullable:true,
        default: null
    })
    cc: number;
    
    @Column({
        nullable:true,
        default:''
    })
    address: string;
    
    @Column({
        nullable:true,
        default:''
    })
    dateOfBirth: string;

    @Column({
        nullable:true,
        default:''
    })
    city: string;
    
    @Column({
        nullable:true,
        default:''
    })
    department: string;
    
    @Column({
        nullable:true,
        default:''
    })
    country: string;
    
    @Column({
        nullable:true,
        default:''
    })
    ZIP: string;
    
    @Column({
        nullable:true,
        default:''
    })
    profession: string;
    
/*     @Column("text", {
        array: true
    })
    skills: string[]; */
    
    @Column({
        nullable:true,
        default:''
    })
    description: string;

    @OneToOne( () => User, user => user.profile)
    @JoinColumn()
    user:User;
    
}