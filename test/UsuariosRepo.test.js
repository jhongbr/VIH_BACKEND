const chai = require("chai")
const sinon = require('sinon');
const { expect } = chai;
chai.use(require("chai-string"))

const usuarioRespository = require('../src/repository/UsuariosRepo');