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
    host="localhost",  # Cambia a la IP o dominio del servidor
    user="root",       # Cambia por tu nombre de usuario
    password="Starwars%2025",  # Cambia por tu contraseña
    database="mentorias"  # Cambia por el nombre de tu base de datos
)

# Consulta 1: Número de usuarios por tipo (Alum, Prof, Ment)
query1 = """
SELECT tipus, COUNT(*) AS numero_usuarios
FROM usuaris
GROUP BY tipus;
"""

# Consulta 2: Número de preguntas por categoría
query2 = """
SELECT c.nom, COUNT(p.id_peticio) AS numero_preguntas
FROM categoria c
LEFT JOIN peticio p ON c.id_categoria = p.id_categoria
GROUP BY c.nom;
"""

# Consulta 3: Promedio de puntuación por usuario (según las valoraciones)
query3 = """
SELECT u.nom, u.cognom, AVG(v.puntuacio) AS puntuacion_promedio
FROM usuaris u
LEFT JOIN valoracio v ON u.id_usuari = v.id_usuari_valorat
GROUP BY u.id_usuari;
"""

# Cargar los datos en DataFrames
df1 = pd.read_sql(query1, conn)
df2 = pd.read_sql(query2, conn)
df3 = pd.read_sql(query3, conn)

# Mostrar los datos para verificar que todo se cargó correctamente
print(df1)
print(df2)
print(df3)

# Crear el gráfico para el análisis de usuarios por tipo
plt.figure(figsize=(10, 6))
plt.subplot(1, 3, 1)
plt.bar(df1['tipus'], df1['numero_usuarios'], color=['blue', 'orange', 'green'])
plt.title('Número de usuarios por tipo')
plt.xlabel('Tipo de usuario')
plt.ylabel('Número de usuarios')

# Crear el gráfico para el análisis de preguntas por categoría
plt.subplot(1, 3, 2)
plt.bar(df2['nom'], df2['numero_preguntas'], color=['purple', 'red', 'pink', 'cyan'])
plt.title('Número de preguntas por categoría')
plt.xlabel('Categoría')
plt.ylabel('Número de preguntas')

# Crear el gráfico para el análisis de puntuación promedio por usuario
plt.subplot(1, 3, 3)
plt.bar(df3['nom'] + " " + df3['cognom'], df3['puntuacion_promedio'], color='teal')
plt.title('Puntuación promedio por usuario')
plt.xlabel('Usuario')
plt.ylabel('Puntuación promedio')

# Ajustar el diseño del gráfico
plt.tight_layout()

# Guardar el gráfico en la carpeta 'graficos'
plt.savefig(os.path.join(graficos_path, "grafico_usuarios_categoria_puntuacion.png"))

# Mostrar el gráfico
plt.show()

# Cerrar la conexión a la base de datos
conn.close()
