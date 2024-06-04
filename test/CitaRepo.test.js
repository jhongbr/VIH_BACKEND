const chai = require("chai")
const sinon = require('sinon');
const { expect } = chai;
chai.use(require("chai-string"))

const citasRespository = require('../src/repository/CitasRepo');
const CitaModel = require('../src/models/CitasModel');

//Empezamos los test
describe('Test de la clase de citas ', () => {
    //this.timeout(8000);

    let UserSaveMock;
    let UserFindStub;
    let UserFindByIdAndDeleteStub;

    beforeEach(() => {
        UserSaveMock = sinon.mock(new CitaModel({
            name: 'test',
            hora: '12:00',
            fecha: '12/15/2002',
            paciente: 'test',
            medico: 'test',
            estado: 'pendiente',
            motivo: 'test',
            observaciones: 'test'
        }));

        UserFindStub = sinon.stub(CitaModel, 'find');

    });

    afterEach(() => {
        sinon.restore();
    })

    it('Debe retornar el usuario creado', async () => {
        UserSaveMock.expects('save').resolves(UserSaveMock.object);

        const result = await citasRespository.createCitas(UserSaveMock.object);
        console.log(result);
        expect(result).to.equal(UserSaveMock.object);
        UserSaveMock.verify();
    });

    it('Deberia guardarse en la prueba fallida', async () => {
        UserSaveMock.expects('save').rejects('Erorr al crear la cita');

        try {
            await citasRespository.createCitas(UserSaveMock.object);
        } catch (err) {
            expect(err.message).to.equal('Erorr al crear la cita');
        }

        UserSaveMock.verify();
    });

    it('Deberia retornar todos los usuarios', async () => {
        const userList = [UserSaveMock.object];
        UserFindStub.resolves(userList);

        const result = await citasRespository.ListCitas();
        console.log(result);
        expect(result).to.be.an('array');
        expect(result.length).to.equal(1);
        expect(result[0].name).to.equal('test');
        expect(result[0].hora).to.equal('12:00');
        expect(result[0].fecha).to.equal('12/15/2002');
        expect(result[0].paciente).to.equal('test');
        expect(result[0].medico).to.equal('test');
        expect(result[0].estado).to.equal('pendiente');
        expect(result[0].motivo).to.equal('test');
        expect(result[0].observaciones).to.equal('test');
    });

    it('Deberia retornar un error al no poder listar los usuarios', async () => {
        UserFindStub.rejects('Error al listar las citas');
        try {
            await citasRespository.ListCitas();
        } catch (err) {
            expect(err.message).to.equal('Error al listar las citas');
        }
        UserSaveMock.verify();
    });

    it('Deberia retornar el usuario por dni', async () => {

        sinon.stub(CitaModel, 'findOne')
            .withArgs({ dni: '12345678' })
            .resolves(UserSaveMock.object);


        const result = await citasRespository.FindByIdCitas('12345678');
        expect(result).to.deep.equal(UserSaveMock.object);

        sinon.restore();
        ;
    });

    it('Deberia retornar un error al no poder buscar el usuario por dni', async () => {
        const mockDni = '12345678';

        // Stub del método findOne para que lance un error
        sinon.stub(CitaModel, 'findOne')
            .withArgs({ where: { dni: mockDni, status: true } })
            .rejects(new Error('Database error'));

        try {
            await citasRespository.FindByIdCitas(mockDni);
            throw new Error('Error al buscar la cita por id');
        } catch (err) {
            // Verifica que el error lanzado es el esperado
            expect(err.message).to.equal('Error al buscar la cita por id');
        }
    });

    it('Deberia eliminar el usuario por id', async () => {
        const mockId = '60d0fe4f5311236168a109ca';
        const mockResponse = { acknowledged: true, deletedCount: 1 };

        sinon.stub(CitaModel, 'findByIdAndDelete')
            .withArgs({ _id: mockId })
            .resolves(mockResponse);

        const result = await citasRespository.DeleteByIdCitas(mockId);

        expect(result).to.deep.equal(mockResponse);
    });

    it('Deberia retornar un error al no poder eliminar el usuario por id', async () => {
        const mockId = '60d0fe4f5311236168a109ca';
        // Stub del método findByIdAndDelete para que lance un error
        sinon.stub(CitaModel, 'findByIdAndDelete')
            .withArgs({ _id: mockId })
            .rejects(new Error('Database error'));

        try {
            await citasRespository.DeleteByIdCitas(mockId);
            throw new Error('Error al eliminar la cita por id');
        } catch (err) {
            // Verifica que el error lanzado es el esperado
            expect(err.message).to.equal('Error al eliminar la cita por id');
        }
    });

    it('Debería actualizar la cita correctamente', async () => {
        const mockId = '60d0fe4f5311236168a109ca';
        const cita = {
          id: mockId,
          name: 'Consulta Médica',
          hora: '10:00 AM',
          fecha: '2024-06-01',
          paciente: 'Juan Pérez',
          medico: 'Dr. Smith',
          estado: 'Confirmado'
        };
    
        const mockResponse = { 
          _id: mockId,
          ...cita 
        };
    
        // Stub del método findByIdAndUpdate
        sinon.stub(CitaModel, 'findByIdAndUpdate')
          .withArgs({ _id: cita.id }, {
            name: cita.name,
            hora: cita.hora,
            fecha: cita.fecha,
            paciente: cita.paciente,
            medico: cita.medico,
            estado: cita.estado
          })
          .resolves(mockResponse);
    
        const result = await citasRespository.UpdateCitas(mockId, cita);
        
        expect(result).to.deep.equal(mockResponse);
      });
})
