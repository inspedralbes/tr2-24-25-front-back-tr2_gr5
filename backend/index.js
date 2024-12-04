const express = require('express');
const fs = require('fs');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const port = 3211;

// Crear el servidor HTTP y Socket.IO
const server = http.createServer(app);
const io = new Server(server);

// Configuración de Socket.IO
io.on('connection', (socket) => {
    console.log('Un usuario se conectó');
    socket.on('mensaje', (data) => {
        console.log('Mensaje recibido:', data);
    });
});

// Middleware para procesar JSON
app.use(express.json());


// Función para leer los archivos JSON
const readJsonFile = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(data));
            }
        });
    });
};

// Ruta para obtener los mentores
app.get('/mentors', async (req, res) => {
    try {
        const mentors = await readJsonFile('./data/mentors.json');
        res.json(mentors);
    } catch (error) {
        res.status(500).send('Error al leer los mentores');
    }
});

// Ruta para obtener las incidencias
app.get('/incidencies', async (req, res) => {
    try {
        const incidencies = await readJsonFile('./data/incidencies.json');
        res.json(incidencies);
    } catch (error) {
        res.status(500).send('Error al leer las incidencias');
    }
});

// Ruta para obtener los alumnes
app.get('/alumnes', async (req, res) => {
    try {
        const alumnes = await readJsonFile('./data/alumnes.json');
        res.json(alumnes);
    } catch (error) {
        res.status(500).send('Error al leer los alumnes');
    }
});

// Iniciar el servidor
server.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
