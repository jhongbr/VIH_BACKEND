const express = require('express');
const adminController = require('../controllers/AdminController');


const api = express.Router();

api.post('/admin/registrar', adminController.RegistrarAdmin);
api.get('/admin/listar', adminController.ListarAdmin);
api.put('/admin/buscarDni', adminController.BuscarByIdAdmin);
api.delete('/admin/eliminar/:id', adminController.EliminarByIdAdmin);
api.put('/admin/actualizar/:id', adminController.ActualizarByIdAdmin);

module.exports = api;