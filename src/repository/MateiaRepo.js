const citasModel = require("../models/MateriaModel");

//Metodos para las citas

module.exports.createMateria = async (materia) => {
  try {
    return await materia.save();
  } catch (error) {
    throw new Error('Erorr al crear la materia');
  }
};

module.exports.ListMateria = async () => {
  try {
    return await materiaModel.find();
  } catch (error) {
    throw new Error('Error al listar las materias')
  }
};

/*module.exports.ListCitas = async () => {
  try {
    return await citasModel.find();
  } catch (error) {
    throw new error('Erorr al listar las citas')
  }
};*/

module.exports.DeleteByIdMateria = async (id) => {
  try {
    return await materiaModel.findByIdAndDelete({ _id: id });
  } catch (err) {
    throw new Error('Error al eliminar la materia por id')
  }
};

module.exports.UpdateMateria = async (_id, materia) => {
  try {
    return await citasModel.findByIdAndUpdate({ _id: materia.id }, {
      name: materia.name, hora: materia.hora,
      dia: materia.dia
    });
  } catch (err) {
    throw new Error('Erorr al actualizar la materia')
  }
};