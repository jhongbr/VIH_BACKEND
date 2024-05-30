const usuarioModel = require("../models/UsuariosModel");

//Metodos para los usuarios
module.exports.createUsuario = async (usuario) => {
  try {
    return await usuario.save();
  } catch (err) {
    console.log({err});
    if(err.code == 11000) {
      throw new Error('El usuario ya existe');
    }else{
      throw new Error('Erorr al crear el usuario');
    }
  }
};

module.exports.ListUsuario = async () => {
  try {
    return await usuarioModel.find();
  } catch (error) {
    throw new error('Erorr al listar los usuarios')
  }
};

/*module.exports.ListCitas = async () => {
  try {
    return await citasModel.find();
  } catch (error) {
    throw new error('Erorr al listar las citas')
  }
};*/

module.exports.FindByDniUsuario = async (dni) => {
  try {
    return await usuarioModel.findOne({ dni: dni });
  } catch (err) {
    throw new Error('Erorr al buscar el usuario por dni')
  }
};

module.exports.DeleteByIdUsuario = async (id) => {
  try {
    return await usuarioModel.findByIdAndDelete({ _id: id });
  } catch (err) {
    console.log({err});
    throw new Error('Erorr al eliminar el usuario por id')
  }
};

module.exports.UpdateUsuario = async (id, usuario) => {
  try {
    return await usuarioModel.findByIdAndUpdate({ _id: id }, {
      name: usuario.name, lastname: usuario.lastname,email: usuario.email, password: usuario.password
    });
  } catch (err) {
    console.log({err});
    throw new Error('Erorr al actualizar la informacion del usuario')
  }
};