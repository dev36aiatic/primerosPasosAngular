//Importacion del framework express para trabajar con las rutas
const express = require('express');

//Passport para el login de facebook

const passport = require('passport');

//Modulo que me permite configurar peticiones AJAX
const cors = require('cors');

const SocialUser = require('./models/GoogleFbUser');

/* Importacion de morgan */
const morgan = require('morgan');

//Modulo que me permite trabajar mas facil con las rutas de los directorios
var path = require('path');

//Importacion de la funcion que permite la conexion a la base de datos
const {
    dbConnection
} = require('./db/config');

/* Lo que hace esto es que cuando cargue la aplicacion lea el archivo .env, es decir, 
las variables de entorno */
require('dotenv').config();

//Crear servidor utilizando express
const app = express();

//Morgan para leer las peticiones
app.use(morgan('tiny'));


//Autentificacion con facebook

const FacebookTokenStrategy = require('passport-facebook-token');

passport.use(new FacebookTokenStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    fbGraphVersion: 'v3.0'
  }, async function(accessToken, refreshToken, profile, done) {

      let dbUser = await SocialUser.findOne({id: profile.id})
      console.log(dbUser);
      if(dbUser == null){
          const { name, email, id } = profile._json;
          dbUser = new SocialUser({name,email,id});
          await dbUser.save();
      }
      return done((dbUser == null),dbUser,accessToken);
  }
));

//Conexion a la base de datos
dbConnection();

/* Defino la variable port y le asigno a esta  el valor de la variable de entorno PORT 
y si no la encuentra que use el puerto 5050 */
app.set('port', process.env.PORT || 5050);



//Configuracion de CORS 
app.use(cors());


//Transformar lo que viene en el body
app.use(express.json());

//Inicializar passport
app.use(passport.initialize());
app.use(passport.session());

//Morgan para leer las peticiones





//Servir documentos estaticos que estan en la carpeta public
app.use(express.static(path.join(__dirname + '/public')));

//Aqui se le dice al servidor las rutas que debe usar
app.use('/', require('./routes/auth'));

//Manejar demas rutas


//Aqui se al servidor a escuchar el puerto que está guardado en la variable 'port'
app.listen(app.get('port'), () => {
    console.log(`Server is running on port ${ app.get('port') }`);
});