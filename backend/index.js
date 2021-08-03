const express = require('express');
const cors = require('cors');
var path = require('path');

//Lo que hace esto es que cuando cargue la aplicacion lea el archivo .env
require('dotenv').config();

//Crear servidor utilizando express
const app = express();

//port es una variable y luego accedo al puerto con app.get('port');
//Aqui le digo que utilice la variable de entorno PORT o sino 5050
app.set('port', process.env.PORT || 5050);
//cors

app.use( cors() );

//Transformar lo que viene en el body
app.use( express.json() );

//Servir pagina 

app.use(express.static(path.join(__dirname+'/public')));

//Rutas
app.use('/', require('./routes/auth'));

app.listen( app.get('port') , ()=>{
    console.log(`Servidor corriendo en el puerto ${ app.get('port') }`);
});