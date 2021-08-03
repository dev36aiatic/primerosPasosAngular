const { response } = require("express");
const jwt = require('jsonwebtoken');

const validarJWT = (req, res = response, next)=>{

    //Se guarda en la constante token el valor enviado por los headers con llave x-token
    const token = req.header('x-token');

    //Si no hay ningun token hace nada y me devuelve el error
    if(!token){
      return res.status(401).json({
        ok: false,
        msg: 'Error en el token'
      })
    }

    try {
       /*  Aqui le digo que verifique si el token que recibe por los headers tiene la misma 
        firma que esta definida en la variable de entorno SECRET_JWT_SEED,
        si tiene la misma firma me devolvera el userId y el name */
        const { uid, name } = jwt.verify( token, process.env.SECRET_JWT_SEED );

       /* Establezco que las propiedades  req.uid y req.name son iguales a los valores que me devuelve
       el token para poder recibirlos en la funcion renovarToken del controlador auth.js */
        req.uid  = uid;
        req.name = name;
       

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg:'Token no valido'
        })
    }

    // Si todo está bien ejecute lo siguiente
    next();
}

module.exports = {
    validarJWT
}