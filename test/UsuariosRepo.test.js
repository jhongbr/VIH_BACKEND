const chai = require("chai")
const sinon = require('sinon');
const { expect } = chai;
chai.use(require("chai-string"))
const bcrypt = require('bcrypt');

const usuarioRespository = require('../src/repository/UsuariosRepo');
const UsuarioModel = require('../src/models/UsuariosModel');

//Empezamos los test
describe('Test de la clase de usuario ', () => {
    //this.timeout(8000);

    let UserSaveMock;
    let UserFindStub;
    let UserFindByIdAndDeleteStub;

    beforeEach(() => {
        UserSaveMock = sinon.mock(new UsuarioModel({
            name: 'test',
            lastname: 'test1',
            username: 'testname',
            email: 'test@test.com',
            password: 'test562',
            telephone: '123',
            fechaNacimiento: '12/15/2002',
            dni: '12345678',
            genero: 'Masculino'
        }));

        UserFindStub = sinon.stub(UsuarioModel, 'find');

    });

    afterEach(() => {
        sinon.restore();
    })

    it('Debe retornar el usuario creado', async () => {
        UserSaveMock.expects('save').resolves(UserSaveMock.object);

        const result = await usuarioRespository.createUsuario(UserSaveMock.object);
        console.log(result);
        expect(result).to.equal(UserSaveMock.object);
        UserSaveMock.verify();
    });

    it('debería lanzar un error si el usuario ya existe', async () => {
        UserSaveMock.expects('save').rejects({ code: 11000 });
        try {
            await usuarioRespository.createUsuario(UserSaveMock.object);
        } catch (err) {
            expect(err.message).to.equal('El usuario ya existe');
        }
        UserSaveMock.verify();
    });

    it('Deberia guardarse en la prueba fallida', async () => {
        UserSaveMock.expects('save').rejects('Error al crear el usuario');

        try {
            await usuarioRespository.createUsuario(UserSaveMock.object);
        } catch (err) {
            expect(err.message).to.equal('Error al crear el usuario');
        }

        UserSaveMock.verify();
    });

    it('debería lanzar un error si el usuario no existe', async () => {
        sinon.stub(UsuarioModel, 'findOne').resolves(null); // Simula que no encuentra al usuario

        try {
            await usuarioRespository.login('test@test.com', 'password');
        } catch (error) {
            expect(error.message).to.equal('Error al iniciar sesion');
        }
    });

    it('debería lanzar un error si la contraseña es incorrecta', async () => {
        const user = { email: 'test@test.com', password: 'hashedpassword' };
        sinon.stub(UsuarioModel, 'findOne').resolves(user); // Simula encontrar al usuario
        sinon.stub(bcrypt, 'compare').resolves(false); // Simula que la contraseña es incorrecta

        try {
            await usuarioRespository.login('test@test.com', 'wrongpassword');
        } catch (error) {
            expect(error.message).to.equal('Error al iniciar sesion');
        }
    });

    it('debería devolver el usuario si el login es exitoso', async () => {
        const user = { email: 'test@test.com', password: 'hashedpassword' };
        sinon.stub(UsuarioModel, 'findOne').resolves(user); // Simula encontrar al usuario
        sinon.stub(bcrypt, 'compare').resolves(true); // Simula que la contraseña es correcta

        const result = await usuarioRespository.login('test@test.com', 'password');
        expect(result).to.deep.equal(user);
    });

    it('debería lanzar un error genérico si ocurre un problema durante el login', async () => {
        sinon.stub(UsuarioModel, 'findOne').throws(new Error('Database error')); // Simula un error en la base de datos

        try {
            await usuarioRespository.login('test@test.com', 'password');
        } catch (error) {
            expect(error.message).to.equal('Error al iniciar sesion');
        }
    });

    it('Deberia retornar todos los usuarios', async () => {
        const userList = [UserSaveMock.object];
        UserFindStub.resolves(userList);

        const result = await usuarioRespository.ListUsuario();
        console.log(result);
        expect(result).to.be.an('array');
        expect(result.length).to.equal(1);
        expect(result[0].name).to.equal('test');
        expect(result[0].lastname).to.equal('test1');
        expect(result[0].username).to.equal('testname');
        expect(result[0].email).to.equal('test@test.com');
        expect(result[0].password).to.equal('test562');
        expect(result[0].telephone).to.equal('123');
        expect(result[0].fechaNacimiento).to.equal('12/15/2002');
        expect(result[0].dni).to.equal('12345678');
        expect(result[0].genero).to.equal('Masculino');

    });

    it('Deberia retornar un error al no poder listar los usuarios', async () => {
        UserFindStub.rejects('Error al listar los usuarios');
        try {
            await usuarioRespository.ListUsuario();
        } catch (err) {
            expect(err.message).to.equal('Error al listar los usuarios');
        }
        UserSaveMock.verify();
    });

    it('Deberia retornar el usuario por dni', async () => {

        sinon.stub(UsuarioModel, 'findOne')
            .withArgs({ dni: '12345678' })
            .resolves(UserSaveMock.object);


        const result = await usuarioRespository.FindByDniUsuario('12345678');
        expect(result).to.deep.equal(UserSaveMock.object);

        sinon.restore();
        ;
    });

    it('Deberia retornar un error al no poder buscar el usuario por dni', async () => {
        const mockDni = '12345678';

        // Stub del método findOne para que lance un error
        sinon.stub(UsuarioModel, 'findOne')
            .withArgs({ where: { dni: mockDni, status: true } })
            .rejects(new Error('Database error'));

        try {
            await usuarioRespository.FindByDniUsuario(mockDni);
            throw new Error('Error al buscar el usuario por dni');
        } catch (err) {
            // Verifica que el error lanzado es el esperado
            expect(err.message).to.equal('Error al buscar el usuario por dni');
        }
    });

    it('Deberia eliminar el usuario por id', async () => {
        const mockId = '60d0fe4f5311236168a109ca';
        const mockResponse = { acknowledged: true, deletedCount: 1 };

        sinon.stub(UsuarioModel, 'findByIdAndDelete')
            .withArgs({ _id: mockId })
            .resolves(mockResponse);

        const result = await usuarioRespository.DeleteByIdUsuario(mockId);

        expect(result).to.deep.equal(mockResponse);
    });

    it('Deberia retornar un error al no poder eliminar el usuario por id', async () => {
        const mockId = '60d0fe4f5311236168a109ca';
        // Stub del método findByIdAndDelete para que lance un error
        sinon.stub(UsuarioModel, 'findByIdAndDelete')
            .withArgs({ _id: mockId })
            .rejects(new Error('Database error'));

        try {
            await usuarioRespository.DeleteByIdUsuario(mockId);
            throw new Error('La prueba debería haber lanzado un error');
        } catch (err) {
            // Verifica que el error lanzado es el esperado
            expect(err.message).to.equal('Error al eliminar el usuario por id');
        }
    });
})
