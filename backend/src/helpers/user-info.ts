
import { User } from "../entity/User";
export default function userInfo(dbUser:User){
    return {
        id:dbUser.id ,
        name:dbUser.name,
        email:dbUser.email/* ,
        profile?:dbUser.profile, */
    }
}