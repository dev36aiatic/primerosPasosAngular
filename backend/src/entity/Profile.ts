import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, Unique } from 'typeorm';
import { User } from './User';
import { SocialUser } from './GoogleOrFbUser';

@Entity()
@Unique(['cc'])
export class Profile {

    @PrimaryGeneratedColumn()
    profile_id:number;

    @Column({
        nullable:true,
        default: null,
        unique:true,
        precision: 15
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

    //TODO: VER LO DE LOS ARRAYS XD
    @Column("simple-array")
    skills: string[];
    
    @Column({
        nullable:true,
        default:''
    })
    description: string;

    @OneToOne( () => User, user => user.profile)
    user?:User;

    @OneToOne(()=> SocialUser, socialUser => socialUser.profile)
    social_user?:SocialUser;
    
}