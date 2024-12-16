-- Insertar datos en la tabla categoria
INSERT INTO categoria (nom) VALUES 
('Matemáticas'),
('Ciencias'),
('Historia'),
('Tecnología');

-- Insertar datos en la tabla usuaris
-- Inserciones para 'alum'
-- Inserciones para 'alum'
-- Inserciones para 'alum'
INSERT INTO usuaris (nom, correu_alumne, correu_tutor, correu_profe, contrasenya, telefon, tipus, imatge_usuari_ruta) VALUES 
('Juan Pérez', 'juan.perez.alumno@example.com', 'juan.perez.tutor@example.com', 'juan.perez.profe@example.com', 'password123', '555123456', 'alum', '/images/juan.png'),
('Ana Rodríguez', 'ana.rodriguez.alumno@example.com', 'ana.rodriguez.tutor@example.com', 'ana.rodriguez.profe@example.com', 'password123', '555223456', 'alum', '/images/ana.png'),
('Pedro Martínez', 'pedro.martinez.alumno@example.com', 'pedro.martinez.tutor@example.com', 'pedro.martinez.profe@example.com', 'password123', '555323456', 'alum', '/images/pedro.png'),
('Laura Gómez', 'laura.gomez.alumno@example.com', 'laura.gomez.tutor@example.com', 'laura.gomez.profe@example.com', 'password123', '555423456', 'alum', '/images/laura.png'),
('Luis Fernández', 'luis.fernandez.alumno@example.com', 'luis.fernandez.tutor@example.com', 'luis.fernandez.profe@example.com', 'password123', '555523456', 'alum', '/images/luis.png');

-- Inserciones para 'prof'
INSERT INTO usuaris (nom, correu_alumne, correu_tutor, correu_profe, contrasenya, telefon, tipus, imatge_usuari_ruta) VALUES 
('José Martínez', 'jose.martinez.alumno@example.com', 'jose.martinez.tutor@example.com', 'jose.martinez.profe@example.com', 'password123', '555103456', 'prof', '/images/jose.png'),
('Beatriz Sánchez', 'beatriz.sanchez.alumno@example.com', 'beatriz.sanchez.tutor@example.com', 'beatriz.sanchez.profe@example.com', 'password123', '555203456', 'prof', '/images/beatriz.png'),
('Ricardo Díaz', 'ricardo.diaz.alumno@example.com', 'ricardo.diaz.tutor@example.com', 'ricardo.diaz.profe@example.com', 'password123', '555303456', 'prof', '/images/ricardo.png'),
('Carla López', 'carla.lopez.alumno@example.com', 'carla.lopez.tutor@example.com', 'carla.lopez.profe@example.com', 'password123', '555403456', 'prof', '/images/carla.png'),
('Fernando García', 'fernando.garcia.alumno@example.com', 'fernando.garcia.tutor@example.com', 'fernando.garcia.profe@example.com', 'password123', '555503456', 'prof', '/images/fernando.png');

-- Inserciones para 'ment'
INSERT INTO usuaris (nom, correu_alumne, correu_tutor, correu_profe, contrasenya, telefon, tipus, imatge_usuari_ruta) VALUES 
('Antonio Gómez', 'antonio.gomez.alumno@example.com', 'antonio.gomez.tutor@example.com', 'antonio.gomez.profe@example.com', 'password123', '555113456', 'ment', '/images/antonio.png'),
('Eva Hernández', 'eva.hernandez.alumno@example.com', 'eva.hernandez.tutor@example.com', 'eva.hernandez.profe@example.com', 'password123', '555213456', 'ment', '/images/eva.png'),
('Manuel Rodríguez', 'manuel.rodriguez.alumno@example.com', 'manuel.rodriguez.tutor@example.com', 'manuel.rodriguez.profe@example.com', 'password123', '555313456', 'ment', '/images/manuel.png'),
('Julia Martín', 'julia.martin.alumno@example.com', 'julia.martin.tutor@example.com', 'julia.martin.profe@example.com', 'password123', '555413456', 'ment', '/images/julia.png'),
('Santiago López', 'santiago.lopez.alumno@example.com', 'santiago.lopez.tutor@example.com', 'santiago.lopez.profe@example.com', 'password123', '555513456', 'ment', '/images/santiago.png');


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
