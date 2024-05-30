const express = require('express');
const citaController = require('../controllers/CitasController');


const api = express.Router();

api.post('/cita/registrar', citaController.CrearCitas);
api.get('/cita/listar', citaController.ListarCitas);
api.put('/cita/buscarDni', citaController.BuscarCistasById);
api.delete('/cita/eliminar/:id', citaController.EliminarByIdCitas);
api.put('/cita/actualizar/:id', citaController.UpdateCitaById);

module.exports = api;