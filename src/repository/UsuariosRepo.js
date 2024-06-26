const usuarioModel = require("../models/UsuariosModel");
const bcrypt = require('bcrypt');

//Metodos para los usuarios
module.exports.createUsuario = async (usuario) => {
  try {
    return await usuario.save();
  } catch (err) {
    console.log({err});
    if(err.code == 11000) {
      throw new Error('El usuario ya existe');
    }else{
      throw new Error('Error al crear el usuario');
    }
  }
};

module.exports.login = async (email, password) => {
  try {
    const user = await usuarioModel.findOne({ email: email });
    if (!user) {
      throw new Error('El usuario no existe');
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error('Contraseña incorrecta');
    }
    return user
  } catch (error) {
    throw new Error('Error al iniciar sesion');
  }
}

module.exports.ListUsuario = async () => {
  try {
    return await usuarioModel.find();
  } catch (err) {
    throw new Error('Error al listar los usuarios')
  }
};

module.exports.FindByDniUsuario = async (dni) => {
  try {
    return await usuarioModel.findOne({ dni: dni });
  } catch (err) {
    throw new Error('Error al buscar el usuario por dni')
  }
};

module.exports.DeleteByIdUsuario = async (id) => {
  try {
    return await usuarioModel.findByIdAndDelete({ _id: id });
  } catch (err) {
    console.log({err});
    throw new Error('Error al eliminar el usuario por id')
  }
};

module.exports.UpdateUsuario = async (id, usuario) => {
  try {
    return await usuarioModel.findByIdAndUpdate({ id : id }, {
      name: usuario.name, lastname: usuario.lastname,email: usuario.email, password: usuario.password
    });
  } catch (err) {
    console.log({err});
    throw new Error('Erorr al actualizar la informacion del usuario')
  }
};