//Importancion de jsonwebtoken
const jwt = require('jsonwebtoken');

const generateJWT = ( uid, name) => {

    //Se define la informacion del usuario
    const payload = { uid, name };

   /*  Al llamar la funcion generarJWT esta me devuelve una promesa la cual llama al JWT
    y le envia el payload, la firma y se establece el tiempo de expiracion.
    Por ultimo esta me devuelve el token o el error */

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
//Exportacion de la funcion generarJWT
module.exports = {
    generateJWT
}