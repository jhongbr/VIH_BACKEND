const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
require("dotenv").config();
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

//Rutas

const admin_routes = require('./src/routers/AdminRouter');
app.use('/api', admin_routes);

const user_routes = require('./src/routers/UsuariosRouter');
app.use('/api', user_routes);

const citas_routes = require('./src/routers/CitasRouter');
app.use('/api', citas_routes);

const medicos_routes = require('./src/routers/MedicosRouter');
app.use('/api', medicos_routes);

//Export
module.exports = app;