const dotenv = require("dotenv");

console.log("---------------------");
console.log("| WORKING FOLDER    :", process.cwd()); // Mostrar la Carpeta de trabajo
console.log("| WORKING ENVIROMENT:", process.env.NODE_ENV); // Mostrar tipo de entorno de trabajo

// Leer el archivo de configuracion segun el
// entorno de trabajo establecido al ejecutar el server
dotenv.config({
  path: process.cwd() + "/" + process.env.NODE_ENV + ".env",
});

module.exports = {
  PORT: process.env.PORT || 8080,
  DB_TYPE: process.env.DB_TYPE || null,
  DB_HOST: process.env.DB_HOST || null,
  DB_NAME: process.env.DB_NAME || null,
  DB_USER: process.env.DB_USER || null,
  DB_PASSWORD: process.env.DB_PASSWORD || null,
};
