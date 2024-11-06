const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
require("dotenv").config();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");
const { MONGODB_URI } = process.env;

const app = express();

//Datos codifcados en URL
app.use(bodyParser.urlencoded({ extended: true }));

//Analiza objeto Json
app.use(bodyParser.json());

const cors = require("cors");

//Antes de la ruta de status colocaremos
app.use(
  cors({
    origin: "*",
  })
);

//Conectamos a la base de datos
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Base de Datos Conectada");
  })
  .catch((err) => {
    console.log(err);
    throw err;
  });

//Para ir al localhost y revisar de que el servidor esta ok
app.get("/status", (req, res) => {
  res.status(200).send({
    success: "true",
    message: "Servidor Corriendo",
  });
});

// Agregaremos esto a lo ultimo
//Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//Rutas

const user_routes = require('./src/routers/UsuariosRouter');
app.use('/api', user_routes);

const citas_routes = require('./src/routers/MateriaRoute');
app.use('/api', citas_routes);


//Export
module.exports = app;