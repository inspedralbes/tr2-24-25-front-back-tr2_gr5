-- Adminer 4.7.7 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `categoria`;
CREATE TABLE `categoria` (
  `id_categoria` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) NOT NULL,
  PRIMARY KEY (`id_categoria`),
  UNIQUE KEY `nom` (`nom`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `categoria` (`id_categoria`, `nom`) VALUES
(2,	'BBDD'),
(3,	'Programación'),
(1,	'Sistemes'),
(4,	'Aplicacions Ofimatiques'),
(5,	'Llenguatge de Marques'),
(6,	'Sistemes Operatius Monolloc'),
(7,	'Sistemas Operatius en Xarxa')
(8,	'Seguretat Informatica')
(9,	'');

DROP TABLE IF EXISTS `coneixements`;
CREATE TABLE `coneixements` (
  `id_coneixement` int NOT NULL AUTO_INCREMENT,
  `id_usuari` int NOT NULL,
  `id_categoria` int NOT NULL,
  PRIMARY KEY (`id_coneixement`),
  KEY `id_usuari` (`id_usuari`),
  KEY `id_categoria` (`id_categoria`),
  CONSTRAINT `coneixements_ibfk_1` FOREIGN KEY (`id_usuari`) REFERENCES `usuaris` (`id_usuari`) ON DELETE CASCADE,
  CONSTRAINT `coneixements_ibfk_2` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id_categoria`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `coneixements` (`id_coneixement`, `id_usuari`, `id_categoria`) VALUES
(1,	1,	1),
(2,	2,	2),
(3,	3,	4);

DROP TABLE IF EXISTS `peticio`;
CREATE TABLE `peticio` (
  `id_peticio` int NOT NULL AUTO_INCREMENT,
  `id_usuari` int NOT NULL,
  `id_categoria` int NOT NULL,
  `nom_peticio` varchar(100) NOT NULL,
  `descripcio` text NOT NULL,
  `data` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_peticio`),
  KEY `id_usuari` (`id_usuari`),
  KEY `id_categoria` (`id_categoria`),
  CONSTRAINT `peticio_ibfk_1` FOREIGN KEY (`id_usuari`) REFERENCES `usuaris` (`id_usuari`) ON DELETE CASCADE,
  CONSTRAINT `peticio_ibfk_2` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id_categoria`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `peticio` (`id_peticio`, `id_usuari`, `id_categoria`, `nom_peticio`, `descripcio`, `data`) VALUES
(1,	1,	1,	'Ayuda con álgebra',	'Necesito ayuda para resolver ecuaciones cuadráticas',	'2024-12-17 11:11:23'),
(2,	2,	2,	'Proyecto de física',	'Asesoría para un proyecto sobre energía solar',	'2024-12-17 11:11:23'),
(3,	3,	4,	'Desarrollo web',	'Busco tutor para aprender a desarrollar aplicaciones web',	'2024-12-17 11:11:23');

DROP TABLE IF EXISTS `resposta`;
CREATE TABLE `resposta` (
  `id_resposta` int NOT NULL AUTO_INCREMENT,
  `id_peticio` int NOT NULL,
  `id_usuari` int NOT NULL,
  `id_resposta_ref` int DEFAULT '0',
  `contingut` text NOT NULL,
  `data` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_resposta`),
  KEY `id_peticio` (`id_peticio`),
  KEY `id_usuari` (`id_usuari`),
  CONSTRAINT `resposta_ibfk_1` FOREIGN KEY (`id_peticio`) REFERENCES `peticio` (`id_peticio`) ON DELETE CASCADE,
  CONSTRAINT `resposta_ibfk_2` FOREIGN KEY (`id_usuari`) REFERENCES `usuaris` (`id_usuari`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `resposta` (`id_resposta`, `id_peticio`, `id_usuari`, `id_resposta_ref`, `contingut`, `data`) VALUES
(1,	1,	2,	0,	'Puedo ayudarte con álgebra. ¿Cuándo te gustaría empezar?',	'2024-12-17 11:11:23'),
(2,	2,	3,	0,	'Tengo experiencia en proyectos de energía solar. Escríbeme para coordinar.',	'2024-12-17 11:11:23'),
(3,	3,	1,	0,	'Estoy interesado en aprender desarrollo web también. ¿Podemos colaborar?',	'2024-12-17 11:11:23');

DROP TABLE IF EXISTS `usuaris`;
CREATE TABLE `usuaris` (
  `id_usuari` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) NOT NULL,
  `correu_alumne` varchar(100) NOT NULL,
  `correu_tutor` varchar(100) NOT NULL,
  `correu_profe` varchar(100) NOT NULL,
  `contrasenya` varchar(100) NOT NULL,
  `telefon` varchar(15) DEFAULT NULL,
  `tipus` enum('alum','prof','ment') NOT NULL,
  `imatge_usuari_ruta` varchar(255) DEFAULT NULL,
  `valid_tut_aula` tinyint(1) DEFAULT '0',
  `valid_tut_legal` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id_usuari`),
  UNIQUE KEY `correu_alumne` (`correu_alumne`),
  UNIQUE KEY `correu_tutor` (`correu_tutor`),
  UNIQUE KEY `correu_profe` (`correu_profe`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `usuaris` (`id_usuari`, `nom`, `correu_alumne`, `correu_tutor`, `correu_profe`, `contrasenya`, `telefon`, `tipus`, `imatge_usuari_ruta`, `valid_tut_aula`, `valid_tut_legal`) VALUES
(1,	'Juan Pérez',	'juan.alumno@example.com',	'juan.tutor@example.com',	'juan.profe@example.com',	'password123',	'555123456',	'alum',	'/images/juan.png',	0,	0),
(2,	'María García',	'maria.alumno@example.com',	'maria.tutor@example.com',	'maria.profe@example.com',	'password123',	'555654321',	'prof',	'/images/maria.png',	0,	0),
(3,	'Carlos López',	'carlos.alumno@example.com',	'carlos.tutor@example.com',	'carlos.profe@example.com',	'password123',	'555987654',	'ment',	'/images/carlos.png',	0,	0);
