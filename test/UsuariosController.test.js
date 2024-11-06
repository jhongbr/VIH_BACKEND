/*const chai = require("chai")
const sinon = require('sinon');
const { expect } = chai;
chai.use(require("chai-string"))

const usuariosController = require("../src/controllers/UsuariosController")
const usuariosRepository = require("../src/repository/UsuariosRepo")
const { mockRequest, mockResponse } = require('./mock/MockController')

const resService = {
    name: "test",
    lastname: "test",
    username: "testname",
    email: "test@test.com",
    password: "test562",
    telephone: "123",
    fechaNacimiento: "12/15/2002",
    dni: "12345678",
    genero: "Masculino"
};

it('should save the usuarioController successfully', async () => {
    let req = mockRequest();
    req.body.name = "test";
    req.body.lastname = "test";
    req.body.username = "testname";
    req.body.email = "test@test.com";
    req.body.password = "test562";
    req.body.telephone = "123";
    req.body.fechaNacimiento = "12/15/2002";
    req.body.dni = "12345678";
    req.body.genero = "Masculino";
    const res = mockResponse();

    sinon.stub(usuariosRepository, 'createUsuario').resolves(resService);

    await usuariosController.RegistrarUsuario(req, res);
    expect(res.status.calledWith(201)).to.be.true;
    expect(res.send.calledOnce).to.be.true;
});

it*/