const { Schema, model} = require('mongoose');

const GoogleOrFacebookUser = Schema({
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

module.exports = model('GoogleUsuario', GoogleOrFacebookUser);  
