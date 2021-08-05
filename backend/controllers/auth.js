const { response } = require('express');

//Importacion del modelo Usuario
const User = require('../models/User');

//Importacion de la funcion para generar el JWT
const { generateJWT } = require('../helpers/jwt');

//Importacion de bcrypt para el hash de la contraseña
const bcrypt = require('bcryptjs');

const authController = {
    //Funcion que me permite crear el usuario y guardarlo en la base de datos
  newUser: async (req, res = response) => {

    const { nombre, email, password } = req.body;
    
    try {
    /*   Verificar email si existe el email y si ya está me devuelve un mensaje y 
      no sigue ejecutando el codigo */

      const user = await User.findOne({email});

      if( user ){
          return res.status(400).json({ ok: false, msg:'A user with this email already exists.'});
      }

      //Crea usuario y le mando los datos obtenidos del body
      const dbUser = new User(req.body)

      //Encriptar contraseña
      const salt = bcrypt.genSaltSync();

      //Aqui le pasa la contraseña a encriptar y el numero de veces que lo hará, por defecto son 10 veces
      dbUser.password = bcrypt.hashSync( password, salt);

      //Generar JsonWebToken
      const token = await  generateJWT(dbUser.id, dbUser.name);

      //Guardar usuario
      await dbUser.save();

      /* Respuesta exitosa
      Si la respuesta es exitosa me devuelve un JSON con el usuario y el JWT */

       return res.status(200).json({
           ok: true,
           uid: dbUser.id,
           name:dbUser.name,
           token,
           email: dbUser.email
       })

    } catch (error) {
      console.log(error);

      //Error que manda de respuesta cuando el proceso de crear el usuario falla
      return res.status(500).json({
        ok: false,
        msg: 'Something went wrong :('
      });
    }

  },

  //Funcion que me permite el login del Usuario
  userLogin: async (req, res = response) => {

    //Tomo el email y la contraseña del cuerpo de la pagina
    const { email, password } = req.body;

    try {

      //Busco un usuario con el email
      const dbUser = await User.findOne({email});

      //Si no encuentra el usuario significa que no existe y retorno un mensaje
      if(!dbUser){
        return res.status(400).json({
          ok:false,
          msg:'Credentials are not correct.'
        });
      }

      /* Si existe el usuario hacer match de la contraseña que recibo por el body y
       la contraseña encriptada que esta en la base de datos, la respuesta retorna true o false */
      const validPassword = bcrypt.compareSync(password, dbUser.password);

      //Si la contraseña no es valida me envia un mensaje indicandolo
      if(!validPassword){
        return res.status(400).json({
          ok:false,
          msg:'Credentials are not correct.'
        });
      }

      // De lo contrario se genera el JWT
      const token = await generateJWT(dbUser._id, dbUser.name);

      //Y por ultimo se envia la respuesta del servicio si el email y contraseñas hacen match
      return res.status(200).json({
        ok: true,
        uid: dbUser.id,
        name:dbUser.name,
        token,
        email: dbUser.email
      })

    } catch (error) {
      console.log(error);
      //Si hay algun error con el login envia el siguiente mensaje
      return res.status(500).json({
        ok:false,
        msg:'Something went wrong :('
      });
    }


  },
  //Funcion que me renueva el Token
  renewToken: async (req, res = response) => {

    //Se desestructura el uid y el name que me envia el middleWare validar-jwt
    const { uid , name } = req;
   
    //Se genera el nuevo JWT
    const token = await generateJWT(uid, name);

    //Buscar usuario para devolver email

    const { email } = await User.findById(uid);
  

    //Se envia la respuesta con los datos del usuario y el jwt
    return res.json({
      ok: true,
      uid,
      name,
      token,
      email
    });

  }
}


module.exports = authController;