const mongoose = require('mongoose');

//Conexion a la base de datos
const dbConnection = async ()=>{

    //Aqui se le dice que intente conectarse a la variable de entorno BD_CNN ( BASE DE DATOS_CONNECTION )
    try {
       await mongoose.connect(process.env.BD_CNN, {
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useCreateIndex: true
    });
    //Si se logra conectar exitosamente mostrará este mensaje
    console.log('Database is running...');
        
    } catch (error) {
        console.log(error);
        //Si no se logra conectra a la base de datos mostrará este mensaje
        throw new Error('Error while initializing the database.');
    }
}

module.exports = {
    dbConnection
};