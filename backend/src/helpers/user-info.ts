
import { User } from "../entity/User";
import { SocialUser } from "../entity/GoogleOrFbUser";
export default function userInfo(dbUser:User | SocialUser){
    return {
        id:dbUser.user_id ,
        name:dbUser.name,
        email:dbUser.email,
        profile:dbUser.profile,
    }
}