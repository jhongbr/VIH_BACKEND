const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

//Defino el esquema del usuario
const usuariosSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        unique: true
    },
    telephone:{
        type: String,
        required: true,
        unique: true
    },
    fechaNacimiento:{
        type: String,
        required: true
    },
    dni:{
        type: String,
        required: true,
        unique: true
    },
    genero:{
        type: String,
        required: true
    },
    
}, {timestamps: true});

//exporto el modelo de la base de datos
module.exports = mongoose.model('Usuarios', usuariosSchema);