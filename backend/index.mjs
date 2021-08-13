import express from 'express';
import passport from 'passport';
import cors from 'cors';
import morgan from 'morgan';
import { fileURLToPath } from 'url';
import path,{dirname} from 'path';
import dotenv from 'dotenv';
import FacebookTokenStrategy from 'passport-facebook-token';

import { routes } from './routes/auth.mjs';
import {SocialUser} from './models/GoogleFbUser.mjs';
import dbConnection  from './db/config.mjs';

const app = express();

/**Funcion que lee las variables de entorno en el archivo .env */
dotenv.config();

/**Middleware para la captura de solicitudes HTTP */
app.use(morgan('tiny'));

/** Funcion para obtener la ruta actual */
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
  }, async function(accessToken, refreshToken, profile, done) {

      let dbUser = await SocialUser.findOne({idFb: profile.id})
      if(dbUser == null){
          const { name, email, id } = profile._json;
          dbUser = new SocialUser({name,email,idFb:id,provider:"FACEBOOK"});
          await dbUser.save();
      }
      return done((dbUser == null),dbUser,accessToken);
  }
));

/**Conexion a la base de datos*/
dbConnection();

/** Definicion de la variable del puerto de la app*/ 
app.set('port', process.env.PORT || 5050);

/**Configuracion del CORS */
app.use(cors());


//Funcion que acepta y analiza JSON
app.use(express.json());

/* 
Inicializar passport
app.use(passport.initialize());
app.use(passport.session()); */


/**  Toma los archivos en la carpeta public que son mostrados al usuario  */
app.use(express.static(path.join(__dirname + '/public')));

/** Rutas usadas por el servidor*/
app.use('/',routes);



/** Servidor escuchando el puerto que se definio en la variable 'port'*/
app.listen(app.get('port'), () => {
    console.log(`Server is running on port ${ app.get('port') }`);
});