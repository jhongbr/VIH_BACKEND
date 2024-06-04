/*const chai = require("chai")
const sinon = require('sinon');
const { expect } = chai;
chai.use(require("chai-string"))

const usuariosController = require("../src/controllers/AdminController")
const usuariosRepository = require("../src/repository/AdminRepo")
const { mockRequest, mockResponse } = require('./mock/MockController')

const resService = {
    name: "test",
    lastname: "test",
    email: "test@test.com"
};

it('should save the preguntaController successfully', async () => {
        let req = mockRequest();
        req.body.name = "Prueba";
        req.body.lastname = "test";
        req.body.email = "test";
        const res = mockResponse();

        sinon.stub(usuariosRepository, 'createUserAdmin').resolves(resService);

        await usuariosController.RegistrarUsuario(req, res);
        expect(res.status.calledWith(201)).to.be.true;
        expect(res.send.calledOnce).to.be.true;
    });*/