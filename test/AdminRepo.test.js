const chai = require("chai")
const sinon = require('sinon');
const { expect } = chai;
chai.use(require("chai-string"))

const adminRespository = require('../src/repository/AdminRepo');
const AdminModel = require('../src/models/AdminModel');

//Empezamos los test
describe('Test de la clase de administrador ', () => {
    //this.timeout(8000);

    let UserSaveMock;
    let UserFindStub;
    let UserFindByIdAndDeleteStub;

    beforeEach(() => {
        UserSaveMock = sinon.mock(new AdminModel({
            name: 'test',
            lastname: 'test1',
            email: 'test@test.com',
            password: 'test562',
            veriPassword: 'test562',
            tipoUsuario: 'admin', 
        }));

        UserFindStub = sinon.stub(AdminModel, 'find');

    });

    afterEach(() => {
        sinon.restore();
    })

    it('Debe retornar el usuario creado', async () => {
        UserSaveMock.expects('save').resolves(UserSaveMock.object);

        const result = await adminRespository.createUserAdmin(UserSaveMock.object);
        console.log(result);
        expect(result).to.equal(UserSaveMock.object);
        UserSaveMock.verify();
    });

    it('Deberia guardarse en la prueba fallida', async () => {
        UserSaveMock.expects('save').rejects('Erorr al crear el usuario administrador');

        try {
            await adminRespository.createUserAdmin(UserSaveMock.object);
        } catch (err) {
            expect(err.message).to.equal('Erorr al crear el usuario administrador');
        }

        UserSaveMock.verify();
    });

    it('Deberia retornar todos los usuarios', async () => {
        const userList = [UserSaveMock.object];
        UserFindStub.resolves(userList);

        const result = await adminRespository.ListAdmin();
        console.log(result);
        expect(result).to.be.an('array');
        expect(result.length).to.equal(1);
        expect(result[0].name).to.equal('test');
        expect(result[0].lastname).to.equal('test1');
        expect(result[0].email).to.equal('test@test.com');
        expect(result[0].password).to.equal('test562');
        expect(result[0].veriPassword).to.equal('test562');
        expect(result[0].tipoUsuario).to.equal('admin');
    });

    it('Deberia retornar un error al no poder listar los usuarios', async () => {
        UserFindStub.rejects('Erorr al listar los administradores');
        try {
            await adminRespository.ListAdmin();
        } catch (err) {
            expect(err.message).to.equal('Erorr al listar los administradores');
        }
        UserSaveMock.verify();
    });

    it('Deberia retornar el usuario por dni', async () => {

        sinon.stub(AdminModel, 'findOne')
            .withArgs({  })
            .resolves(UserSaveMock.object);


        const result = await adminRespository.FindByIdAdmin('12345678');
        expect(result).to.deep.equal(UserSaveMock.object);

        sinon.restore();
        ;
    });

    it('Deberia retornar un error al no poder buscar el usuario por dni', async () => {
        const mockDni = '12345678';

        // Stub del método findOne para que lance un error
        sinon.stub(AdminModel, 'findOne')
            .withArgs({ where: { dni: mockDni, status: true } })
            .rejects(new Error('Database error'));

        try {
            await adminRespository.FindByIdAdmin(mockDni);
            throw new Error('Erorr al buscar el administrador');
        } catch (err) {
            // Verifica que el error lanzado es el esperado
            expect(err.message).to.equal('Erorr al buscar el administrador');
        }
    });

    it('Deberia eliminar el usuario por id', async () => {
        const mockId = '60d0fe4f5311236168a109ca';
        const mockResponse = { acknowledged: true, deletedCount: 1 };

        sinon.stub(AdminModel, 'findByIdAndDelete')
            .withArgs({ _id: mockId })
            .resolves(mockResponse);

        const result = await adminRespository.DeleteByIdAdmin(mockId);

        expect(result).to.deep.equal(mockResponse);
    });

    it('Deberia retornar un error al no poder eliminar el usuario por id', async () => {
        const mockId = '60d0fe4f5311236168a109ca';
        // Stub del método findByIdAndDelete para que lance un error
        sinon.stub(AdminModel, 'findByIdAndDelete')
            .withArgs({ _id: mockId })
            .rejects(new Error('Database error'));

        try {
            await adminRespository.DeleteByIdAdmin(mockId);
            throw new Error('Error al eliminar el administrador por id');
        } catch (err) {
            // Verifica que el error lanzado es el esperado
            expect(err.message).to.equal('Error al eliminar el administrador por id');
        }
    });
})
