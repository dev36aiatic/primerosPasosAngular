import mongoose from "mongoose";

const schema = mongoose.Schema;

/**
 * Crea una un nuevo modelo de usuario
 * @class 
 * @property {string} name - Nombre del usuario
 * @property {string} email - Correo del usuario
 * @property {string} contraseña - Contraseña del usuario
 */
const UsuarioSchema = new schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
});

const Usuario = mongoose.model('Usuario',UsuarioSchema);
export { Usuario }
