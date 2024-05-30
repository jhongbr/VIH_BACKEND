const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Defino el esquema del medico
const adminSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    lastname:{
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
        required: true,
        unique: true
    },
    veriPassword:{
        type: String,
        required: true,
        unique: true
    },
    tipoUsuario:{
        type: String,
        required: true,
    }
},{timestamps: true});

//exporto el modelo de la base de datos
module.exports = mongoose.model('Admin', adminSchema)