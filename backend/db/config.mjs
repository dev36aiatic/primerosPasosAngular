import mongoose from 'mongoose';

/**
 * Funncion que hace conexión a la base de datos
 * @async
 * @function dbConnection
 * @param {string} process.env.BD_CNN - Variable de entorno con la ruta de conexion a la base de datos
 * @return {string} - Mensaje de conexion exitosa o error en la conexion
 */
const dbConnection = async ()=>{

    try {
       await mongoose.connect(process.env.BD_CNN, {
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useCreateIndex: true
    });
    console.log('Database is running...');
        
    } catch (error) {
        console.log(error);
        throw new Error('Error while initializing the database.');
    }
}

export default dbConnection;