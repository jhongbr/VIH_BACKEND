const { Response } = require("../utils/Response");
const AdminModel = require("../models/AdminModel");
const adminRepository = require('../repository/AdminRepo');


//Metodos para Usuarios
async function RegistrarAdmin(req, res) {

    const { name, lastname,  email, password, veriPassword, tipoUsuario } = req.body;
    const admin = new AdminModel();

    try {
        
        admin.name = name;
        admin.lastname = lastname;
        admin.email = email;
        admin.password = password;
        admin.veriPassword = veriPassword;
        admin.tipoUsuario = tipoUsuario;

        const result = await adminRepository.createUserAdmin(admin);
        Response.status = 201;
        Response.message = 'Administrador creado exitosamente';
        Response.result = result;

        res.status(201).send(
            Response

        );
    } catch (error) {
        console.log("Error:", error)
        Response.status = 500;
        Response.message = "Error al registrar el administrador";
        Response.result = error;

        res.status(500).send(
            Response
        );
    }
}

async function ListarAdmin(req, res) {
    try {

        const result = await adminRepository.ListAdmin();
        Response.status = 200;
        Response.message = 'Listado correctamente';
        Response.result = result;

        res.status(200).send(
            Response
        )
    } catch (error) {

        console.log("Error:", error)
        Response.status = 500;
        Response.message = 'Error al listar los administradores';
        Response.result = result;

        res.status(500).send(
            Response
        )
    }
}

async function BuscarByIdAdmin(req, res) {
    try {
        const result = await adminRepository.FindByIdAdmin(id);
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
        Response.message = 'Error al buscar el administrador';
        Response.result = result;
    }

    res.status(500).send(
        Response
    )
}

async function EliminarByIdAdmin(req, res){
    
    const id = req.params['id'];
    try {
        await adminRepository.DeleteByIdAdmin(id);
        Response.status = 200;
        Response.message = "Eliminado con exito";
        Response.result = result;

        res.status(200).send(
            Response
        );
    } catch (error) {
        console.log("Error:", error)
        Response.status = 500;
        Response.message = "Error al eliminar el administrador";
        Response.result = error;

        res.status(500).send(
            Response
        );
    }
}

async function ActualizarByIdAdmin(req, res) {

    const id = req.params['id'];
    const infoactualiza = req.body;
    try {
        const result = await adminRepository.UpdateAdmin(id, infoactualiza);
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
        Response.message = "Error al actualizar la informacion del administrador";
        Response.result = error;

        res.status(500).send(
            Response
        );
    }
}

module.exports = {
    RegistrarAdmin,
    ListarAdmin,
    BuscarByIdAdmin,
    EliminarByIdAdmin,
    ActualizarByIdAdmin
}