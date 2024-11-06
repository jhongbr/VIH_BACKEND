const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

//Defino el esquema del usuario
const usuariosSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        unique: true
    }
    
}, {timestamps: true});

//exporto el modelo de la base de datos
module.exports = mongoose.model('Usuarios', usuariosSchema);