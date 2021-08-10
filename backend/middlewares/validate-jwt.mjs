

import { response } from "express";
import jwt from 'jsonwebtoken';
/**
 * Funcion para verificar si un token es valido
 * @param {string} uid - Identificador unico del usuario
 * @param {string} name - Nombre completo del usuario
 * @param {string} token - Token a comprobar si es valido
 * @param {string} proccess.env.SECRET_JWT_SEED - Clave usada para verificar si el token la tiene.
 */

const validateJWT = (req, res = response, next)=>{

    const token = req.header('x-token');

    if(!token){
      return res.status(401).json({
        ok: false,
        msg: 'Token error'
      })
    }

    try {
        
        const { uid, name } = jwt.verify( token, process.env.SECRET_JWT_SEED );

        req.uid  = uid;
        req.name = name;
       

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg:'Invalid token'
        })
    }

    next();
}

export { validateJWT }