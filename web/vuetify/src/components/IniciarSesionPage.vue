<template>
    <v-container fluid class="d-flex align-center justify-center fill-height background-image">
      <v-card class="pa-5" min-width="700" min-height="500" max-width="1000" elevation="12">
        <v-card-title class="text-h5 text-center mb-10">INICIEU SESSIÓ AL VOSTRE COMPTE</v-card-title>
        <v-card-text>

        <v-card-actions class="">
            <v-text class="text-h5"> No tens un compte encara? </v-text>
          <v-btn text @click="goToRegister" class="my-12">Regístrate</v-btn>
        </v-card-actions>

          <v-form>
            <v-text-field 
              v-model="email" 
              label="Correo Electrónico" 
              type="email" 
              required 
              outlined 
            >
            <template #prepend>
                <v-icon>mdi-email</v-icon>
            </template>
        </v-text-field>
            <v-text-field 
              v-model="password" 
              label="Contraseña" 
              type="password" 
              required 
              outlined 
            >
            <template #prepend>
                <v-icon>mdi-lock</v-icon>
            </template>
        </v-text-field>
            <v-btn 
              :disabled="!email || !password" 
              color="primary" 
              block 
              class="mt-4"
              @click="login"
            >
              Iniciar Sesión
            </v-btn>
            <v-btn text block class="mt-2" @click="forgotPassword">
              ¿Olvidaste tu contraseña?
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: '',
        password: '',
      };
    },
    methods: {
      login() {
        // Lógica para iniciar sesión
        alert(`Iniciando sesión con ${this.email}`);
      },
      forgotPassword() {
        // Lógica para recuperar la contraseña
        alert('Recuperar contraseña');
      },
      goToRegister() {
        // Lógica para redirigir al registro
        alert('Redirigiendo al registro');
      },
    },
  };
  </script>
  
  <style scoped>
  .fill-height {
    height: 100vh;
  }
  
  .background-image {
    background: url('https://via.placeholder.com/1920x1080') no-repeat center center;
    background-size: cover;
  }
  </style>