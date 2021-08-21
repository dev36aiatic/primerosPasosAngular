import { response } from 'express';
import * as jwt from 'jsonwebtoken';

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