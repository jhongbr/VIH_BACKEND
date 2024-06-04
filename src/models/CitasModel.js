 const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Defino el esquema de la cita
const citasSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    hora: {
        type: String,
        required: true,
        unique: true
    },
    fecha: {
        type: Date,
        required: true,
        unique: true
    },
    paciente: {
        type: String,
        required: true
    },
    medico: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        required: true
    },
    motivo: {
        type: String,
        required: true
    },
    observaciones: {
        type: String,
        required: true
    }

}, { timestamps: true });

//exporto el modelo de la base de datos
module.exports = mongoose.model("Citas", citasSchema);