CREATE TABLE IF NOT EXISTS categoria (
  id_categoria INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nom VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS usuaris (
  id_usuari INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(100) NOT NULL,
  correu_alumne VARCHAR(100) NOT NULL UNIQUE,
  correu_tutor VARCHAR(100) NOT NULL UNIQUE,
  correu_profe VARCHAR(100) NOT NULL UNIQUE,
  contrasenya VARCHAR(100) NOT NULL,
  telefon VARCHAR(15) DEFAULT NULL,
  tipus ENUM('alum', 'prof', 'ment') NOT NULL,
  imatge_usuari_ruta VARCHAR(255) DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS coneixements (
  id_coneixement INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  id_usuari INT(11) NOT NULL,
  id_categoria INT(11) NOT NULL,
  FOREIGN KEY (id_usuari) REFERENCES usuaris (id_usuari) ON DELETE CASCADE,
  FOREIGN KEY (id_categoria) REFERENCES categoria (id_categoria) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS peticio (
  id_peticio INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  id_usuari INT(11) NOT NULL,
  id_categoria INT(11) NOT NULL,
  nom_peticio VARCHAR(100) NOT NULL,
  descripcio TEXT NOT NULL,
  data TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_usuari) REFERENCES usuaris (id_usuari) ON DELETE CASCADE,
  FOREIGN KEY (id_categoria) REFERENCES categoria (id_categoria) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS resposta (
  id_resposta INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  id_peticio INT(11) NOT NULL,
  id_usuari INT(11) NOT NULL,
  id_resposta_ref INT(11) DEFAULT 0,
  contingut TEXT NOT NULL,
  data TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_peticio) REFERENCES peticio (id_peticio) ON DELETE CASCADE,
  FOREIGN KEY (id_usuari) REFERENCES usuaris (id_usuari) ON DELETE CASCADE
);
