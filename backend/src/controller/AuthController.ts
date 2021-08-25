import { response, request } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/User";
import { SocialUser } from '../entity/GoogleOrFbUser';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import generateJWT from '../helpers/generateJWT';
import userInfo from '../helpers/user-info';
import { Profile } from '../entity/Profile';
import { OAuth2Client } from 'google-auth-library';
import * as passport from 'passport';
import deleteImage from '../helpers/delete-prev-image';

/** Creacion del OAuth2Client de google para autenticacion */
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/** Controlador de las funciones ejecutadas cuando se hacen peticiones http*/
const authController = {
    /**Funcion para crear usuarios y guardarlos en la base de datos 
     * @param req - Informacion de la solicitud HTTP provocada
     * @param res - Permite devolver la respuesta HTTP 
     * @function getRepository - Funcion que trae la información de la tabla almacenada en la base de datos
     * @returns - Información del usuario y token
     * */
    newUser: async (req, res = response) => {
        const userRepository = getRepository(User);
        const profileRepository = getRepository(Profile);
        const { name, email, password } = req.body;

        try {
            //Buscar si existe el usuario en la bd
            let dbUser = await userRepository.findOne({ email });
            if (dbUser) {
                return res.status(400).json({
                    ok: false,
                    msg: 'A user with this email already exists.'
                })
            }
            /**
             * Crea un nuevo perfil
             * @class
             */
            let profile = new Profile();
            profile.skills = [];
            await profileRepository.save(profile);

            /**
             * Crea un nuevo Usuario
             * @class
             */
            let newUser = new User();
            newUser.name = name;
            newUser.email = email;
            newUser.profile = profile;
            const salt = bcrypt.genSaltSync();
            newUser.password = bcrypt.hashSync(password, salt);
            await userRepository.save(newUser);

            const findUser = await userRepository.findOne({ email });
            const token = await generateJWT(findUser.user_id, findUser.name);

            res.status(200).json({
                ok: true,
                user: userInfo(findUser),
                token
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                ok: false,
                msg: 'Something went wrong'
            })
        }
    },
    /**
     * Funcion para añadir el perfil del usuario en la base de datos
     * @param req - Informacion de la solicitud HTTP provocada
     * @param res - Permite devolver la respuesta HTTP 
     * @function getRepository - Funcion que me trae la tabla de la base de datos
     * @returns - Usuario actualizado
     */
    updateProfile: async (req, res = response) => {

        const { id, provider } = req.params;
        const { name, cc, address, dateOfBirth,
            city, department, country, ZIP,
            profession, skills, description } = req.body;

        try {
            const userRepository = getRepository(User);
            const socialUserRepository = getRepository(SocialUser);
            const profileRepository = getRepository(Profile);
            let dbUser: User | SocialUser;

            if (provider == "GOOGLE" || provider == "FACEBOOK") {
                dbUser = await socialUserRepository.findOne({ user_id: id });
            } else {
                dbUser = await userRepository.findOne({ user_id: id });
            }

            let profile_id = dbUser.profile.profile_id;
            let dbProfile = await profileRepository.findOne({ profile_id });

            //Se captura el nombre y la ruta de la imagen a traves del middleware upload-image
            const { fileName, filePath} = req;

            //Se borra la imagen anterior
            deleteImage(dbProfile,filePath);

            dbUser.name = name;
            dbProfile.cc = cc;
            dbProfile.address = address;
            dbProfile.dateOfBirth = dateOfBirth;
            dbProfile.city = city;
            dbProfile.department = department;
            dbProfile.country = country;
            dbProfile.ZIP = ZIP;
            dbProfile.profession = profession;
            dbProfile.skills = skills;
            dbProfile.description = description;
            dbProfile.image = fileName;
            dbUser.profile = dbProfile;

            await profileRepository.save(dbProfile);

            if (provider == "GOOGLE" || provider == "FACEBOOK") {
                await socialUserRepository.save(dbUser);
            } else {
                await userRepository.save(dbUser);
            }

            return res.status(200).json({
                ok: true,
                user: userInfo(dbUser),
                msg: 'Thanks for the registration.'
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                ok: false,
                msg: 'Something went wrong.'
            });
        }
    },
    /**Funcion iniciar sesion 
   * @param req - Informacion de la solicitud HTTP provocada
   * @param res - Permite devolver la respuesta HTTP 
   * @function getRepository - Funcion que trae la información de la tabla almacenada en la base de datos
   * @returns - Información del usuario y token
   * */
    userLogin: async (req, res = response) => {
        const userRepository = getRepository(User);
        const { email, password } = req.body;

        try {
            const dbUser = await userRepository.findOne({ email: email });

            if (!dbUser) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Credentials are not correct.'
                });
            }

            let compare = bcrypt.compareSync(password, dbUser.password);

            if (!compare) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Credentials are not correct.'
                });
            }

            const token = await generateJWT(dbUser.user_id, dbUser.name);

            return res.status(200).json({
                ok: true,
                user: userInfo(dbUser),
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
    /** Funcion para renovar el token
       * @param req - Informacion de la solicitud HTTP provocada
       * @param res - Permite devolver la respuesta HTTP 
       * @function getRepository - Funcion que trae la información de la tabla almacenada en la base de datos
       * @returns - Información del usuario y token
       * */
    renewToken: async (req, res = response) => {
        const { uid, name } = req;
        const userRepository = getRepository(User);

        try {
            const dbUser = await userRepository.findOne({ user_id: uid });
            const token = await generateJWT(uid, name);

            return res.status(200).json({
                ok: true,
                user: userInfo(dbUser),
                token
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                ok: false,
                msg: 'Something went wrong'
            })
        }
    },
    /** Funcion que me recibe el usuario de Facebook  verificado
     *  cuando el token es valido
     * @param req - Informacion de la solicitud HTTP provocada
     * @param res - Permite devolver la respuesta HTTP 
     * @param {error} error - Error
     * @param {Object} user - Inforamcion del usuario
     * @param {string} info - Token de facebook
     *  */
    authFb: function (req, res) {
        passport.authenticate('facebook-token', function (error, user, info) {
            if (user) {
                res.status(200).json({
                    ok: true,
                    user: userInfo(user),
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
    /** Funcion que Autentica el token enviado por Google
     * @param req - Informacion de la solicitud HTTP provocada
     * @param res - Permite devolver la respuesta HTTP 
     * @property {object} - ticket
     * @property {(string | string[])} idToken - El token enviado por el front-end a verificar si es valido
     * @property {(string | string[])} audience - El id del cliente de la aplicacion creada en google console
     * @property { object } userDetails - Objeto con el nombre completo del usuario y correo
     * @property {string} userDetails.email - Correo del usuario
     * @property {string} userDetails.firstname - Primer nombre del usuario
     * @property {string} userDetails.lastname - Segundo nombre del usuario
     * @property {string} name- Nombre completo del usuario
     * @param {string} process.env.SECRET_KEY - LLave secreta para crear el token
     * @returns - Información del usuario y token
     */
    authGoogle: async (req, res) => {
        async function verify() {
            const socialUserRepository = getRepository(SocialUser);
            const profileRepository = getRepository(Profile);
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
            let dbUser = await socialUserRepository.findOne({
                email: userDetails.email
            });
            /**
            * Crea un nuevo perfil y Usuario Social
            * @class
            */
            if (dbUser == null) {
                let dbProfile = new Profile();
                dbProfile.skills = [];
                await profileRepository.save(dbProfile);

                dbUser = new SocialUser();
                dbUser.email = payload['email'];
                dbUser.name = payload['name'];
                dbUser.provider = "GOOGLE";
                dbUser.profile = dbProfile;
                await socialUserRepository.save(dbUser);
            }

            let token = jwt.sign(userDetails, process.env.SECRET_KEY, {
                expiresIn: "24h"
            });

            res.status(200).json({
                ok: true,
                token: token,
                user: userInfo(dbUser)
            })
        }
        verify().catch((error) => {
            console.log(error, 'Error con el token!');
            res.status(400).json({
                ok: false,
                msg: 'Invalid Token',
                error: error
            })
        });
    }
}

export default authController;
