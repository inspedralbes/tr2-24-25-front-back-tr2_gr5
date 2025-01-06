<template>
  <v-app>
    <!-- Barra superior -->
    <v-app-bar app color="primary" dark>
      <!-- Botón de menú -->
      <v-app-bar-nav-icon @click="fab = !fab" />

      <!-- Títulos -->
      <v-toolbar-title>
        <v-btn to="/paginaprincipal" text>Supportly</v-btn>
      </v-toolbar-title>
      <v-toolbar-title>
        <v-btn to="/iniciarSessio" text>SignIn</v-btn>
      </v-toolbar-title>

      <!-- Espaciador -->

      <!-- Botones de navegación -->
      <v-btn to="/incidencies">
        <v-icon>mdi-alert-circle-outline</v-icon>
        Incidencies
      </v-btn>
      <v-btn to="/usuaris">
        <v-icon>mdi-school</v-icon>
        Alumnes
      </v-btn>
    </v-app-bar>

    <!-- Contenedor para el botón y el Speed Dial -->
    <div style="position: relative; display: inline-block; margin-top: 20px;">
      <!-- Activador del Speed Dial -->
      <v-btn icon @click="fab = !fab">
        <v-icon>mdi-menu</v-icon>
      </v-btn>

      <!-- Speed Dial -->
      <v-speed-dial v-model="fab" transition="fade-transition">
        <v-btn @click="viewAccount" icon>
          <v-icon>mdi-account</v-icon>
        </v-btn>
        <v-btn @click="logout" icon>
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </v-speed-dial>
    </div>
  </v-app>
</template>

<script setup>
import { ref } from "vue";

// Variables reactivas
const fab = ref(false); // Controla el estado del Speed Dial

// Métodos
const viewAccount = () => {
  alert("Mostrando información de la cuenta");
};

const logout = () => {
  alert("Cerrando sesión");
  // Aquí puedes implementar la lógica para cerrar sesión
};
</script>

<style scoped>
/* Ajuste del contenedor principal */
html,
body,
#app {
  margin: 0;
  padding: 0;
  height: 100%;
}

.v-app-bar {
  position: fixed;
  top: 0;
  z-index: 10;
}

.v-speed-dial {
  position: absolute;
  top: 50px; /* Ajusta esta posición según el diseño */
  left: 0;
}
</style>
