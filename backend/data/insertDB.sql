-- Inserción de datos

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

-- Datos para la tabla `curs`
INSERT INTO `curs` (`id_curs`, `numero_curs`, `nom_curs`) VALUES
(1, '1', 'SMIX'),
(3, '1', 'ASIX'),
(2, '2', 'DAM'),
(4, '2', 'DAW');

-- Datos para la tabla `usuaris`
INSERT INTO `usuaris` (`nom`, `cognom`,  `correu_alumne`, `correu_tutor`, `correu_profe`, `contrasenya`, `id_curs`, `tipus`, `imatge_usuari_ruta`, `likes`, `dislikes`) VALUES
('Juan', 'Pérez', 'juan.perez.alumno@example.com', 'juan.perez.tutor@example.com', 'juan.perez.profe@example.com', 'password123', 1, 'alum', '/images/juan.png', 0, 0),
  ('Ana', 'Rodríguez', 'ana.rodriguez.alumno@example.com', 'ana.rodriguez.tutor@example.com', 'CACA', 'password123', 1, 'alum', '/images/ana.png', 5, 1),
  ('Pedro', 'Martínez', 'pedro.martinez.alumno@example.com', 'pedro.martinez.tutor@example.com', 'pedro.martinez.profe@example.com', 'password123', 2, 'alum', '/images/pedro.png', 10, 3),
  ('E', 'E', 'E', 'E', 'E', 'E', 1, 'alum', '/images/juan.png', 0, 0);

-- Mentores pendientes de validar
INSERT INTO `usuaris` (`nom`, `cognom`, `correu_alumne`, `correu_tutor`, `correu_profe`, `contrasenya`, `id_curs`, `tipus`, `imatge_usuari_ruta`, `valid_tut_aula`, `valid_tut_legal`) VALUES
('Carlos', 'Gómez', 'carlos.gomez.alumno@example.com', 'carlos.gomez.tutor@example.com', 'CACA', 'password123', 3, 'ment', '/images/carlos.png', 0, 1),
('Laura', 'Fernández', 'laura.fernandez.alumno@example.com', 'laura.fernandez.tutor@example.com', 'CACA', 'password123', 3, 'ment', '/images/laura.png', 0, 1),
('Marta', 'López', 'marta.lopez.alumno@example.com', 'marta.lopez.tutor@example.com', 'marta.lopez.profe@example.com', 'password123', 4, 'ment', '/images/marta.png', 0, 1),
('Luis', 'Sánchez', 'luis.sanchez.alumno@example.com', 'luis.sanchez.tutor@example.com', 'luis.sanchez.profe@example.com', 'password123', 4, 'ment', '/images/luis.png', 0, 1),
('Elena', 'Vázquez', 'elena.vazquez.alumno@example.com', 'elena.vazquez.tutor@example.com', 'elena.vazquez.profe@example.com', 'password123', 4, 'ment', '/images/elena.png', 0, 1);

-- Mentores ya validados
INSERT INTO `usuaris` (`nom`, `cognom`, `correu_tutor`, `correu_profe`, `contrasenya`, `id_curs`, `tipus`, `imatge_usuari_ruta`, `valid_tut_aula`, `valid_tut_legal`, `peticionsAcabades`) VALUES
('José', 'García', 'jose.garcia.tutor1@example.com', 'CACA', 'password123', 3, 'ment', '/images/jose.png', 1, 1, 35),
('Patricia', 'Álvarez', 'patricia.alvarez.tutor2@example.com', 'CACA', 'password123', 4, 'ment', '/images/patricia.png', 1, 1, 72),
('Ricardo', 'Hernández', 'ricardo.hernandez.tutor3@example.com', 'ricardo.hernandez.profe@example.com', 'password123', 3, 'ment', '/images/ricardo.png', 1, 1, 18),
('Sofía', 'Ramírez', 'sofia.ramirez.tutor4@example.com', 'sofia.ramirez.profe@example.com', 'password123', 4, 'ment', '/images/sofia.png', 1, 1, 93),
('David', 'Jiménez', 'david.jimenez.tutor5@example.com', 'david.jimenez.profe@example.com', 'password123', 4, 'ment', '/images/david.png', 1, 1, 57),
('María', 'López', 'maria.lopez.tutor6@example.com', 'maria.lopez.profe@example.com', 'password123', 3, 'ment', '/images/maria.png', 1, 1, 11),
('Juan', 'Martínez', 'juan.martinez.tutor7@example.com', 'juan.martinez.profe@example.com', 'password123', 4, 'ment', '/images/juan.png', 1, 1, 88),
('Lucía', 'Pérez', 'lucia.perez.tutor8@example.com', 'lucia.perez.profe@example.com', 'password123', 3, 'ment', '/images/lucia.png', 1, 1, 64),
('Carlos', 'Gómez', 'carlos.gomez.tutor9@example.com', 'carlos.gomez.profe@example.com', 'password123', 4, 'ment', '/images/carlos.png', 1, 1, 29),
('Ana', 'Sánchez', 'ana.sanchez.tutor10@example.com', 'ana.sanchez.profe@example.com', 'password123', 3, 'ment', '/images/ana.png', 1, 1, 46);



-- Profesores
INSERT INTO `usuaris` (`nom`, `cognom`, `correu_profe`, `contrasenya`, `tipus`, `valid_tut_aula`, `valid_tut_legal`) VALUES
('Carlos', 'Gómez', 'user@exemple.com', 'user', 'prof', 1, 1),
('Laura', 'Fernández', 'laura.fernandez.profe@example.com', 'password123', 'prof', 1, 1),
('Marta', 'López', 'marta.lopez.profe@example.com', 'password123', 'prof', 1, 1),
('Luis', 'Sánchez', 'luis.sanchez.profe@example.com', 'password123','prof', 1, 1),
('Elena', 'Vázquez', 'elena.vazquez.profe@example.com', 'password123', 'prof', 1, 1);



-- Datos para la tabla `coneixements`
INSERT INTO `coneixements` (`id_coneixement`, `id_usuari`, `id_categoria`) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 3, 4);

-- Datos para la tabla `peticio`
INSERT INTO `peticio` (`id_peticio`, `id_usuari`, `id_usuari_asignat`, `id_categoria`, `nom_peticio`, `descripcio`, `activado`, `data`) VALUES
(1, 1, NULL, 1, 'Ayuda con álgebra', 'Necesito ayuda para resolver ecuaciones cuadráticas', 0, '2024-12-18 08:51:24'),
(2, 1, NULL, 4, 'Problema con Word', 'No sé cómo usar tablas dinámicas en Word', 0, '2024-12-20 14:30:00'),
(3, 1, NULL, 2, 'Error en mi código', 'No entiendo por qué mi bucle no funciona', 1, '2025-01-05 11:15:45'),
(4, 1, NULL, 8, 'Seguridad en redes', 'Cómo proteger mi red de ataques', 0, '2024-12-25 16:00:00'),
(5, 1, NULL, 6, 'Instalar Linux', 'Problemas para instalar Linux en mi máquina', 1, '2024-12-26 09:45:30'),
(6, 1, NULL, 3, 'Montaje de hardware', 'Necesito ayuda con el montaje de componentes', 0, '2025-01-02 13:20:10'),
(7, 1, NULL, 5, 'Etiquetas en HTML', 'Cómo usar correctamente etiquetas semánticas', 1, '2025-01-03 10:10:10'),
(8, 1, NULL, 7, 'Sistemas en red', 'Configurar servidores en red local', 0, '2024-12-30 18:00:00'),
(9, 1, NULL, 8, 'Seguridad avanzada', 'Implementar firewall personalizado', 1, '2024-12-29 08:30:00'),
(10, 1, NULL, 2, 'Depuración de código', 'Problemas al depurar en mi entorno IDE', 0, '2025-01-04 15:00:00');




-- Datos para la tabla `resposta`
INSERT INTO `resposta` (`id_resposta`, `id_peticio`, `id_usuari`, `id_resposta_ref`, `contingut`, `data`) VALUES
(1, 1, 2, 0, 'Puedo ayudarte con álgebra. ¿Cuándo te gustaría empezar?', '2024-12-18 08:51:25');


-- Valoraciones
INSERT INTO `valoracio` (`id_peticio`, `id_usuari_que_valora`, `id_usuari_valorat`, `puntuacio`, `comentari`, `data`) VALUES
(3, 1, 2, 4, 'La ayuda fue bastante buena, pero la explicación podría ser más clara.', '2024-12-19 10:00:00'),
(3, 1, 2, 5, 'Excelente explicación y muy útil para resolver mis dudas.', '2024-12-20 11:15:30'),
(3, 1, 2, 3, 'Fue útil, pero me gustaría que el proceso se explicara con más detalle.', '2024-12-21 14:20:00'),
(3, 1, 2, 2, 'La ayuda fue insuficiente para resolver mi problema, esperaba más detalles.', '2024-12-22 09:45:10'),
(3, 1, 2, 4, 'Buen trabajo en la resolución, pero algunas partes fueron complicadas de seguir.', '2024-12-23 16:30:05'),
(3, 1, 2, 5, 'Gran explicador, todo claro y sin confusión, muy bien hecho.', '2024-12-24 17:00:15'),
(3, 1, 2, 3, 'La ayuda fue básica, pero me habría gustado un enfoque más práctico.', '2024-12-25 12:30:45'),
(3, 1, 2, 4, 'Buena ayuda, aunque el tiempo de respuesta fue algo largo.', '2024-12-26 08:10:55'),
(3, 1, 2, 5, 'Muy buena explicación, realmente me ayudó a entender el tema de inmediato.', '2024-12-27 10:45:00'),
(3, 1, 2, 3, 'La respuesta fue útil, pero me faltaron ejemplos prácticos más claros.', '2024-12-28 11:15:20');
