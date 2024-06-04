const medicoModel = require("../models/MedicosModel");

//Metodos para los medicos

module.exports.createMedicos = async (medico) => {
  try {
    return await medico.save();
  } catch (error) {
    throw new Error('Erorr al crear el medico');
  }
};

module.exports.ListMedicos = async () => {
  try {
    return await medicoModel.find();
  } catch (error) {
    throw new Error('Erorr al listar los medico')
  }
};

/*module.exports.ListCitas = async () => {
  try {
    return await citasModel.find();
  } catch (error) {
    throw new error('Erorr al listar las citas')
  }
};*/

module.exports.FindByIdMedicos = async (dni) => {
  try {
    return await medicoModel.findOne({ dni: dni });
  } catch (err) {
    throw new Error('Erorr al buscar el medico por dni')
  }
};

module.exports.DeleteByIdMedicos = async (id) => {
  try {
    return await medicoModel.findByIdAndDelete({ _id: id });
  } catch (err) {
    throw new Error('Error al eliminar el medico por id')
  }
};

module.exports.UpdateMedicos = async (_id, medico) => {
  try {
    return await medicoModel.findByIdAndUpdate({ _id: medico.id }, {
      name: medico.name, email: medico.email, password: medico.password
    });
  } catch (err) {
    throw new Error('Erorr al actualizar la informacion del medico')
  }
};