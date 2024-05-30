const { Response } = require("../utils/Response");
const UsuarioModel = require("../models/UsuariosModel");
const usuarioRepository = require('../repository/UsuariosRepo');


//Metodos para Usuarios
async function RegistrarUsuario(req, res) {

    const { name, lastname, username, email, password, telephone, fechaNacimiento,
        dni, genero } = req.body;
    const usuario = new UsuarioModel();

    try {
        usuario.name = name;
        usuario.lastname = lastname;
        usuario.username = username;
        usuario.email = email;
        usuario.password = password;
        usuario.telephone = telephone;
        usuario.fechaNacimiento = fechaNacimiento;
        usuario.dni = dni;
        usuario.genero = genero;

        const result = await usuarioRepository.createUsuario(usuario);
        Response.status = 201;
        Response.message = 'Usuario creado exitosamente';
        Response.result = result;

        res.status(201).send(
            Response

        );
    } catch (error) {
        console.log("Error:", error)
        Response.status = 500;
        Response.message = "Error al registrar el usuario";
        Response.result = error;

        res.status(500).send(
            Response
        );
    }
}

async function ListarUsuarios(req, res) {
    try {

        const result = await usuarioRepository.ListUsuario();
        Response.status = 200;
        Response.message = 'Listado correctamente';
        Response.result = result;

        res.status(200).send(
            Response
        )
    } catch (error) {

        console.log("Error:", error)
        Response.status = 500;
        Response.message = 'Error al listar los usuarios';
        Response.result = result;

        res.status(500).send(
            Response
        )
    }
}

async function BuscarByDniUsuario(req, res) {
    try {
        const result = await usuarioRepository.FindByDniUsuario(Dni);
        if (result) {
            Response.status = 200;
            Response.message = 'Busqueda exitosa';
            Response.result = result;
        } else {
            Response.status = 404;
            Response.message = 'No se encontraron resultados';
        }

        res.status(200).sen(
            Response
        )
    } catch (error) {
        console.log("Error:", error)
        Response.status = 500;
        Response.message = 'Error al buscar el usuario por Dni';
        Response.result = result;
    }

    res.status(500).send(
        Response
    )
}

async function EliminarByIdUsuario(req, res){
    
    const id = req.params['id'];
    try {
        await usuarioRepository.DeleteByIdUsuario(id);
        Response.status = 200;
        Response.message = "Eliminado con exito";
        Response.result = result;

        res.status(200).send(
            Response
        );
    } catch (error) {
        console.log("Error:", error)
        Response.status = 500;
        Response.message = "Error al eliminar el usuario";
        Response.result = error;

        res.status(500).send(
            Response
        );
    }
}

async function ActualizarByIdUsuario(req, res) {

    const id = req.params['id'];
    const infoactualiza = req.body;
    try {
        const result = await usuarioRepository.UpdateUsuario(id, infoactualiza);
        console.log(result);
        Response.status = 200;
        Response.message = "Usuario actualizado con exito";
        Response.result = result;

        res.status(200).send(
            Response
        );
    } catch (error) {
        console.log("Error:", error);
        Response.status = 500;
        Response.message = "Error al actualizar la informacion del usuario";
        Response.result = error;

        res.status(500).send(
            Response
        );
    }
}

module.exports = {
    RegistrarUsuario,
    ListarUsuarios,
    BuscarByDniUsuario,
    EliminarByIdUsuario,
    ActualizarByIdUsuario
}