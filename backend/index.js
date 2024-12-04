const express = require('express');
const app = express();
const port = 3000;

const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('Un usuario se conectó');
    socket.on('mensaje', (data) => {
        console.log('Mensaje recibido:', data);
    });
});

server.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

// JSON
app.use(express.json());

app.get('/', (req, res) => {
    res.send('¡Hola, mundo desde Node.js!');
});


app.get('/api/saludo', (req, res) => {
    res.json({ mensaje: '¡Hola desde la API!' });
});



// servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
