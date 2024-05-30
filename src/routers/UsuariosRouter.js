const express = require('express');
const usuarioController = require('../controllers/UsuariosController');


const api = express.Router();

api.post('/usuarios/registrar', usuarioController.RegistrarUsuario);
api.get('/usuarios/listar', usuarioController.ListarUsuarios);
api.put('/usuarios/buscarDni', usuarioController.BuscarByDniUsuario);
api.delete('/usuarios/eliminar/:id', usuarioController.EliminarByIdUsuario);
api.put('/usuarios/actualizar/:id', usuarioController.ActualizarByIdUsuario);

module.exports = api;