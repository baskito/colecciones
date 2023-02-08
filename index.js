const express = require('express');
require('dotenv').config();

const { dbConnection } = require('./database/config'); 
// mean_user_colec
// IninCqUTUn7401iF

// Crear el servidor de express
const app = express();
// Base de datos
dbConnection();
console.log(process.env.PORT);
app.get('/', (req, res) => {

  res.json({
    ok: true,
    msg: 'Hola mundo'
  });
});

app.listen( process.env.PORT, () => {
  console.log('Servidor corriendo en puerto ' + process.env.PORT );
})
