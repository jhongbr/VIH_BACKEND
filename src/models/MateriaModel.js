 const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Defino el esquema de la cita
const MateriaSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    hora: {
        type: String,
        required: true,
        unique: true
    },
    dia: {
        type: Date,
        required: true,
        unique: true
    },

}, { timestamps: true });

//exporto el modelo de la base de datos
module.exports = mongoose.model("Materias", MateriaSchema);