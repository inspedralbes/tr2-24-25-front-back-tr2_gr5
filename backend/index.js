const mysql = require('mysql2/promise');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const { Server } = require('socket.io');
const { createServer } = require('http');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, 'environment', '.env') }); // Carga .env desde 'environment'
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

//----------------- CRUD PETICION ---------------------------------------
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
    const { id } = req.params;
    const cleanedId = id.replace(/[^0-9]/g, '');
    const petitionId = parseInt(cleanedId, 10); // Convertir a entero
    const { id_usuari, id_categoria, nom_peticio, descripcio} = req.body;
    let connection;
  
    // Validación de campos
    if (id_usuari == undefined|| id_categoria == undefined || nom_peticio == undefined || descripcio == undefined) {
      return res.status(400).send('Datos incompletos.');
    }
  
    try {
      // Conectar a la base de datos
      connection = await connectDB();

      // Ejecutar consulta de actualización
      const [result] = await connection.query(
        'UPDATE peticio SET id_usuari = ?, id_categoria = ?, nom_peticio = ?, descripcio = ? WHERE id_peticio = ?',
        [id_usuari, id_categoria, nom_peticio, descripcio, petitionId]
      );
  
      if (result.affectedRows > 0) {
        // sendProducts(); // Función de socket
        let message = {
          message: `Peticion con ID ${petitionId} actualizado con éxito.`
        }
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
  const [rows] = await connection.query('DELETE FROM peticio WHERE id_peticio = ?', [petitionId])
  
  if (rows.affectedRows > 0) {
    // sendProducts(); // Función de socket
      const message = { message: `Peticion con ID ${petitionId} eliminado con éxito.` };
      res.status(200).send(JSON.stringify(message));
  } else {
    res.status(404).send('Peticion no encontrado.');
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

  app.get('/usuaris', async (req, res) => {
    let connection;
    try {
      connection = await connectDB();
      const [rows] = await connection.query('SELECT * FROM usuaris');
      console.log('Usuaris: ', rows);
      res.json(rows);
    } catch (error) {
      console.error('Error fetching usuaris:', error);
      res.status(500).send('Error fetching usuaris.');
    } finally {
      connection.end();
      console.log("Connection closed.");
    }
  });
  
  app.post('/usuari', async (req, res) => {
    const { nom, correu_alumne, correu_tutor, correu_profe, contrasenya, telefon, tipus, imatge_usuari_ruta } = req.body;
    if (!nom || !correu_alumne || !correu_tutor || !correu_profe || !contrasenya || !tipus) {
      return res.status(400).send('Datos incompletos.');
    }
    let connection;
    try {
      connection = await connectDB();
      const [rows] = await connection.query('INSERT INTO usuaris (nom, correu_alumne, correu_tutor, correu_profe, contrasenya, telefon, tipus, imatge_usuari_ruta) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [nom, correu_alumne, correu_tutor, correu_profe, contrasenya, telefon, tipus, imatge_usuari_ruta]);
      let message = { message: `Usuari insertado con éxito.` };
      res.status(201).send(JSON.stringify(message));
    } catch (error) {
      console.error('Error inserting usuaris:', error);
      res.status(500).send('Error inserting usuaris.');
    } finally {
      connection.end();
      console.log("Connection closed.");
    }
  });
  
  app.put('/usuaris/:id', async (req, res) => {
    const { id } = req.params;
    const cleanedId = id.replace(/[^0-9]/g, '');
    const usuariId = parseInt(cleanedId, 10);
    const { nom, correu_alumne, correu_tutor, correu_profe, contrasenya, telefon, tipus, imatge_usuari_ruta } = req.body;
    if (
  nom == undefined || 
  correu_alumne == undefined || 
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
      connection.end();
      console.log("Connection closed.");
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

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});