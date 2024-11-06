const express = require('express');
const materiaController = require('../controllers/MateriaController');


const api = express.Router();

api.post('/materia/registrar', materiaController.CrearMateria);
api.put('/materia/buscar', materiaController.ListarMaterias);
api.delete('/materia/eliminar/:id', materiaController.EliminarByIdMateria);
api.put('/materia/actualizar/:id', materiaController.UpdateMateriaById);

module.exports = api;