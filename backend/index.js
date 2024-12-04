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

// Función para guardar los datos en el archivo JSON
const writeJsonFile = (filePath, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8', (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

// Rutas del CRUD para mentores

// Obtener todos los mentores (GET)
app.get('/mentors', async (req, res) => {
    try {
        const mentors = await readJsonFile('./backend/mentors.json');
        res.json(mentors);
    } catch (error) {
        res.status(500).send('Error al leer los mentores');
    }
});

// Crear un nuevo mentor (POST)
app.post('/mentors', async (req, res) => {
    try {
        const newMentor = req.body; // Los datos vienen en el cuerpo de la solicitud
        const mentors = await readJsonFile('./backend/mentors.json');
        mentors.push(newMentor); // Agregar el nuevo mentor al array
        await writeJsonFile('./backend/mentors.json', mentors); // Guardar los cambios en el archivo
        res.status(201).json(newMentor); // Retornar el mentor creado
    } catch (error) {
        res.status(500).send('Error al agregar el mentor');
    }
});

// Actualizar un mentor (PUT)
app.put('/mentors/:id', async (req, res) => {
    try {
        const mentorId = parseInt(req.params.id); // Obtener el ID desde la URL
        const updatedMentor = req.body; // Obtener los nuevos datos del mentor desde el cuerpo
        const mentors = await readJsonFile('./backend/mentors.json');
        
        const index = mentors.findIndex((mentor) => mentor.ID === mentorId); // Buscar el mentor por ID
        if (index !== -1) {
            mentors[index] = { ...mentors[index], ...updatedMentor }; // Actualizar el mentor
            await writeJsonFile('./backend/mentors.json', mentors); // Guardar los cambios
            res.json(mentors[index]); // Retornar el mentor actualizado
        } else {
            res.status(404).send('Mentor no encontrado');
        }
    } catch (error) {
        res.status(500).send('Error al actualizar el mentor');
    }
});

// Eliminar un mentor (DELETE)
app.delete('/mentors/:id', async (req, res) => {
    try {
        const mentorId = parseInt(req.params.id); // Obtener el ID desde la URL
        const mentors = await readJsonFile('./backend/mentors.json');
        
        const index = mentors.findIndex((mentor) => mentor.ID === mentorId); // Buscar el mentor por ID
        if (index !== -1) {
            const deletedMentor = mentors.splice(index, 1); // Eliminar el mentor
            await writeJsonFile('./backend/mentors.json', mentors); // Guardar los cambios
            res.json(deletedMentor); // Retornar el mentor eliminado
        } else {
            res.status(404).send('Mentor no encontrado');
        }
    } catch (error) {
        res.status(500).send('Error al eliminar el mentor');
    }
});

// Rutas para incidencias y alumnes (puedes hacer lo mismo para ellos)
app.get('/incidencies', async (req, res) => {
    try {
        const incidencies = await readJsonFile('./backend/incidencies.json');
        res.json(incidencies);
    } catch (error) {
        res.status(500).send('Error al leer las incidencias');
    }
});

// Iniciar el servidor
server.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
 

//prueba 