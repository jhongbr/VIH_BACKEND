const citasModel = require("../models/CitasModel");

//Metodos para las citas

module.exports.createCitas = async (cita) => {
  try {
    return await cita.save();
  } catch (error) {
    throw new Error('Erorr al crear la cita');
  }
};

module.exports.ListCitas = async () => {
  try {
    return await citasModel.find();
  } catch (error) {
    throw new Error('Error al listar las citas')
  }
};

/*module.exports.ListCitas = async () => {
  try {
    return await citasModel.find();
  } catch (error) {
    throw new error('Erorr al listar las citas')
  }
};*/

module.exports.FindByIdCitas = async (id) => {
  try {
    return await citasModel.findOne({ _id: id });
  } catch (err) {
    throw new Error('Error al buscar la cita por id')
  }
};

module.exports.DeleteByIdCitas = async (id) => {
  try {
    return await citasModel.findByIdAndDelete({ _id: id });
  } catch (err) {
    throw new Error('Error al eliminar la cita por id')
  }
};

module.exports.UpdateCitas = async (_id, cita) => {
  try {
    return await citasModel.findByIdAndUpdate({ _id: cita.id }, {
      name: cita.name, hora: cita.hora,
      fecha: cita.fecha, paciente: cita.paciente, medico: cita.medico, estado: cita.estado
    });
  } catch (err) {
    throw new Error('Erorr al actualizar la cita')
  }
};