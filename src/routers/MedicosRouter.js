const express = require('express');
const medicoController = require('../controllers/MedicosController');


const api = express.Router();

api.post('/medico/registrar', medicoController.RegistrarMedico);
api.get('/medico/listar', medicoController.ListarMedicos);
api.put('/medico/buscarDni', medicoController.BuscarByDniMedico);
api.delete('/medico/eliminar/:id', medicoController.EliminarByIdMedico);
api.put('/medico/actualizar/:id' , medicoController.ActualizarByIdMedico);

module.exports = api;