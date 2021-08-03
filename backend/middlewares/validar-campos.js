const { response } = require("express");
const { validationResult } = require("express-validator");

const MiddleWares = {
    validarCampos : (req,res = response, next)=>{
        const errors = validationResult(req);
        console.log(errors);
        if( !errors.isEmpty()){
            return res.status(400).json({
                ok:false,
                errors: errors.mapped()
            })
        }
        //Utilizo next para que me ejecute el codigo que esta debajo
        next();
    }
}

module.exports = MiddleWares