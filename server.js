// Requirements
const express = require("express");
const morgan = require("morgan");
const bodyParser = require('body-parser');

const apiRouter = require('./routes/api');

const config = require("./config/config");

// Initializations
const app = express();
require('./config/database');

// Settings
app.set("port", config.PORT); //Toma el puerto del SO sino lo estable a 33333

// Middlewares
app.use(bodyParser.json()); // Se asegura que la info que recibimos es json
app.use(bodyParser.urlencoded({ extended: true })); // Deja aceptar los datos que vienen de los formularios por URL
app.use(morgan("dev")); // Muestra informacion de las peticiones en la consola del servidor

// Global Variables

// Routes
app.use("/api", apiRouter);

// Start Server
app.listen(app.get("port"), () => {
    console.log("|--------------------");
    console.log(`| SERVER STATUS     : RUNNING`);  
    console.log(`| SERVER PORT       : ${app.get("port")}`);
});
