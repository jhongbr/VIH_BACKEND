const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

//Defino el esquema del medico
const medicosSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    especialidad:{
        type: String,
        required: true
    },
    dni:{
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
    }
}, {timestamps: true});

//exporto el modelo de la base de datos
module.exports = mongoose.model("Medicos", medicosSchema);