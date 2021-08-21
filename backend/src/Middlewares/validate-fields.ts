import { response } from "express";
import { validationResult } from "express-validator";

/**
 * Middleware que permite validar si hay errores con la informacion antes de crear un usuario
 */
const MiddleWares = {
    validateFields : (req,res = response, next)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(500).json({
                ok:false,
                errors: errors.mapped()
            })
        }
        next();
    }
}

export default MiddleWares;