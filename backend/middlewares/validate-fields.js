const { response } = require("express");

//Modulo que me permite validar que los datos del Usuario cumplan caracteristicas establecidas
const { validationResult } = require("express-validator");

const MiddleWares = {
    //Funcion que me permite validar los campos a la hora de crear un usuario o iniciar sesion
    validateFields : (req , res = response, next)=>{

        /*  Se le pasan los datos del req.body
         que debe validar a la funcion validationResult de express-validator,
         y me devuelve los resultados en un objeto . */
        const errors = validationResult(req);
        //Aqui valido si existen errores, si existen enviame el objeto con los errores 
        if( !errors.isEmpty()){
            return res.status(400).json({
                ok:false,
                errors: errors.mapped()
            })
        }
       /*  Y si no existen errores en el objeto utilizo next 
        para que me ejecute el codigo que esta debajo de este Middleware */
        next();
    }
}

module.exports = MiddleWares