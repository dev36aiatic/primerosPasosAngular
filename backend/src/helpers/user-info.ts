
import { User } from "../entity/User";
import { SocialUser } from "../entity/GoogleOrFbUser";
 /**
  * Funcion que recibe el usuario y filtra la informacion
  * @param { object } dbUser - Objeto con la informacion del usuario
  * @property { string } id - Identificador unico del usuario
  * @property { string } name - Nombre completo del usuario
  * @property { string } email - Correo del usuario
  * @property { object } profile - Perfil del usuario
  * @returns Objeto con la información del usuario filtrada
  */
export default function userInfo(dbUser:User | SocialUser){
    return {
        id:dbUser.user_id ,
        name:dbUser.name,
        email:dbUser.email,
        profile:dbUser.profile,
    }
}