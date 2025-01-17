<template>
    <v-container>
      <h2 class="text-center mb-5">Gestión de Usuarios</h2>
      <v-card class="pa-5 mx-auto" max-width="500">
        <v-card-title>
          <h3>Acciones para el Usuario</h3>
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="userId"
            label="ID del Usuario"
            placeholder="Ingresa el ID del usuario"
            outlined
            dense
            clearable
          />
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="validarTutorLegal">
            <v-icon left>mdi-check</v-icon> Validar Tutor Legal
          </v-btn>
          <v-btn color="error" @click="eliminarUsuario">
            <v-icon left>mdi-delete</v-icon> Eliminar Usuario
          </v-btn>
        </v-card-actions>
      </v-card>
  
      <!-- Snackbar para mensajes -->
      <v-snackbar 
        v-model="snackbar.show" 
        :timeout="5000" 
        location="bottom center" 
        color="primary"
        :multi-line="true"
      >
        {{ snackbar.message }}
        <template #actions>
          <v-btn text @click="snackbar.show = false">Cerrar</v-btn>
        </template>
      </v-snackbar>
    </v-container>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { validarTutorLegal, deleteUsuaris } from "@/services/communicationmanager";
  
  const userId = ref("");
  const snackbar = ref({
    show: false,
    message: "",
  });
  
  // Validar tutor legal
  const validarTutorLegal1 = async () => {
    if (!userId.value) {
      snackbar.value.message = "Por favor, ingresa un ID de usuario.";
      snackbar.value.show = true;
      return;
    }
  
    try {
      const result = await validarTutorLegal(userId.value);
      snackbar.value.message = result.message;
      snackbar.value.show = true;
    } catch (error) {
      console.error("Error al validar tutor legal:", error);
      snackbar.value.message = "Error al validar tutor legal.";
      snackbar.value.show = true;
    }
  };
  
  // Eliminar usuario
  const eliminarUsuario1 = async () => {
    if (!userId.value) {
      snackbar.value.message = "Por favor, ingresa un ID de usuario.";
      snackbar.value.show = true;
      return;
    }
  
    try {
      const result = await deleteUsuaris(userId.value);
      snackbar.value.message = result.message;
      snackbar.value.show = true;
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      snackbar.value.message = "Error al eliminar usuario.";
      snackbar.value.show = true;
    }
  };
  </script>
  
  <style scoped>
  .v-card {
    border: 1px solid #ccc;
    border-radius: 8px;
  }
  
  .v-btn {
    margin-right: 10px;
  }
  </style>