const { Response } = require('../utils/Response');
const CitaModel = require('../models/CitasModel');
const CitaRepository = require('../repository/CitasRepo');

async function CrearCitas(req, res) {

    const { name, hora, fecha, paciente, medico, estado, motivo, observaciones } = req.body;
    const Cita = new CitaModel();

    try {
        Cita.name = name;
        Cita.hora = hora;
        Cita.fecha = fecha;
        Cita.paciente = paciente;
        Cita.medico = medico;
        Cita.estado = estado;
        Cita.motivo = motivo;
        Cita.observaciones = observaciones;

        const result = await CitaRepository.createCitas(Cita);
        Response.status = 201;
        Response.message = 'Cita creada exitosamente';
        Response.result = result;

        res.status(201).send(
            Response
        );
    } catch (error) {
        console.log("Error:", error)
        Response.status = 500;
        Response.message = 'Error al crear la cita';
        Response.result = error;

        res.status(500).send(
            Response
        );
    }
}

async function ListarCitas(req, res) {
    try {

        const result = await CitaRepository.ListCitas();
        Response.status = 200;
        Response.message = 'Listado corrrectamente';
        Response.result = result;

        res.status(200).send(
            Response
        );
    } catch (error) {

        console.log("Erros: error")
        Response.status = 500;
        Response.message = 'Error al listar las Citas';
        Response.result = result;

        res.status(500).send(
            Response
        );
    }
}

async function BuscarCistasById(req, res) {

    try {
        //const id = req.params['id'];
        const result = await CitaRepository.FindByIdCitas(id);
        if (result) {
            Response.status = 200;
            Response.message = 'Busqueda exitosa';
            Response.result = result;
        } else {
            Response.status = 404;
            Response.message = 'No se encontro una cita por el id buscado'
        }

        res.status(200).send(
            Response
        )
    } catch (error) {
        console.log("Error:", error);
        Response.status = 500;
        Response.message = 'imposible encontrar la cita'
        Response.result = result;

        res.status(500).send(
            Response
        );
    }
}

async function EliminarByIdCitas(req, res) {

    const id = req.params['id'];
    try {
        const result = await CitaRepository.DeleteByIdCitas(id);
        Response.status = 200;
        Response.message = "Cita eliminada con exito";
        Response.result = result;

        res.status(200).send(
            Response
        );
    } catch (error) {
        consle.log("Error:", error);
        Response.status = 500;
        Response.message = "Error al eliminar la Cita";
        Response.result = error;

        res.status(500).send(
            Response
        );
    }
}

async function UpdateCitaById(req, res) {

    const id = req.params['id'];
    const infoactualiza = req.body;
    try {
        const result = await CitaRepository.UpdateCitas(id, infoactualiza);
        Response.status = 200;
        Response.message = "Cita actualizada con exito";
        Response.result = result;

        res.status(200).send(
            Response
        );
    } catch (error) {
        consle.log("Error:", error);
        Response.status = 500;
        Response.message = "Error al actualizar la Cita";
        Response.result = error;

        res.status(500).send(
            Response
        );
    }
}

module.exports = {
    CrearCitas,
    ListarCitas,
    BuscarCistasById,
    EliminarByIdCitas,
    UpdateCitaById
}