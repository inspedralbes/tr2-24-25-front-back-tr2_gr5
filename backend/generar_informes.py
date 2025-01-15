import os
import mysql.connector
import pandas as pd
import matplotlib.pyplot as plt

graficos_path = "C:/Users/Bernat/Desktop/TR2GR5/Python/informes/grafics/"

# Asegúrate de que la carpeta exista, si no la crea
if not os.path.exists(graficos_path):
    os.makedirs(graficos_path)

# Conexión a la base de datos MySQL
conn = mysql.connector.connect(
    host="localhost",  # Cambia esto si tu servidor es remoto
    user="root",  # Usa tu nombre de usuario
    password="Starwars%2025",  # Usa tu contraseña
    database="mentorias"  # Usa el nombre de tu base de datos
)

# Consultas SQL
query1 = """
SELECT
    COUNT(*) AS numero_usuarios,
    tipus
FROM
    usuaris
GROUP BY tipus;
"""

query2 = """
SELECT
    categoria.nom,
    COUNT(peticio.id_peticio) AS numero_preguntas
FROM
    categoria
LEFT JOIN peticio ON peticio.id_categoria = categoria.id_categoria
GROUP BY categoria.id_categoria;
"""

query3 = """
SELECT
    usuaris.nom,
    usuaris.cognom,
    AVG(valoracio.puntuacio) AS puntuacion_promedio
FROM
    usuaris
LEFT JOIN valoracio ON valoracio.id_usuari_valorat = usuaris.id_usuari
GROUP BY usuaris.id_usuari;
"""

# Ejecuta las consultas y carga los resultados en DataFrames
df1 = pd.read_sql(query1, conn)
df2 = pd.read_sql(query2, conn)
df3 = pd.read_sql(query3, conn)

# Cierra la conexión a la base de datos
conn.close()

# Reemplazamos los valores None (sin puntuación) por 0 en df3 (Puntuación promedio por usuario)
df3['puntuacion_promedio'] = df3['puntuacion_promedio'].fillna(0)

# Crear la figura y los subgráficos
plt.figure(figsize=(15, 10))

# Gráfico 1: Número de usuarios por tipo
plt.subplot(1, 3, 1)
plt.bar(df1['tipus'], df1['numero_usuarios'], color='skyblue')
plt.title('Número de usuarios por tipo')
plt.xlabel('Tipo de usuario')
plt.ylabel('Número de usuarios')

# Gráfico 2: Número de preguntas por categoría
plt.subplot(1, 3, 2)
plt.bar(df2['nom'], df2['numero_preguntas'], color='lightcoral')
plt.title('Número de preguntas por categoría')
plt.xlabel('Categoría')
plt.ylabel('Número de preguntas')

# Gráfico 3: Puntuación promedio por usuario
plt.subplot(1, 3, 3)
plt.bar(df3['nom'] + " " + df3['cognom'], df3['puntuacion_promedio'], color='teal')
plt.title('Puntuación promedio por usuario')
plt.xlabel('Usuario')
plt.ylabel('Puntuación promedio')

# Ajustar el diseño del gráfico
plt.tight_layout()

# Guardar el gráfico
plt.savefig(os.path.join(graficos_path, "grafico_usuarios_preguntas_puntuaciones.png"))

# Mostrar el gráfico
plt.show()


#Gráfico 1 Numero de usuarios por tipo(Alumno, Mentor o Profesor)

#Gráfico 2 Numero de preguntas por categoría

#Puntuación promedio por Mentor