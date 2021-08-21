import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as dotenv from 'dotenv';
import * as morgan from 'morgan';
import * as cors from 'cors';
import * as helmet from 'helmet';
import router  from './routes/auth';


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
    
    /**Leer las rutas*/
    app.use('/',router);

    app.listen(app.get('port'),()=>{
        console.log(`Servidor corriendo en el puerto ${app.get('port')}`);
    });


}).catch(error => console.log(error));
