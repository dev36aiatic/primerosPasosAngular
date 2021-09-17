import * as jwt from 'jsonwebtoken';
/**
 * Funcion para generar un nuevo jwt
 * @param {string} uid - Identificador unico del usuario
 * @param {string} name  - Nombre completo del usuaio
 * @param {string} email - Correo del usuario
 * @returns {string} Token
 */
const generateJWT = (uid:(string | number), name:string, email:string = '') => {
    const payload = { uid, name, email }

    return new Promise((resolve, rejected) => {
        jwt.sign(payload, process.env.SECRET_JWT_SEED, { expiresIn: '24h' }, (error, token) => {
            if (error) {
                console.log(error);
                return rejected(error);
            } else {
                resolve(token);
            }
        });
    });
}

export default generateJWT;