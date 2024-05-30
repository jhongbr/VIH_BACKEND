const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Defino el esquema de la cita
const documentosSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    url:{
        type: String,
        required: true
    }
}, {timestamps: true});

//exporto el modelo de la base de datos
module.exports = mongoose.model("Documents", documentosSchema);