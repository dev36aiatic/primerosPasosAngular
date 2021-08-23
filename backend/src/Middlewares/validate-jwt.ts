import { response } from 'express';
import * as jwt from 'jsonwebtoken';
/**
 * 
 * @param req - Informacion de la solicitud HTTP provocada
 * @param res - Permite devolver la respuesta HTTP 
 * @param next - Paramentro  que permite activar una funcion para que el codigo siguiente se siga ejecutando si paso los filtros anteriores
 * @constant { string } token - Token recibido desde los headers
 */
const validateJWT = (req, res = response, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).send({
            ok: false,
            msg: 'Token ERROR'
        })
    }

    try {
        const payload:any = jwt.verify( token, process.env.SECRET_JWT_SEED );

        req.uid  = payload.uid;
        req.name = payload.name;
        
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Invalid Token dear gamer'
        })
    }
    next();
}

export default validateJWT;