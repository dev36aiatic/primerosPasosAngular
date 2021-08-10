//Importancion de jsonwebtoken
import jwt from 'jsonwebtoken';
/**
 * Funcion para generar un nuevo jwt
 * @param uid - Identificador unico del usuario
 * @param name  - Nombre completo del usuaio
 * @param email - Correo del usuario
 * @returns {string} Token
 */
const generateJWT = ( uid, name, email = false) => {

    const payload = { uid, name, email};

    return new Promise((resolve,rejected)=>{

        jwt.sign(payload, process.env.SECRET_JWT_SEED, {expiresIn:'24h'}, (error,token) => {
            if(error){
                rejected(error);
                console.log(error);
            }else{
                resolve(token);
            }
        });
    });
    
}

export {generateJWT}