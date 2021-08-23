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

/**Se establece la conxion a la base de datos relacional */
createConnection().then(async () => {

    /**Se crea la aplicacion de express */
    const app = express();

    /**Leer archivo de variables de entorno .env */
    dotenv.config();

    /**Modulo que ayuda a hacer la app mas segura a traves de http headers */
    app.use(helmet());

    /**Configuracion de las peticiones http permitidas */
    app.use(cors());

    /** Middleware que me analiza el json enviado */
    app.use(express.json());

    /**Definicion del puerto del servidor */
    app.set('port', process.env.PORT || 5050);

    /**Leer peticiones de rutas */
    app.use(morgan('tiny'));


    /**
     * Verifica si el token enviado por Facebook es valido
     * @property {string} clientID - Identificador de la app para el login con facebook 
     * @property {string} clientSecret - Llave secreta de la app para el login con facebook 
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

    /**La app de express toma las rutas establecidas en el modulo de router*/
    app.use('/', router);

    /**La app de express escucha el puerto establecido en la variable port */
    app.listen(app.get('port'), () => {
        console.log(`Servidor corriendo en el puerto ${app.get('port')}`);
    });


}).catch(error => console.log(error));
