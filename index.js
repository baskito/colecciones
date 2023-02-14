require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config'); 

// Crear el servidor de express
const app = express();

// Configurar CORS
app.use(cors());

// Carpeta pública
app.use( express.static('public') );

// Lectura y parseo del body
app.use( express.json() );

// Base de datos
dbConnection();

// Rutas
app.use( '/api/usuarios', require('./routes/usuario') );
app.use( '/api/login', require('./routes/auth') );
app.use( '/api/consoles', require('./routes/console') );
app.use( '/api/accesorios', require('./routes/accesorio') );
app.use( '/api/collections', require('./routes/collection') );
app.use( '/api/search', require('./routes/search') );
app.use( '/api/upload', require('./routes/upload') );

app.listen( process.env.PORT, () => {
  console.log('Servidor corriendo en puerto ' + process.env.PORT );
})
