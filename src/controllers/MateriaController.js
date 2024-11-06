const { Response } = require('../utils/Response');
const MateriaModel = require('../models/MateriaModel');
const MateriaRepository = require('../repository/MateiaRepo');

async function CrearMateria(req, res) {

    const { name, hora, dia} = req.body;
    const Materia = new MateriaModel();

    try {

        Cita.name = name;
        Cita.hora = hora; 
        Cita.dia = dia      

        const result = await MateriaRepository.createMateria(Materia);
        Response.status = 201;
        Response.message = 'Materia creada exitosamente';
        Response.result = result;

        res.status(201).send(
            Response
        );
    } catch (error) {
        console.log("Error:", error)
        Response.status = 500;
        Response.message = 'Error al crear la materia';
        Response.result = error;

        res.status(500).send(
            Response
        );
    }
}

async function ListarMaterias(req, res) {
    try {

        const result = await MateriaRepository.ListMaterias();
        Response.status = 200;
        Response.message = 'Listado corrrectamente';
        Response.result = result;

        res.status(200).send(
            Response
        );
    } catch (error) {

        console.log("Erros: error")
        Response.status = 500;
        Response.message = 'Error al listar las Materias';
        Response.result = result;

        res.status(500).send(
            Response
        );
    }
}


async function EliminarByIdMateria(req, res) {

    const id = req.params['id'];
    try {
        const result = await MateriaRepository.DeleteByIdMateria(id);
        Response.status = 200;
        Response.message = "Materia eliminada con exito";
        Response.result = result;

        res.status(200).send(
            Response
        );
    } catch (error) {
        consle.log("Error:", error);
        Response.status = 500;
        Response.message = "Error al eliminar la materia";
        Response.result = error;

        res.status(500).send(
            Response
        );
    }
}

async function UpdateMateriaById(req, res) {

    const id = req.params['id'];
    const infoactualiza = req.body;
    try {
        const result = await MateriaRepository.UpdateMateria(id, infoactualiza);
        Response.status = 200;
        Response.message = "Materia actualizada con exito";
        Response.result = result;

        res.status(200).send(
            Response
        );
    } catch (error) {
        consle.log("Error:", error);
        Response.status = 500;
        Response.message = "Error al actualizar la Materia";
        Response.result = error;

        res.status(500).send(
            Response
        );
    }
}

module.exports = {
    CrearMateria,
    ListarMaterias,
    EliminarByIdMateria,
    UpdateMateriaById
}