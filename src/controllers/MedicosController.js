const { Response } = require("../utils/Response");
const MedicoModel = require("../models/MedicosModel");
const medicoRepository = require('../repository/MedicosRepo');


//Metodos para Medicos
async function RegistrarMedico(req, res) {

    const { name, especialidad, dni, email, password } = req.body;
    const medico = new MedicoModel();

    try {
        medico.name = name;
        medico.especialidad = especialidad;
        medico.dni = dni;
        medico.email = email;
        medico.password = password;

        const result = await medicoRepository.createMedicos(medico);
        Response.status = 201;
        Response.message = 'Medico creado exitosamente';
        Response.result = result;

        res.status(201).send(
            Response

        );
    } catch (error) {
        console.log("Error:", error)
        Response.status = 500;
        Response.message = "Error al registrar el medico";
        Response.result = error;

        res.status(500).send(
            Response
        );
    }
}

async function ListarMedicos(req, res) {
    try {

        const result = await medicoRepository.ListMedicos();
        Response.status = 200;
        Response.message = 'Listado correctamente';
        Response.result = result;

        res.status(200).send(
            Response
        )
    } catch (error) {

        console.log("Error:", error)
        Response.status = 500;
        Response.message = 'Error al listar los medicos';
        Response.result = result;

        res.status(500).send(
            Response
        )
    }
}

async function BuscarByDniMedico(req, res) {
    try {
        const result = await medicoRepository.FindByIdMedicos(Dni);
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
        Response.message = 'Error al buscar el medico por Dni';
        Response.result = result;
    }

    res.status(500).send(
        Response
    )
}

async function EliminarByIdMedico(req, res){
    
    const id = req.params['id'];
    try {
        await medicoRepository.DeleteByIdMedicos(id);
        Response.status = 200;
        Response.message = "Eliminado con exito";
        Response.result = result;

        res.status(200).send(
            Response
        );
    } catch (error) {
        console.log("Error:", error)
        Response.status = 500;
        Response.message = "Error al eliminar el medico";
        Response.result = error;

        res.status(500).send(
            Response
        );
    }
}

async function ActualizarByIdMedico(req, res) {

    const id = req.params['id'];
    const infoactualiza = req.body;
    try {
        const result = await medicoRepository.UpdateMedicos(id, infoactualiza);
        Response.status = 200;
        Response.message = "Medico actualizado con exito";
        Response.result = result;

        res.status(200).send(
            Response
        );
    } catch (error) {
        consle.log("Error:", error);
        Response.status = 500;
        Response.message = "Error al actualizar la informacion del medico";
        Response.result = error;

        res.status(500).send(
            Response
        );
    }
}

module.exports = {
    RegistrarMedico,
    ListarMedicos,
    BuscarByDniMedico,
    EliminarByIdMedico,
    ActualizarByIdMedico
}