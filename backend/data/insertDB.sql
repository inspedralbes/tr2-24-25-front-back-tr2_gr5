-- Inserción de datos

<<<<<<< HEAD
=======

>>>>>>> c80622619e65b621c71b5ed2e51d0f6211c7c1f1
-- Datos para la tabla `categoria`
INSERT INTO `categoria` (`id_categoria`, `nom`) VALUES
(4, 'Aplicacions Ofimatiques'),
(1, 'BBDD'),
(5, 'Llenguatge de Marques'),
(2, 'Programación'),
(8, 'Seguretat Informatica'),
(3, 'Sistemes'),
(7, 'Sistemes Operatius en Xarxa'),
(6, 'Sistemes Operatius Monolloc');

<<<<<<< HEAD
-- Datos para la tabla `curs`
INSERT INTO `curs` (`id_curs`, `numero_curs`, `nom_curs`) VALUES
(1, '1', 'SMIX'),
(3, '1', 'ASIX'),
(2, '2', 'DAM'),
(4, '2', 'DAW');

-- Datos para la tabla `usuaris`
INSERT INTO `usuaris` (`id_usuari`, `nom`, `correu_alumne`, `correu_tutor`, `correu_profe`, `contrasenya`, `id_curs`, `telefon`, `tipus`, `imatge_usuari_ruta`) VALUES
(1, 'Juan Pérez', 'juan.perez.alumno@example.com', 'juan.perez.tutor@example.com', 'juan.perez.profe@example.com', 'password123', 1, '555123456', 'alum', '/images/juan.png'),
(2, 'Ana Rodríguez', 'ana.rodriguez.alumno@example.com', 'ana.rodriguez.tutor@example.com', 'ana.rodriguez.profe@example.com', 'password123', 1, '555223456', 'alum', '/images/ana.png'),
(3, 'Pedro Martínez', 'pedro.martinez.alumno@example.com', 'pedro.martinez.tutor@example.com', 'pedro.martinez.profe@example.com', 'password123', 2, '555323456', 'alum', '/images/pedro.png');
=======

-- Datos para la tabla `curs`
INSERT INTO `curs` (`numero_curs`, `nom_curs`) VALUES
('1', 'SMIX'),
('1', 'ASIX'),
('2', 'DAM'),
('2', 'DAW');


-- Datos para la tabla `usuaris`
INSERT INTO `usuaris` (`id_usuari`, `nom`, `cognom`, `correu_alumne`, `correu_tutor`, `correu_profe`, `contrasenya`, `id_curs`, `tipus`, `imatge_usuari_ruta`) VALUES
(1, 'Juan Pérez', 'Pepe', 'juan.perez.alumno@example.com', 'juan.perez.tutor@example.com', 'juan.perez.profe@example.com', 'password123', 1, 'alum', '/images/juan.png'),
(2, 'Ana Rodríguez', 'Pepe', 'ana.rodriguez.alumno@example.com', 'ana.rodriguez.tutor@example.com', 'ana.rodriguez.profe@example.com', 'password123', 1, 'alum', '/images/ana.png'),
(3, 'Pedro Martínez', 'Pepe', 'pedro.martinez.alumno@example.com', 'pedro.martinez.tutor@example.com', 'pedro.martinez.profe@example.com', 'password123', 2, 'alum', '/images/pedro.png');

>>>>>>> c80622619e65b621c71b5ed2e51d0f6211c7c1f1

-- Datos para la tabla `coneixements`
INSERT INTO `coneixements` (`id_coneixement`, `id_usuari`, `id_categoria`) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 3, 4);

<<<<<<< HEAD
=======

>>>>>>> c80622619e65b621c71b5ed2e51d0f6211c7c1f1
-- Datos para la tabla `peticio`
INSERT INTO `peticio` (`id_peticio`, `id_usuari`, `id_categoria`, `nom_peticio`, `descripcio`, `activado`, `data`) VALUES
(1, 1, 1, 'Ayuda con álgebra', 'Necesito ayuda para resolver ecuaciones cuadráticas', 0, '2024-12-18 08:51:24');

<<<<<<< HEAD
-- Datos para la tabla `resposta`
INSERT INTO `resposta` (`id_resposta`, `id_peticio`, `id_usuari`, `id_resposta_ref`, `contingut`, `data`) VALUES
(1, 1, 2, 0, 'Puedo ayudarte con álgebra. ¿Cuándo te gustaría empezar?', '2024-12-18 08:51:25');
=======

-- Datos para la tabla `resposta`
INSERT INTO `resposta` (`id_resposta`, `id_peticio`, `id_usuari`, `id_resposta_ref`, `contingut`, `data`) VALUES
(1, 1, 2, 0, 'Puedo ayudarte con álgebra. ¿Cuándo te gustaría empezar?', '2024-12-18 08:51:25');
>>>>>>> c80622619e65b621c71b5ed2e51d0f6211c7c1f1
