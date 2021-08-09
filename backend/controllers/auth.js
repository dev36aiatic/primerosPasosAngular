const {
  response
} = require('express');

//Importacion del modelo Usuario
const User = require('../models/User');


//Modelo de Google o Facebook y autenticación de facebook

const GoogleUsuario = require('../models/GoogleFbUser');


const passport = require('passport');


//Importacion de la funcion para generar el JWT
const {
  generateJWT
} = require('../helpers/jwt');

//Importacion de bcrypt para el hash de la contraseña
const bcrypt = require('bcryptjs');

//Google Auth
const {
  OAuth2Client
} = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const jwt = require('jsonwebtoken');

const authController = {

  //Funcion que me permite crear el usuario y guardarlo en la base de datos
  newUser: async (req, res = response) => {

    const {
      nombre,
      email,
      password
    } = req.body;

    try {

      const user = await User.findOne({
        email
      });

      if (user) {
        return res.status(400).json({
          ok: false,
          msg: 'A user with this email already exists.'
        });
      }

      const dbUser = new User(req.body)

      const salt = bcrypt.genSaltSync();

      dbUser.password = bcrypt.hashSync(password, salt);

      const token = await generateJWT(dbUser.id, dbUser.name);

      await dbUser.save();


      return res.status(200).json({
        ok: true,
        uid: dbUser.id,
        name: dbUser.name,
        token,
        email: dbUser.email
      })

    } catch (error) {
      console.log(error);

      return res.status(500).json({
        ok: false,
        msg: 'Something went wrong :('
      });
    }

  },

  //Funcion que me permite el login del Usuario
  userLogin: async (req, res = response) => {

    const {
      email,
      password
    } = req.body;

    try {
      const dbUser = await User.findOne({
        email
      });

      if (!dbUser) {
        return res.status(400).json({
          ok: false,
          msg: 'Credentials are not correct.'
        });
      }

      const validPassword = bcrypt.compareSync(password, dbUser.password);

      if (!validPassword) {
        return res.status(400).json({
          ok: false,
          msg: 'Credentials are not correct.'
        });
      }

      const token = await generateJWT(dbUser._id, dbUser.name);

      return res.status(200).json({
        ok: true,
        uid: dbUser.id,
        name: dbUser.name,
        token,
        email: dbUser.email
      })

    } catch (error) {
      console.log(error);
      return res.status(500).json({
        ok: false,
        msg: 'Something went wrong :('
      });
    }


  },
  //Funcion que me renueva el Token
  renewToken: async (req, res = response) => {

    const {
      uid,
      name
    } = req;

    const token = await generateJWT(uid, name);


    const {
      email
    } = await User.findById(uid);


    return res.json({
      ok: true,
      uid,
      name,
      token,
      email
    });

  },
  //Funcion que me recibe el usuario ya verificado cuando el token es valido
  authFb: function (req, res) {
    passport.authenticate('facebook-token', function (error, user, info) {
    
      if(user){
        res.status(200).json({
          ok:true,
          user,
          token:info});
      }
      if(error){
        return res.status(500).json({
          ok:false,
          error
        })
      }
    })(req, res);
  },
  /*   Funcion que  guarda el usuario si no existe. Autentica el token
    y me devuelve uno nuevo para permitir que el usuario navegue por las rutas */

  authGoogle: async (req, res) => {
    async function verify() {

      const ticket = await client.verifyIdToken({
        idToken: req.header('token-auth'),
        audience: process.env.GOOGLE_CLIENT_ID
      });

      const payload = ticket.getPayload();

      const userDetails = {
        email: payload['email'],
        firstname: payload['given_name'],
        lastname: payload['family_name']
      }


      const dbUser = await GoogleUsuario.findOne({
        email: userDetails.email
      });

      if (dbUser == null) {
        let newUser = new GoogleUsuario({
          email: payload['email'],
          name: payload['name']
        });
        await newUser.save();
      }

      let token = jwt.sign(userDetails, process.env.SECRET_KEY, {
        expiresIn: "24h"
      });

      res.status(200).json({
        ok: true,
        token: token,
        name: payload['name'],
        email: payload['email']
      })
    }
    verify().catch(console.error);
  }
}


module.exports = authController;