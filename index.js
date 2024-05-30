const http = require("http");
const app = require("./app");
require("dotenv").config();

const server = http.createServer(app);

//Iniciar el servidor
server.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en el puerto: ${process.env.PORT}`);
});
