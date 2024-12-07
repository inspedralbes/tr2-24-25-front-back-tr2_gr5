-- Insertar datos en la tabla categoria
INSERT INTO categoria (nom) VALUES 
('Matemáticas'),
('Ciencias'),
('Historia'),
('Tecnología');

-- Insertar datos en la tabla usuaris
INSERT INTO usuaris (nom, correu_alumne, correu_tutor, correu_profe, contrasenya, telefon, tipus, imatge_usuari_ruta) VALUES 
('Juan Pérez', 'juan.alumno@example.com', 'juan.tutor@example.com', 'juan.profe@example.com', 'password123', '555123456', 'alum', '/images/juan.png'),
('María García', 'maria.alumno@example.com', 'maria.tutor@example.com', 'maria.profe@example.com', 'password123', '555654321', 'prof', '/images/maria.png'),
('Carlos López', 'carlos.alumno@example.com', 'carlos.tutor@example.com', 'carlos.profe@example.com', 'password123', '555987654', 'ment', '/images/carlos.png');

-- Insertar datos en la tabla coneixements
INSERT INTO coneixements (id_usuari, id_categoria) VALUES 
(1, 1), -- Juan Pérez conoce Matemáticas
(2, 2), -- María García conoce Ciencias
(3, 4); -- Carlos López conoce Tecnología

-- Insertar datos en la tabla peticio
INSERT INTO peticio (id_usuari, id_categoria, nom_peticio, descripcio) VALUES 
(1, 1, 'Ayuda con álgebra', 'Necesito ayuda para resolver ecuaciones cuadráticas'),
(2, 2, 'Proyecto de física', 'Asesoría para un proyecto sobre energía solar'),
(3, 4, 'Desarrollo web', 'Busco tutor para aprender a desarrollar aplicaciones web');

-- Insertar datos en la tabla resposta
INSERT INTO resposta (id_peticio, id_usuari, id_resposta_ref, contingut) VALUES 
(1, 2, 0, 'Puedo ayudarte con álgebra. ¿Cuándo te gustaría empezar?'),
(2, 3, 0, 'Tengo experiencia en proyectos de energía solar. Escríbeme para coordinar.'),
(3, 1, 0, 'Estoy interesado en aprender desarrollo web también. ¿Podemos colaborar?');
