import {
  response
} from 'express';
import passport from 'passport';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {
  OAuth2Client
} from 'google-auth-library';

import {
  Usuario
} from '../models/User.mjs';
import {
  SocialUser
} from '../models/GoogleFbUser.mjs';
import {
  generateJWT
} from '../helpers/jwt.mjs';

import userInfo from '../helpers/user-info.mjs';

/** Creacion del OAuth2Client de google para autenticacion */
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


/** Controlador de las funciones ejecutadas cuando se hacen peticiones http*/
const authController = {

  /**Funcion para crear usuarios y guardarlos en la base de datos 
   * @constructor
   * @param {string} nombre - Nombre del usuario
   * @param {string} email - Correo del usuario
   * @param {string} password - Contraseña del usuario
   * */
  newUser: async (req, res = response) => {

    const {
      nombre,
      email,
      password
    } = req.body;

    try {

      const user = await Usuario.findOne({
        email
      });

      if (user) {
        return res.status(400).json({
          ok: false,
          msg: 'A user with this email already exists.'
        });
      }

      const dbUser = new Usuario(req.body)
      const salt = bcrypt.genSaltSync();
      dbUser.password = bcrypt.hashSync(password, salt);
      const token = await generateJWT(dbUser.id, dbUser.name);
      await dbUser.save();
      
      return res.status(200).json({
        ok: true,
        user:userInfo(dbUser),
        token,
      })

    } catch (error) {
      console.log(error);

      return res.status(500).json({
        ok: false,
        msg: 'Something went wrong :('
      });
    }

  },
  /**
   * Funcion para ctualizar usuario en la base de datos
   * @param req - informacion enviada por el body
   * @param res - Informacion enviada por url
   * @returns - Usuario actualizado
   */
  updateUser: async (req, res = response) => {

    let id = req.params.id;

    const {
      name,
      cc,
      address,
      dateOfBirth,
      city,
      department,
      country,
      ZIP,
      profession,
      skills,
      description
    } = req.body

    try {
      
      let dbUser;

      if(req.params.provider == "GOOGLE" || req.params.provider == "FACEBOOK"){
        dbUser = await SocialUser.findById(id);
      }else{
        dbUser = await Usuario.findById(id);
      }

      if (!dbUser) {
        return res.status(500).json({
          ok: false,
          msg: 'User not found :('
        })
      }
      let { profile } = dbUser;

      dbUser.name = name;
      profile.cc = cc;
      profile.address = address;
      profile.dateOfBirth = dateOfBirth;
      profile.city = city;
      profile.department = department;
      profile.country = country;
      profile.ZIP = ZIP;
      profile.profession = profession;
      profile.skills = skills;
      profile.description = description;

      await dbUser.save();

      return res.status(200).json({
        ok: true,
        user: userInfo(dbUser)
      })

    } catch (error) {
      console.log(error);
      return res.status(500).json({
        ok: false,
        msg: 'Something went wrong :('
      })
    }
  },

 /**
   * Funcion para buscar informacion de un usuario en la base de datos
   * @param req - informacion enviada por el body
   * @param res - Informacion enviada por url
   * @returns - Usuario actualizado
   */
  findUser: async ( req,res = response) =>{
    let { id, provider } = req.params;
    try {
      
      let dbUser;

      if( provider == "GOOGLE" ||  provider == "FACEBOOK"){
        dbUser = await SocialUser.findById(id);
        console.log('fbgoogle');
      }else{
        dbUser = await Usuario.findById(id);
      }

      if(!dbUser){
        return res.status(500).json({
          ok:false,
          msg:'User not found'
        })
      }

      return res.status(200).json({
        ok: true,
        user: userInfo(dbUser)
      })
      
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok:false,
        msg: 'Something went wrong with uid'
      })
    }
  }
  ,

  /**Funcion para iniciar sesion del usuario
   * @param {string} email - Correo del usuario
   * @param {string} password - Contraseña del usuario
   * @param {string} dbUser._id - Identificador del usuario
   */
  userLogin: async (req, res = response) => {

    const {
      email,
      password
    } = req.body;

    try {

      const dbUser = await Usuario.findOne({
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
        user:userInfo(dbUser),
        token,
      })

    } catch (error) {
      console.log(error);
      return res.status(500).json({
        ok: false,
        msg: 'Something went wrong :('
      });
    }


  },
  /** Funcion para renovar el Token 
   * @param {string} uid - Identificador del usuario
   * @param {string} name- Nombre del usuario
   */
  renewToken: async (req, res = response) => {

    const {
      uid,
      name
    } = req;

    const token = await generateJWT(uid, name);
    const user = await Usuario.findById(uid);

    return res.json({
      ok: true,
      user: userInfo(user),
      token
    });

  },
  /** Funcion que me recibe el usuario de Facebook  verificado
   *  cuando el token es valido
   * @param {error} error - Error
   * @param {Object} user - Inforamcion del usuario
   * @param {string} info - Token de facebook
   *  */
  authFb: function (req, res) {
    passport.authenticate('facebook-token', function (error, user, info) {

      if (user) {
        res.status(200).json({
          ok: true,
          user:userInfo(user),
          token: info
        });
      }
      if (error) {
        return res.status(500).json({
          ok: false,
          error
        })
      }
    })(req, res);
  },
  /** Funcion que Autentica el token enviado por Google y si es valido me devuelve el usuario
   * @property {(string | string[])} idToken - El token enviado para ver si es valido
   * @property {(string | string[])} audience - El id del cliente de la app creada en google console
   * @property {string} email - Correo del usuario
   * @property {string} firstname - Primer nombre del usuario
   * @property {string} lastname - Segundo nombre del usuario
   * @property {string} name- Nombre completo del usuario
   * @param {Object} userDetails - Objeto con el nombre completo del usuario y correo
   * @param {string} process.env.SECRET_KEY - LLave secreta para crear el token
   */
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

      let dbUser = await SocialUser.findOne({
        email: userDetails.email
      });

      if (dbUser == null) {
          dbUser = new SocialUser({
          email: payload['email'],
          name: payload['name'],
          provider:"GOOGLE"
        });
        await dbUser.save();
      }

      let token = jwt.sign(userDetails, process.env.SECRET_KEY, {
        expiresIn: "24h"
      });

      res.status(200).json({
        ok: true,
        token: token,
        user:userInfo(dbUser)
      })
    }
    verify().catch((error) => {
      console.log(error,'token erroneo');
      res.status(400).json({
        ok: false,
        msg: 'Invalid Token',
        error:error
      })
    });
  }
}

export {
  authController
};