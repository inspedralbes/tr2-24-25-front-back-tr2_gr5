const mysql = require('mysql2/promise');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const { Server } = require('socket.io');
const { createServer } = require('http');
const path = require('path');
const nodemailer = require('nodemailer');
require('dotenv').config({ path: path.join(__dirname, 'environment', '.env') }); // Carga .env desde 'environment'
const app = express();
const createDB = require(path.join(__dirname, 'configDB.js'));
const port = process.env.PORT;
const bcrypt = require('bcrypt');


var users = [];
var peticions = [];

(async () => {
  await createDB();
})();

// Creación de la conexión a la base de datos
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

// Crear servidor HTTP
const server = createServer(app);

// Crear instancia de Socket.io
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ["Access-Control-Allow-Origin"],
  }
});

// Conexión WebSocket
io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');
  
  // Aquí puedes agregar otros eventos como 'disconnect' si lo necesitas
  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});


async function sendPeticions() {
  let connection;
  try {
    connection = await connectDB();
    const [rows] = await connection.query('SELECT * FROM peticio');
    console.log("Peticions obtenidas:", rows);

    // Emitir las peticiones a través del socket
    peticions = rows;
    console.log("Peticiones enviadas a través de socket");
  } catch (error) {
    console.error('Error al obtener y enviar peticions:', error);
  } finally {
      io.emit('peticions', peticions);
      connection.end();
      console.log("Conexión a la base de datos cerrada.");
    }
  }


// Función para obtener datos de 'usuaris' y emitirlos
async function sendUsuaris() {
  let connection;
  try {
    connection = await connectDB();
    const [rows] = await connection.query('SELECT * FROM usuaris');
    console.log("Usuaris obtenidos:", rows);
    users = rows;
    // Emitir los usuarios a través del socket
    console.log("Usuarios enviados a través de socket");
  } catch (error) {
    console.error('Error al obtener y enviar usuaris:', error);
  } finally {
      io.emit('usuaris', users);
      console.log("Usuaris obtenidos:", users);
      connection.end();
      console.log("Conexión a la base de datos cerrada.");
    }
  }


// -------------------- CRUD PETICION --------------------
app.get('/peticion', async (req, res) => {
  let connection;
  try {
    connection = await connectDB();
    const [rows] = await connection.query('SELECT * FROM peticio');
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


app.get('/peticionActivada', async (req, res) => {
  let connection;
  try {
    connection = await connectDB();
    // Consulta solo las peticiones activadas
    const [rows] = await connection.query('SELECT * FROM peticio WHERE activado = true');
    console.log("Peticiones activadas: ", rows);
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener las peticiones activadas:', error);
    res.status(500).send('Error al obtener las peticiones activadas.');
  } finally {
    if (connection) {
      connection.end();
      console.log("Conexión cerrada.");
    }
  }
});


app.get('/peticion/:id', async (req, res) => {
  const { id } = req.params; // Extraer el ID de los parámetros de la URL
  let connection;

  try {
    connection = await connectDB();
    // Consulta para obtener la petición por su ID
    const [rows] = await connection.query('SELECT * FROM peticio WHERE id_peticio = ?', [id]);
    
    if (rows.length === 0) {
      // Si no se encuentra ninguna petición con el ID proporcionado
      return res.status(404).send(`No se encontró ninguna petición con el ID: ${id}`);
    }

    console.log("Petición encontrada: ", rows[0]);
    res.json(rows[0]); // Enviar la primera coincidencia como respuesta
  } catch (error) {
    console.error('Error al obtener la petición:', error);
    res.status(500).send('Error al obtener la petición.');
  } finally {
    if (connection) {
      connection.end();
      console.log("Conexión cerrada.");
    }
  }
});





app.post('/peticion', async (req, res) => {
  const { id_usuari, id_categoria, nom_peticio, descripcio } = req.body;
  if (!id_usuari || !id_categoria || !nom_peticio || !descripcio) {
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

    // Emitir evento WebSocket para informar a los clientes conectados
    io.emit('nueva-peticion', rows[0]);
    sendPeticions()

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
  const { id } = req.params;
  const cleanedId = id.replace(/[^0-9]/g, '');
  const petitionId = parseInt(cleanedId, 10); // Convertir a entero
  const { id_usuari, id_categoria, nom_peticio, descripcio} = req.body;
  let connection;

  if (id_usuari == undefined || id_categoria == undefined || nom_peticio == undefined || descripcio == undefined) {
    return res.status(400).send('Datos incompletos.');
  }

  try {
    connection = await connectDB();

    const [result] = await connection.query(
      'UPDATE peticio SET id_usuari = ?, id_categoria = ?, nom_peticio = ?, descripcio = ? WHERE id_peticio = ?',
      [id_usuari, id_categoria, nom_peticio, descripcio, petitionId]
    );

    if (result.affectedRows > 0) {
      // Emitir evento WebSocket
      io.emit('actualizar-peticion', { id_peticio: petitionId, message: 'Peticion actualizada' });

      let message = {
        message: `Peticion con ID ${petitionId} actualizado con éxito.`
      };
      res.status(200).send(JSON.stringify(message));
    } else {
      res.status(404).send('Peticion no encontrada.');
    }
  } catch (error) {
    console.error('Error al actualizar la Peticion:', error);
    res.status(500).send('Error al actualizar la Peticion.');
  } finally {
    if (connection) connection.end();
    console.log("Connection closed.");
  }
});

app.delete('/peticion/:id', async (req, res) => {
  const {id} = req.params;
  const cleanedID = id.replace(/[^0-9]/g, '');
  const petitionId = parseInt(cleanedID, 10);
  let connection;

  try {
    connection = await connectDB();
    const [rows] = await connection.query('DELETE FROM peticio WHERE id_peticio = ?', [petitionId]);

    if (rows.affectedRows > 0) {
      // Emitir evento WebSocket
      io.emit('eliminar-peticion', { id_peticio: petitionId, message: 'Peticion eliminada' });

      const message = { message: `Peticion con ID ${petitionId} eliminado con éxito.` };
      res.status(200).send(JSON.stringify(message));
    } else {
      res.status(404).send('Peticion no encontrada.');
    }
  } catch (error) {
    res.status(500).send('Error al eliminar la peticion.');
  } finally {
    connection.end();
  }
});
//------------------------------------------------------------


// ---------------------------- CRUD Resposta ----------------------------------------------------

app.get('/resposta', async (req, res) => {
let connection;

try {
  connection = await connectDB();
  const [rows] = await connection.query('SELECT * FROM resposta');
  console.log('Respostes: ', rows);
  res.json(rows);
} catch (error) {
  console.error('Error fetching respostes:', error);
  res.status(500).send('Error fetching respostes.');
} finally {
  connection.end();
  console.log("Connection closed.");
}

});

app.post('/resposta', async (req, res) => {
  const { id_peticio, id_usuari, id_resposta_ref, contingut, data } = req.body;
  if (!id_peticio || !id_usuari|| id_resposta_ref == undefined ||!contingut || !data) {
    return res.status(400).send('Datos incompletos.');
  }

  let connection;

  try {
    connection = await connectDB();
    const [rows] = await connection.query('INSERT INTO resposta (id_peticio, id_usuari, id_resposta_ref, contingut, data) VALUES (?, ?, ?, ?, ?)', [id_peticio, id_usuari, id_resposta_ref, contingut, data]);
  
    console.log("Resposta: ", rows);

    if (rows.length == 0) {
      return res.status(404).send('Resposta no encontrada.');
    }

    res.status(201).json(rows[0]);
  } catch (error) {
    console.error('Error fetching resposta:', error);
    res.status(500).send('Error fetching resposta.');
  } finally {
    connection.end();
    console.log("Connection closed.");
  }
});

app.put('/resposta/:id', async (req, res) => {
  const { id } = req.params;
  const cleanedId = id.replace(/[^0-9]/g, '');
  const respostaId = parseInt(cleanedId, 10); // Convertir a entero
  const { id_peticio, id_usuari, id_resposta_ref, contingut} = req.body;
  let connection;

  // Validación de campos
  if (contingut == undefined) {
    return res.status(400).send('Datos incompletos.');
  }

  try {
    // Conectar a la base de datos
    connection = await connectDB();

    // Ejecutar consulta de actualización
    const [result] = await connection.query(
      'UPDATE resposta SET contingut = ? WHERE id_resposta = ?',
      [contingut , respostaId]
    );

    if (result.affectedRows > 0) {
      // sendProducts(); // Función de socket
      let message = {
        message: `Resposta con ID ${respostaId} actualizado con éxito.`
      }
      res.status(200).send(JSON.stringify(message));
    } else {
      res.status(404).send('Resposta no encontrada.');
    }
  } catch (error) {
    console.error('Error al actualizar la resposta:', error);
    res.status(500).send('Error al actualizar la resposta.');
  } finally {
    if (connection) connection.end();
    console.log("Connection closed.");
  }
});

app.delete('/resposta/:id', async (req, res) => {
  const {id} = req.params;
  const cleanedID = id.replace(/[^0-9]/g, '');
  const respostaId = parseInt(cleanedID, 10);
  let connection;
  
  try {
    connection = await connectDB();
    const [rows] = await connection.query('DELETE FROM resposta WHERE id_resposta = ?', [respostaId])
    
    if (rows.affectedRows > 0) {
      // sendProducts(); // Función de socket
        const message = { message: `Resposta con ID ${respostaId} eliminado con éxito.` };
        res.status(200).send(JSON.stringify(message));
    } else {
      res.status(404).send('Resposta no encontrado.');
    }
  } catch (error) {
    res.status(500).send('Error al eliminar la resposta.');
  } finally {
    connection.end();
  }
});

//--------------------- CRUD categoria ---------------------------
app.get('/categoria', async (req, res) => {
  let connection;
  
  try {
    connection = await connectDB();
    const [rows] = await connection.query('SELECT * FROM categoria');
    console.log('Categorias: ', rows);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).send('Error fetching categories.');
  } finally {
    connection.end();
    console.log("Connection closed.");
  }
  
  });

  app.post('/categoria', async (req, res) => {
    const { nom } = req.body;
    if (nom == undefined) {
      return res.status(400).send('Datos incompletos.');
    }
  
    let connection;
  
    try {
      connection = await connectDB();
      const [rows] = await connection.query('INSERT INTO categoria (nom) VALUES (?)', [nom]);
    
      console.log("Categoria: ", rows);
  
      if (rows.length == 0) {
        return res.status(404).send('Categoria no encontrada.');
      }
      let message = {
        message: `Categoria insertada con exito`
      }
  
      res.status(200).send(JSON.stringify(message));
      res.status(201).json(rows[0]);
    } catch (error) {
      console.error('Error fetching categoria:', error);
      res.status(500).send('Error fetching categoria.');
    } finally {
      connection.end();
      console.log("Connection closed.");
    }
  });
  

  app.put('/categoria/:id', async (req, res) => {
    const { id } = req.params;
    const cleanedId = id.replace(/[^0-9]/g, '');
    const categoriaId = parseInt(cleanedId, 10); // Convertir a entero
    const { nom } = req.body;
    let connection;
  
    // Validación de campos
    if (nom == undefined) {
      return res.status(400).send('Datos incompletos.');
    }
  
    try {
      // Conectar a la base de datos
      connection = await connectDB();
  
      // Ejecutar consulta de actualización
      const [result] = await connection.query(
        'UPDATE categoria SET nom = ? WHERE id_categoria = ?',
        [nom , categoriaId]
      );
  
      if (result.affectedRows > 0) {
        // sendProducts(); // Función de socket
        let message = {
          message: `Categoria con ID ${categoriaId} actualizado con éxito.`
        }
        res.status(200).send(JSON.stringify(message));
      } else {
        res.status(404).send('Categoria no encontrada.');
      }
    } catch (error) {
      console.error('Error al actualizar la resposta:', error);
      res.status(500).send('Error al actualizar la resposta.');
    } finally {
      if (connection) connection.end();
      console.log("Connection closed.");
    }
  });

  app.delete('/categoria/:id', async (req, res) => {
    const {id} = req.params;
    const cleanedID = id.replace(/[^0-9]/g, '');
    const categoriaId = parseInt(cleanedID, 10);
    let connection;
    
    try {
      connection = await connectDB();
      const [rows] = await connection.query('DELETE FROM categoria WHERE id_categoria = ?', [categoriaId])
      
      if (rows.affectedRows > 0) {
        // sendProducts(); // Función de socket
          const message = { message: `Categoria con ID ${categoriaId} eliminado con éxito.` };
          res.status(200).send(JSON.stringify(message));
      } else {
        res.status(404).send('Categoria no encontrado.');
      }
    } catch (error) {
      res.status(500).send('Error al eliminar la categoria.');
    } finally {
      connection.end();
    }
  });

  //---------------------------------------- CRUD usuaris -------------------------------------------

  const imatge_usuari_ruta = path.join('images', 'azanKun.png');


  app.get('/usuaris', async (req, res) => {
    let connection;
    try {
      connection = await connectDB();
      const [rows] = await connection.query('SELECT * FROM usuaris');
      console.log('Usuaris: ', rows);
      res.json(rows);
      sendUsuaris();
    } catch (error) {
      console.error('Error fetching usuaris:', error);
      res.status(500).send('Error fetching usuaris.');
    } finally {
      connection.end();
      console.log("Connection closed.");
    }
  });

  
 // Configuración de Nodemailer (modifica según tu servidor de correo)
const transporter = nodemailer.createTransport({
    service: 'gmail', 
    port: 465, // Puerto seguro para TLS
    secure: true,
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASS  
    }
  });
  
  // Registre usuaris ALUMNES amb enviament de correu al seu tutor legal
  app.post('/alumnes', async (req, res) => {
    const { nom, cognom, correu_alumne, correu_tutor, correu_profe, id_curs, contrasenya } = req.body;
  
    // Validación de datos
    if (!nom || !cognom || !correu_alumne || !correu_tutor || !correu_profe || !id_curs || !contrasenya) {
      return res.status(400).send('Datos incompletos.');
    }
  
    let connection;
  
    try {
      // Encriptar la contraseña
      const hashedPassword = await bcrypt.hash(contrasenya, 10);
      console.log("Contraseña encriptada:", hashedPassword);
  
      // Conectar a la base de datos
      connection = await connectDB();
  
      // Ejecutar la consulta SQL
      const [rows] = await connection.query(
        `INSERT INTO usuaris (nom, cognom, correu_alumne, correu_tutor, correu_profe, id_curs, contrasenya, tipus, imatge_usuari_ruta)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [nom, cognom, correu_alumne, correu_tutor, correu_profe, id_curs, hashedPassword, 'alum', null]
      );
  
      // Enviar correo al tutor
      const mailOptions = {
        from: '"Supportly" <a21adrvazvaz@inspedralbes.cat>', // Remitente
        to: correu_tutor,
        cc: 'a24bermirpre@inspedralbes.cat, a21xavmarvel@inspedralbes.cat, a22arnmaljoa@inspedralbes.cat, a23edstorcev@inspedralbes.cat, a21adrvazvaz@inspedralbes.cat',
        subject: 'Registro de Alumno Menor de Edad en Supportly',
        html: `
          <h1>Bienvenido a Supportly </h1>
          <p>Tu hijo/a <b>${nom}</b> ha sido registrado/a en nuestra plataforma Supportly. Por favor, confirma el registro haciendo clic en el siguiente enlace:</p>
          <a href="http://miapp.com/confirmar-registro?alumno=${correu_alumne}">Confirmar registro</a>
          <p>Gracias,</p>
          <p>Equipo de Supportly </p>
        `
      };
  
      await transporter.sendMail(mailOptions);
  
      const message = { message: `Usuari insertado con éxito. Correo enviado al tutor legal.` };
      res.status(201).send(JSON.stringify(message));
    } catch (error) {
      console.error('Error al insertar usuario o enviar correo:', error);
      res.status(500).send('Error al insertar usuario o enviar correo.');
    } finally {
      if (connection) {
        connection.end();
        console.log("Connection closed.");
      }
    }
  });
  

  //Registre usuaris MENTOR
  app.post('/mentors', async (req, res) => {
    const { nom, cognom, correu_alumne, correu_profe, id_curs, contrasenya } = req.body;
  
    // Validación de datos
    if (!nom || !cognom || !correu_alumne || !correu_profe || !id_curs || !contrasenya) {
      return res.status(400).send('Datos incompletos.');
    }
  
    let connection;
  
    try {
      // Encriptar la contraseña
      const hashedPassword = await bcrypt.hash(contrasenya, 10);
      console.log("Contraseña encriptada:", hashedPassword);
  
      // Conectar a la base de datos
      connection = await connectDB();
  
      // Ejecutar la consulta SQL
      const [rows] = await connection.query(
        `INSERT INTO usuaris 
        (nom, cognom, correu_alumne, correu_profe, contrasenya, tipus, imatge_usuari_ruta, valid_tut_legal) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [nom, cognom, correu_alumne, correu_profe, hashedPassword, 'ment', null, 1]
      );
  
      const message = { message: `Mentor insertado con éxito.` };
      res.status(201).send(JSON.stringify(message));
    } catch (error) {
      console.error('Error al insertar mentor:', error);
      res.status(500).send('Error al insertar mentor.');
    } finally {
      if (connection) {
        connection.end();
        console.log("Connection closed.");
      }
    }
  });
  


// Endpoint para actualizar la validación de un mentor
app.put('/validarMentor/:mentorId', async (req, res) => {
  const { mentorId } = req.params;
  const { validado } = req.body; // true (1) para aprobar, false (0) para rechazar

  if (validado !== true && validado !== false) {
    return res.status(400).send('Valor de validado inválido. Debe ser true (1) o false (0).');
  }

  let connection;
  try {
    connection = await connectDB();

    // Actualizar el estado de validación del mentor
    const [result] = await connection.query(
      'UPDATE usuaris SET valid_tut_aula = ? WHERE id_usuari = ? AND tipus = "ment"',
      [validado ? 1 : 0, mentorId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).send('Mentor no encontrado o no es un mentor.');
    }

    // Si el mentor fue rechazado (validado = false), eliminarlo
    if (!validado) {
      await connection.query('DELETE FROM usuaris WHERE id_usuari = ? AND tipus = "ment"', [mentorId]);
    }

    const message = validado
      ? 'Mentor validado con éxito.'
      : 'Mentor rechazado, eliminado de la base de datos.';

    res.status(200).send({ message });
  } catch (error) {
    console.error('Error al actualizar valid_tut_aula:', error);
    res.status(500).send('Error al actualizar valid_tut_aula.');
  } finally {
    if (connection) {
      connection.end();
      console.log('Conexión cerrada.');
    }
  }
});

// Endpoint para obtener mentores pendientes de validación
app.get('/mentoresPendientes', async (req, res) => {
  let connection;
  try {
    connection = await connectDB();

    // Obtener los mentores pendientes de validación (solo nombre, apellido y curso)
    const [rows] = await connection.query(
      'SELECT id_usuari, nom, cognom, id_curs, correu_profe FROM usuaris WHERE valid_tut_aula = 0 AND tipus = "ment"'
    );

    if (rows.length === 0) {
      return res.status(404).send('No hay mentores pendientes de validación.');
    }

    res.status(200).send(rows); // Mandamos la lista de mentores pendientes con solo los campos requeridos
  } catch (error) {
    console.error('Error al obtener mentores pendientes:', error);
    res.status(500).send('Error al obtener mentores pendientes.');
  } finally {
    if (connection) {
      connection.end();
      console.log('Conexión cerrada.');
    }
  }
});



  //PARA VER TODOS LOS ALUMNOS REGISTRADOS CON EL CORREO DE REFERENCIA DE SU TUTOR DE AULA---------     VUE
  app.get('/alumnos-por-tutor', async (req, res) => {
    const { correu_profe } = req.query; //
  
    if (!correu_profe) {
      return res.status(400).send('Correo del tutor es requerido.');
    }
  
    let connection;
    try {
      connection = await connectDB();
  
      // Consulta para obtener alumnos asociados a este correo de tutor
      const [alumnos] = await connection.query(
        'SELECT nom, correu, telefon, tipus FROM usuaris WHERE correu_profe = ?',
        [correu_profe]
      );
  
      res.status(200).send({ alumnos });
    } catch (error) {
      console.error('Error obteniendo alumnos:', error);
      res.status(500).send('Error obteniendo alumnos.');
    } finally {
      if (connection) connection.end();
    }
  });
  


//REGISTRE PROFES D'AULA PER EL VUE
  app.post('/profes', async (req, res) => {
    const { nom, cognom, correu_profe, contrasenya } = req.body;
    
    if (!nom || !cognom || !correu_profe || !contrasenya) {
      return res.status(400).send('Datos incompletos.');
    }
  
    let connection;
  
    try {
      // Encriptar la contraseña
      const hashedPassword = await bcrypt.hash(contrasenya, 10);
      console.log("Contraseña encriptada:", hashedPassword);
  
      // Conectar a la base de datos
      connection = await connectDB();
  
      // Ejecutar la consulta SQL
      const [rows] = await connection.query(
        `INSERT INTO usuaris (nom, cognom, correu_profe, contrasenya, tipus, imatge_usuari_ruta, valid_tut_legal, valid_tut_aula)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [nom, cognom, correu_profe, hashedPassword, 'prof', null, 1, 1]
      );
  
      // Respuesta exitosa
      const message = { message: `Professor insertado con éxito.` };
      res.status(201).send(JSON.stringify(message));
    } catch (error) {
      console.error('Error inserting Profe:', error);
      res.status(500).send('Error inserting Profe.');
    } finally {
      if (connection) {
        connection.end();
        console.log("Connection closed.");
      }
    }
  });
  

  
  app.put('/usuaris/:id', async (req, res) => {
    const { id } = req.params;
    const cleanedId = id.replace(/[^0-9]/g, '');
    const usuariId = parseInt(cleanedId, 10);
    const { nom, correu, correu_tutor, correu_profe, contrasenya, telefon, tipus, imatge_usuari_ruta } = req.body;
    if (
  nom == undefined || 
  correu == undefined || 
  correu_tutor == undefined || 
  correu_profe == undefined || 
  contrasenya == undefined ||
  telefon == undefined || 
  tipus == undefined ||
  imatge_usuari_ruta == undefined
) {
      return res.status(400).send('Datos incompletos.');
    }
    let connection;
    try {
      connection = await connectDB();
      const [result] = await connection.query('UPDATE usuaris SET nom = ?, correu_alumne = ?, correu_tutor = ?, correu_profe = ?, contrasenya = ?, telefon = ?, tipus = ?, imatge_usuari_ruta = ? WHERE id_usuari = ?', [nom, correu_alumne, correu_tutor, correu_profe, contrasenya, telefon, tipus, imatge_usuari_ruta, usuariId]);
      if (result.affectedRows > 0) {
        let message = { message: `Usuari con ID ${usuariId} actualizado con éxito.` };
        res.status(200).send(JSON.stringify(message));
      } else {
        res.status(404).send('Usuari no encontrado.');
      }
    } catch (error) {
      console.error('Error updating usuaris:', error);
      res.status(500).send('Error updating usuaris.');
    } finally {
      connection.end();
      console.log("Connection closed.");
    }
  });
  
  app.delete('/usuaris/:id', async (req, res) => {
    const { id } = req.params;
    const cleanedId = id.replace(/[^0-9]/g, '');
    const usuariId = parseInt(cleanedId, 10);
    let connection;
    try {
      connection = await connectDB();
      const [rows] = await connection.query('DELETE FROM usuaris WHERE id_usuari = ?', [usuariId]);
      if (rows.affectedRows > 0) {
        let message = { message: `Usuari con ID ${usuariId} eliminado con éxito.` };
        res.status(200).send(JSON.stringify(message));
      } else {
        res.status(404).send('Usuari no encontrado.');
      }
    } catch (error) {
      console.error('Error deleting usuaris:', error);
      res.status(500).send('Error deleting usuaris.');
    } finally {

      sendUsuaris()
      connection.end();
      console.log("Connection closed.");
    }
  });


  //LogIn Alumnes
  app.post('/login', async (req, res) => {
    const { correu_alumne, contrasenya } = req.body; 
    let connection;

    if (!correu_alumne || !contrasenya) {
        return res.status(400).json({ message: 'Faltan datos necesarios' });
    }

    try {
        connection = await connectDB();

        const query = 'SELECT * FROM usuaris WHERE correu_alumne = ?';
        const [rows] = await connection.execute(query, [correu_alumne]);

        // Validar existencia del usuario
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const user = rows[0];

        let passwordMatch = false;

        // Intentar validar la contraseña como hasheada
        try {
            passwordMatch = await bcrypt.compare(contrasenya, user.contrasenya);
        } catch (err) {
            console.warn('Error comparando contraseñas hasheadas:', err.message);
        }

        // Si la comparación hasheada falla, intentar comparación directa
        if (!passwordMatch && user.contrasenya === contrasenya) {
            passwordMatch = true;
        }

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        res.json({
            message: 'Login exitoso',
            user: {
                id: user.id,
                email: user.correu_alumne,
            },
        });

        connection.end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error del servidor' });
    }
});



app.post('/loginProf', async (req, res) => {
  const {correu_profe, contrasenya} = req.body; 
  let connection;

  if (!correu_profe || !contrasenya ) {
      return res.status(400).json({ message: 'Faltan datos necesarios' });
  }

  try {
    connection = await connectDB();

      const query = 'SELECT * FROM usuaris WHERE correu_profe = ? AND tipus = "prof"'
        

      const [rows] = await connection.execute(query, [correu_profe]);

      // Validar existencia del usuario
      if (rows.length === 0) {
          return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      const user = rows[0];

      const passwordMatch = await bcrypt.compare(contrasenya, user.contrasenya);
      if (!passwordMatch) {
          return res.status(401).json({ message: 'Contraseña incorrecta' });
      }

      res.json({
          message: 'Login exitoso',
          user: {
              email: user.correu_profe,
              contrasenya: user.contrasenya,
          },
      });

      connection.end();
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error del servidor' });
  }
});

  //------------------------------------------ CRUD coneixements --------------------------------------
  app.get('/coneixements', async (req, res) => {
    let connection;
    try {
      connection = await connectDB();
      const [rows] = await connection.query('SELECT * FROM coneixements');
      console.log('Coneixements: ', rows);
      res.json(rows);
    } catch (error) {
      console.error('Error fetching coneixements:', error);
      res.status(500).send('Error fetching coneixements.');
    } finally {
      connection.end();
      console.log("Connection closed.");
    }
  });
  
  app.post('/coneixements', async (req, res) => {
    const { id_usuari, id_categoria } = req.body;
    if (!id_usuari || !id_categoria) {
      return res.status(400).send('Datos incompletos.');
    }
    let connection;
    try {
      connection = await connectDB();
      const [rows] = await connection.query('INSERT INTO coneixements (id_usuari, id_categoria) VALUES (?, ?)', [id_usuari, id_categoria]);
      let message = { message: `Coneixement insertado con éxito.` };
      res.status(201).send(JSON.stringify(message));
    } catch (error) {
      console.error('Error inserting coneixements:', error);
      res.status(500).send('Error inserting coneixements.');
    } finally {
      connection.end();
      console.log("Connection closed.");
    }
  });
  
  app.put('/coneixements/:id', async (req, res) => {
    const { id } = req.params;
    const cleanedId = id.replace(/[^0-9]/g, '');
    const coneixementsId = parseInt(cleanedId, 10);
    const { id_usuari, id_categoria } = req.body;
    if (!id_usuari || !id_categoria) {
      return res.status(400).send('Datos incompletos.');
    }
    let connection;
    try {
      connection = await connectDB();
      const [result] = await connection.query('UPDATE coneixements SET id_usuari = ?, id_categoria = ? WHERE id_coneixement = ?', [id_usuari, id_categoria, coneixementsId]);
      if (result.affectedRows > 0) {
        let message = { message: `Coneixement con ID ${coneixementsId} actualizado con éxito.` };
        res.status(200).send(JSON.stringify(message));
      } else {
        res.status(404).send('Coneixement no encontrado.');
      }
    } catch (error) {
      console.error('Error updating coneixements:', error);
      res.status(500).send('Error updating coneixements.');
    } finally {
      connection.end();
      console.log("Connection closed.");
    }
  });
  
  app.delete('/coneixements/:id', async (req, res) => {
    const { id } = req.params;
    const cleanedId = id.replace(/[^0-9]/g, '');
    const coneixementsId = parseInt(cleanedId, 10);
    let connection;
    try {
      connection = await connectDB();
      const [rows] = await connection.query('DELETE FROM coneixements WHERE id_coneixement = ?', [coneixementsId]);
      if (rows.affectedRows > 0) {
        let message = { message: `Coneixement con ID ${coneixementsId} eliminado con éxito.` };
        res.status(200).send(JSON.stringify(message));
      } else {
        res.status(404).send('Coneixement no encontrado.');
      }
    } catch (error) {
      console.error('Error deleting coneixements:', error);
      res.status(500).send('Error deleting coneixements.');
    } finally {
      connection.end();
      console.log("Connection closed.");
    }
  });

    //------------------------------------------ Curs --------------------------------------

    app.get('/curs', async (req, res) => {
      let connection;
      try {
        connection = await connectDB();
        const [rows] = await connection.query('SELECT * FROM curs');
        console.log("Curs: ", rows);
        res.json(rows);
      } catch (error) {
        console.error('Error fetching peticions:', error);
        res.status(500).send('Error fetching peticions.');
      } finally {
        connection.end();
        console.log("Connection closed.");
      }
    });

    //------------------------------------------ CRUD valoracio --------------------------------------


  app.get('/valoraciones', async (req, res) => {
    let connection;
    try {
      connection = await connectDB();
      const [rows] = await connection.query(`
        SELECT * FROM valoracio
      `);
      console.log('Valoraciones: ', rows);
      res.json(rows);
    } catch (error) {
      console.error('Error fetching valoraciones:', error);
      res.status(500).send('Error fetching valoraciones.');
    } finally {
      connection.end();
      console.log("Connection closed.");
    }
  });
  

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});