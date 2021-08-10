import mongoose from "mongoose";

const schema = mongoose.Schema;
/**
 * Crea una un nuevo modelo de usuario de tipo Google o Faceobok
 * @class 
 * @property {string} name - Nombre del usuario de Google o Facebook
 * @property {string} email - Correo del usuario de Google o Facebook
 * @property {string} [id] - Identificador del usuario de Google o Facebook
 */

const GoogleOrFacebookUser = new schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    id:{
        type:String,
        required: false
    }
});

const SocialUser = mongoose.model('GoogleUsuario', GoogleOrFacebookUser )
export { SocialUser }

