import mongoose from "mongoose";

const schema = mongoose.Schema;
/**
 * Crea una un nuevo modelo de usuario de tipo Google o Faceobok
 * @class 
 * @property {string} name - Nombre del usuario de Google o Facebook
 * @property {string} email - Correo del usuario de Google o Facebook
 * @property {string} [idfB] - Identificador del usuario de Facebook
 * @property {string} [cc] - Identificador del usuario
 * @property {string} [address] - Direccion del usuario
 * @property {string} [dateOfBith] - Fecha de nacimiento
 * @property {string} [city] - Ciudad donde vide
 * @property {string} [department] - Departamento donde vide
 * @property {string} [country] - Pais donde vive
 * @property {string} [postal] - Codigo postal
 * @property {string} [profession] - Profesion
 * @property {string} [skills] - Habilidades
 * @property {string} [description] - Descripcion de su persona
 */

const GoogleOrFacebookUser = new schema({
    provider:{
        type:String,
        required: false
    },
    name:{
        type:String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    idFb:{
        type:String,
        required: false
    },
    profile: {
        
        cc:{
            type: Number,
            required: false
        },
        address:{
            type: String,
            required: false
        },
        dateOfBirth:{
            type: String,
            required: false
        },
        city:{
            type: String,
            required: false
        },
        department:{
            type: String,
            required: false
        },
        country:{
            type: String,
            required: false
        },
        ZIP:{
            type: Number,
            required: false
        },
        profession:{
            type: String,
            required: false
        },
        skills:{
            type: [],
            required: false
        },
        description:{
            type: String,
            required: false
        }
    
    }

});

const SocialUser = mongoose.model('GoogleUsuario', GoogleOrFacebookUser )
export { SocialUser }

