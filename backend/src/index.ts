import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as dotenv from 'dotenv';
import * as morgan from 'morgan';
import * as cors from 'cors';
import * as helmet from 'helmet';
import router from './routes/auth';
import * as passport from 'passport';
import * as path from 'path';
import * as FacebookTokenStrategy from 'passport-facebook-token';
import { getRepository } from "typeorm";
import { SocialUser } from "./entity/GoogleOrFbUser";
import { Profile } from './entity/Profile';

createConnection().then(async () => {

    const app = express();

    /**Leer archivo de variables de entorno .env */
    dotenv.config();

    /**Modulo que ayuda a hacer la app mas segura colocando http headers */
    app.use(helmet());

    /**Configuracion de las peticiones http permitidas */
    app.use(cors());

    /** Middleware que me analiza el json enviado */
    app.use(express.json());

    /**Definicion del puerto del servidor */
    app.set('port', process.env.PORT || 5050);

    /**Leer peticiones de rutas */
    app.use(morgan('tiny'));

    /** Funcion para obtener la ruta actual */

    /**
     * Verifica si el token enviado por Facebook es valido
     * @param {string} accessToken - Token
     * @param {string} refreshToken - Token opcional para refrescar el accessToken
     * @param {Object} profile - El usuario que envia facebook para la autenticacion
     */

    passport.use(new FacebookTokenStrategy({
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        fbGraphVersion: 'v3.0'
    }, async function (accessToken, refreshToken, profile, done) {
        const socialUserRepository = getRepository(SocialUser);
        const profileRepository = getRepository(Profile);
        let dbUser = await socialUserRepository.findOne({ idFb: profile.id })
        if (dbUser == null) {
            const { name, email, id } = profile._json;
            let dbProfile = new Profile();
            dbProfile.skills = [];
            await profileRepository.save(dbProfile);

            dbUser = new SocialUser();
            dbUser.name = name;
            dbUser.email = email;
            dbUser.idFb = id;
            dbUser.profile = dbProfile;
            dbUser.provider = "FACEBOOK";
            
            await socialUserRepository.save(dbUser);
        }
        return done((dbUser == null), dbUser, accessToken);
    }
    ));

    app.use(express.static(path.join(__dirname + '/public')));
    /* console.log('ola')
    console.log(path.join(__dirname + '/public')); */
    /**Leer las rutas*/
    app.use('/', router);

    app.listen(app.get('port'), () => {
        console.log(`Servidor corriendo en el puerto ${app.get('port')}`);
    });


}).catch(error => console.log(error));
