const swaggerAutogen = require("swagger-autogen");

const doc = {
    info: {
        title: 'My app',
        description: 'todos los metodos para los datos'
    },
    host: "localhost:3000",
    shemes: ['http']
};

const outputFile = './swagger-output.json'
const endpointsFile = ['./src/routers/AdminRouter.js', './src/routers/CitasRouter.js', './src/routers/MedicosRouter.js', './src/routers/UsuariosRouter.js']

swaggerAutogen(outputFile, endpointsFile, doc)
    .then(() => {
        require('./index.js');
    })