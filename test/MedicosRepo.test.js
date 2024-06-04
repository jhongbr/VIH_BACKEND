const chai = require("chai")
const sinon = require('sinon');
const { expect } = chai;
chai.use(require("chai-string"))

const medicoRespository = require('../src/repository/MedicosRepo');
const MedicoModel = require('../src/models/MedicosModel');

//Empezamos los test
describe('Test de la clase de medicos ', () => {
    //this.timeout(8000);

    let UserSaveMock;
    let UserFindStub;
    let UserFindByIdAndDeleteStub;

    beforeEach(() => {
        UserSaveMock = sinon.mock(new MedicoModel({
            name: 'test',
            especialidad: 'test1',
            dni: '12345678',
            email: 'test@test.com',
            password: 'test562',
        }));

        UserFindStub = sinon.stub(MedicoModel, 'find');

    });

    afterEach(() => {
        sinon.restore();
    })

    it('Debe retornar el usuario creado', async () => {
        UserSaveMock.expects('save').resolves(UserSaveMock.object);

        const result = await medicoRespository.createMedicos(UserSaveMock.object);
        console.log(result);
        expect(result).to.equal(UserSaveMock.object);
        UserSaveMock.verify();
    });

    it('Deberia guardarse en la prueba fallida', async () => {
        UserSaveMock.expects('save').rejects('Erorr al crear el medico');

        try {
            await medicoRespository.createMedicos(UserSaveMock.object);
        } catch (err) {
            expect(err.message).to.equal('Erorr al crear el medico');
        }
        UserSaveMock.verify();
    });

    it('Deberia retornar todos los usuarios', async () => {
        const userList = [UserSaveMock.object];
        UserFindStub.resolves(userList);

        const result = await medicoRespository.ListMedicos();
        console.log(result);
        expect(result).to.be.an('array');
        expect(result.length).to.equal(1);
        expect(result[0].name).to.equal('test');
        expect(result[0].especialidad).to.equal('test1');
        expect(result[0].dni).to.equal('12345678');
        expect(result[0].email).to.equal('test@test.com');
        expect(result[0].password).to.equal('test562');
    });

    it('Deberia retornar un error al no poder listar los usuarios', async () => {
        UserFindStub.rejects('Erorr al listar los medico');
        try {
            await medicoRespository.ListMedicos();
        } catch (err) {
            expect(err.message).to.equal('Erorr al listar los medico');
        }
        UserSaveMock.verify();
    });

    it('Deberia retornar el usuario por dni', async () => {

        sinon.stub(MedicoModel, 'findOne')
            .withArgs({ dni: '12345678' })
            .resolves(UserSaveMock.object);


        const result = await medicoRespository.FindByIdMedicos('12345678');
        expect(result).to.deep.equal(UserSaveMock.object);

        sinon.restore();
        ;
    });

    it('Deberia retornar un error al no poder buscar el usuario por dni', async () => {
        const mockDni = '12345678';

        // Stub del método findOne para que lance un error
        sinon.stub(MedicoModel, 'findOne')
            .withArgs({ where: { dni: mockDni, status: true } })
            .rejects(new Error('Database error'));

        try {
            await medicoRespository.FindByIdMedicos(mockDni);
            throw new Error('Erorr al buscar el medico por dni');
        } catch (err) {
            // Verifica que el error lanzado es el esperado
            expect(err.message).to.equal('Erorr al buscar el medico por dni');
        }
    });

    it('Deberia eliminar el usuario por id', async () => {
        const mockId = '60d0fe4f5311236168a109ca';
        const mockResponse = { acknowledged: true, deletedCount: 1 };

        sinon.stub(MedicoModel, 'findByIdAndDelete')
            .withArgs({ _id: mockId })
            .resolves(mockResponse);

        const result = await medicoRespository.DeleteByIdMedicos(mockId);

        expect(result).to.deep.equal(mockResponse);
    });

    it('Deberia retornar un error al no poder eliminar el usuario por id', async () => {
        const mockId = '60d0fe4f5311236168a109ca';
        // Stub del método findByIdAndDelete para que lance un error
        sinon.stub(MedicoModel, 'findByIdAndDelete')
            .withArgs({ _id: mockId })
            .rejects(new Error('Database error'));

        try {
            await medicoRespository.DeleteByIdMedicos(mockId);
            throw new Error('Error al eliminar el medico por id');
        } catch (err) {
            // Verifica que el error lanzado es el esperado
            expect(err.message).to.equal('Error al eliminar el medico por id');
        }
    });
})
