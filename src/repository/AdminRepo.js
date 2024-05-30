const adminModel = require("../models/AdminModel");

//Metodos para las citas

module.exports.createUserAdmin = async (admin) => {
  try {
    return await admin.save();
  } catch (error) {
    throw new Error('Erorr al crear el usuario administrador');
  }
};

module.exports.ListAdmin = async () => {
  try {
    return await adminModel.find();
  } catch (error) {
    throw new error('Erorr al listar los administradores')
  }
};

module.exports.FindByIdAdmin = async (id) => {
  try {
    return await adminModel.findOne({ _id: id });
  } catch (err) {
    throw new Error('Erorr al buscar el administrador')
  }
};

module.exports.DeleteByIdAdmin = async (id) => {
  try {
    return await adminModel.findByIdAndDelete({ _id: id });
  } catch (err) {
    throw new Error('Erorr al eliminar el administrador por id')
  }
};

module.exports.UpdateAdmin = async (_id, admin) => {
  try {
    return await adminModel.findByIdAndUpdate({ _id: admin.id }, {
      password: admin.password
    });
  } catch (err) {
    throw new Error('Erorr al actualizar la informacion del administrador')
  }
};