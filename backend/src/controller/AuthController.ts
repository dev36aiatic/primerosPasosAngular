import { response, request } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/User";
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import generateJWT from '../helpers/generateJWT';
import userInfo from '../helpers/user-info';
import { Profile } from '../entity/Profile';


/** Controlador de las funciones ejecutadas cuando se hacen peticiones http*/
const authController = {

    /**Funcion para crear usuarios y guardarlos en la base de datos 
     * @constructor
     * @param {string} nombre - Nombre del usuario
     * @param {string} email - Correo del usuario
     * @param {string} password - Contraseña del usuario
     * */
    newUser: async (req, res = response) => {
        const userRepository = getRepository(User);
        const profileRepository = getRepository(Profile);
        const { name, email , password} = req.body;
        try {

            let dbUser = await userRepository.findOne({email});
            if(dbUser){
                return res.status(400).json({
                    ok: false,
                    msg:'A user with this email already exists.'
                })
            }
            //Crear perfil vacio para el usuario
            let profile = new Profile();
         /*    profile.cc =  123;
            profile.address = "123";
            profile.dateOfBirth = "123";
            profile.city = "123";
            profile.department = "123";
            profile.country = "123";
            profile.ZIP = "123";
            profile.profession = "123";
            profile.description = "123"; */

            await profileRepository.save(profile);

            //Crear nuevo usuario
            let newUser = new User();
            newUser.name = name;
            newUser.email = email;
            newUser.profile = profile;
            const salt = bcrypt.genSaltSync();
            newUser.password = bcrypt.hashSync(password,salt);
            const token = await generateJWT(newUser.id,newUser.name);
            await userRepository.save(newUser);
            
            res.status(200).json({
                ok:true,
                user: newUser,
                token
            })

        } catch (error) {
            console.log(error);
            res.status(500).json({
                ok:false,
                msg:'Something went wrong'
            })
        }
        
    },
    /**
     * Funcion para añadir el perfil del usuario en la base de datos
     * @param req - informacion enviada por el body
     * @param res - Informacion enviada por url
     * @returns - Usuario actualizado
     */
    updateProfile: async (req, res = response) => {

    },

    /**
      * Funcion para buscar informacion de un usuario en la base de datos
      * @param req - informacion enviada por el body
      * @param res - Informacion enviada por url
      * @returns - Usuario actualizado
      */
    findUser: async (req, res = response) => {
        const userRepository = getRepository(User);
    }
    ,

    /**Funcion para iniciar sesion del usuario
     * @param {string} email - Correo del usuario
     * @param {string} password - Contraseña del usuario
     * @param {string} dbUser._id - Identificador del usuario
     */
    userLogin: async (req, res = response) => {
        const userRepository = getRepository(User);
        const { email, password } = req.body;

        try {
            const dbUser = await userRepository.findOne({ email: email });
            console.log(dbUser,'asdas');
            if (!dbUser) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Credentials are not correct.'
                });
            }

            let compare = bcrypt.compareSync(password,dbUser.password);
            if(!compare){
                return res.status(400).json({
                    ok: false,
                    msg: 'Credentials are not correct.'
                });
            }

            const token = await generateJWT(dbUser.id,dbUser.name);
            return res.status(200).json({
                ok:true,
                user:userInfo(dbUser),
                token
            });

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



    },
    /** Funcion que me recibe el usuario de Facebook  verificado
     *  cuando el token es valido
     * @param {error} error - Error
     * @param {Object} user - Inforamcion del usuario
     * @param {string} info - Token de facebook
     *  */
    authFb: function (req, res) {

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

    }
}

export default authController;
