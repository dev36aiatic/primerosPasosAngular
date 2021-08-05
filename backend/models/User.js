const { Schema, model } = require('mongoose');

/* Modelo del Usuario que se guarda en la base de datos */
const UsuarioSchema = Schema({
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

//Aqui se define la coleccion en la que va ir el Usuario creado
module.exports = model('Usuario', UsuarioSchema);
