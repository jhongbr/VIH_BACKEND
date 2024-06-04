const swaggerAutogen = require("swagger-autogen");

const doc = {
    info: {
        title: 'My Aplicacion API',
        description: 'Descripcion que quieras ingresar'
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