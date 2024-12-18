<template>
  <v-app-bar id="tabla" app>
    <!-- Menú desplegable -->
    <v-app-bar-nav-icon @click="drawer = !drawer" />

    <!-- Título de la barra -->
    <v-toolbar-title>
      <v-btn to="/paginaprincipal" text>Supportly</v-btn>
    </v-toolbar-title>

    <!-- Botón de inicio de sesión -->
    <v-toolbar-title>
      <v-btn to="/iniciarSessio" text>SignIn</v-btn>
    </v-toolbar-title>

    <!-- Espaciador -->
    <v-spacer></v-spacer>

    <!-- Botones de navegación -->
    <v-layout class="overflow-visible" style="height: 56px">
      <v-bottom-navigation v-model="value" class="options" grow rounded="lg">
        <v-btn to="/incidencies">
          <v-icon>mdi-alert-circle-outline</v-icon>
          Incidencies
        </v-btn>
        <v-btn to="/usuaris">
          <v-icon>mdi-school</v-icon>
          Alumnes
        </v-btn>
      </v-bottom-navigation>
    </v-layout>
    
    <!-- Menú lateral -->
    <v-navigation-drawer v-model="drawer" app>
      <v-btn>home</v-btn>
  <v-list dense>
    <v-list-item>
      <v-list-item-icon>
        <v-icon>mdi-home</v-icon>
      </v-list-item-icon>
      <v-list-item-title>Inicio</v-list-item-title>
    </v-list-item>
  </v-list>
</v-navigation-drawer>
  </v-app-bar>
</template>

<script setup>
import { ref } from "vue";

const drawer = ref(false); // Controla la visibilidad del menú lateral
const value = ref(0); // Controla el estado del bottom-navigation
</script>

<style scoped>
#tabla {
  z-index: 2; /* Asegura que la barra esté encima del contenido */
}

.options {
  background-color: transparent;
}
</style>
