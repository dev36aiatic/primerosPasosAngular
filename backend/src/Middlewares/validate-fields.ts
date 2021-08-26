import { response } from "express";
import { validationResult } from "express-validator";

/**
 * Middleware que permite validar si hay errores con la informacion antes de crear un usuario
 * @param req - Informacion de la solicitud HTTP provocada
 * @param res - Permite devolver la respuesta HTTP 
 * @param next - Paramentro  que permite activar una funcion para que el codigo siguiente se siga ejecutando si paso los filtros anteriores
 * @function validationResult - Metodo que recibe los datos de req y valida si tiene errores
 */
const MiddleWares = {
    validateFields: (req, res = response, next) => {
        
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(500).json({
                ok: false,
                errors: errors.mapped()
            })
        }

        next();
    }
}

export default MiddleWares;