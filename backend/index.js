const mysql = require('mysql2/promise');
const fs = require('fs');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Server } = require('socket.io');
const { createServer } = require('http');
const path = require('path');
const app = express();
const createDB = require(path.join(__dirname, 'configDB.js'));
const port = process.env.PORT;

(async () => {
    await createDB();
})();


const dataConnection = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true
  };

  async function connectDB() {
    try {
      const connection = await mysql.createConnection(dataConnection);
      console.log('Conexión a la base de datos exitosa.');
      return connection;
    } catch (error) {
      console.error('Error connecting to the database: ', error);
    }
  }

// -------------------- CREACION SERVER --------------------
app.use(cors());
app.use(express.json());
const server = createServer(app);

//----------------- CRUD PETICION ---------------------------
app.get('/peticion', async (req, res) => {
let connection;
try {
  connection = await connectDB();
  const [rows] = await connection.query('SELECT * FROM peticio')
  console.log("Peticions: ", rows);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching peticions:', error);
    res.status(500).send('Error fetching peticions.');
  } finally {
    connection.end();
    console.log("Connection closed.");
  }
});

app.post('/peticion', async (req, res) => {
  const { id_usuari, id_categoria, nom_peticio, descripcio } = req.body;
  if (!id_usuari || !id_categoria|| !nom_peticio|| !descripcio) {
    return res.status(400).send('Datos incompletos.');
  }

  let connection;

  try {
    connection = await connectDB();
    const [rows] = await connection.query('INSERT INTO peticio (id_usuari, id_categoria, nom_peticio, descripcio) VALUES (?, ?, ?, ?)', [id_usuari, id_categoria, nom_peticio, descripcio]);
  
    console.log("Peticion: ", rows);

    if (rows.length == 0) {
      return res.status(404).send('Usuario no encontrado.');
    }

    res.status(201).json(rows[0]);
  } catch (error) {
    console.error('Error fetching peticions:', error);
    res.status(500).send('Error fetching peticions.');
  } finally {
    connection.end();
    console.log("Connection closed.");
  }
});

app.put('/peticion/:id', async (req, res) => {

});

app.delete('/peticion/:id', async (req, res) => {

});

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});