const express = require('express');
require('dotenv').config();
const cors = require('cors');
const {dbConnection} = require('./database/config');

//Crear el servidor de express
const app = express();

//Base de datos
dbConnection()

//CORS
app.use(cors())

//Directorio publico
app.use( express.static('public') );

//Lectura y parseo del body
app.use(express.json());

//Rutas
//Habilitamos la ruta donde se encontrara el EP
//TODO: auth, crear, login, renew
app.use( '/api/auth',require('./routes/auth') );
app.use( '/api/events',require('./routes/events') );

app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${ 4000 }`)
});

