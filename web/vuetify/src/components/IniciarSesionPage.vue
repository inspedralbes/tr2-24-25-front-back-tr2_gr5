<template>
  <v-window v-model="window" fluid class="d-flex justify-center fill-height background-image rounded">
    <!-- Login Window Item -->


    <v-window-item value="0">
      <v-card class="pa-5" min-width="700" min-height="500" max-width="1000" elevation="12" rounded="xl">
        <v-card-title class="text-h4 mb-10 letra-gorda">LOGIN</v-card-title>
        <v-card-text>
          <v-card-actions>
            <v-text class="text-h5 letra-fuente">No tens un compte encara? </v-text>
            <v-btn text class="p-0 m-0 link-hover" @click="navigate(1)">
              Regístrate
            </v-btn>
          </v-card-actions>

          <v-form>
            <v-text-field v-model="name" label="Nom" type="name" required outlined>
              <template #prepend>
                <v-icon>mdi-account</v-icon>
              </template>
            </v-text-field>
            <v-text-field v-model="surname" label="Cognom" type="surname" required outlined>
              <template #prepend>
                <v-icon>mdi-account-details</v-icon>
              </template>
            </v-text-field>
            <v-text-field v-model="email" label="Correo Electrónico" type="email" required outlined>
              <template #prepend>
                <v-icon>mdi-email</v-icon>
              </template>
            </v-text-field>
            <v-text-field v-model="password" label="Contraseña" type="password" required outlined>
              <template #prepend>
                <v-icon>mdi-lock</v-icon>
              </template>
            </v-text-field>
            <v-btn :disabled="!email || !password || !name || !surname" color="primary" block class="mt-4" @click="login">
              Iniciar Sesión
            </v-btn>
            <v-btn text block class="mt-2" @click="forgotPassword">
              ¿Olvidaste tu contraseña?
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-window-item>

    <!-- Register Window Item -->
    <v-window-item value="1">
      <v-btn text class="p-0 m-0 link-hover" @click="navigate(-1)">
      ← Volver al Login
    </v-btn>
      <v-card class="pa-5" min-width="700" min-height="500" max-width="1000" elevation="12" rounded="xl">
        <v-card-title class="text-h4 mb-10 letra-gorda">REGISTRO</v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field v-model="newEmail" label="Correo Electrónico" type="email" required outlined>
              <template #prepend>
                <v-icon>mdi-email</v-icon>
              </template>
            </v-text-field>
            <v-text-field v-model="newPassword" label="Contraseña" type="password" required outlined>
              <template #prepend>
                <v-icon>mdi-lock</v-icon>
              </template>
            </v-text-field>
            <v-text-field v-model="confirmPassword" label="Confirmar Contraseña" type="password" required outlined>
              <template #prepend>
                <v-icon>mdi-lock</v-icon>
              </template>
            </v-text-field>
            <v-btn :disabled="!newUser ||!newEmail || !newPassword || newPassword !== confirmPassword" color="primary" block
              class="mt-4" @click="register">
              Registrar
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-window-item>
  </v-window>
</template>

<script setup>
import { ref } from 'vue';

// Variables reactivas
const email = ref('');
const password = ref('');
const window = ref(0);  // 0: Login, 1: Register
const newName = ref('');
const newSurname = ref('')
const newEmail = ref('');
const newPassword = ref('');
const confirmPassword = ref('');


// Métodos
const login = () => {
  alert(`Iniciando sesión con ${email.value}`);
};

const forgotPassword = () => {
  alert('Recuperar contraseña');
};

const navigate = (step) => {
  window.value += step;
  console.log('Current window:', window.value);
};



const register = () => {
  if (newPassword.value === confirmPassword.value) {
    alert(`Registrando cuenta con ${newEmail.value}`);
    // Aquí iría la lógica para registrar al usuario
  } else {
    alert('Las contraseñas no coinciden');
  }
};
</script>

<style scoped>
.fill-height {
  height: 100vh;
}

.letra-fuente {
  font-family: 'Arial', sans-serif;
}

.letra-gorda {
  font-weight: bold;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

.background-image {
  background: url('https://via.placeholder.com/1920x1080') no-repeat center center;
  background-size: cover;
}

/* Estilo para el texto clickeable */
.link-hover {
  color: rgba(73, 147, 222, 0.6); /* Azul transparente inicial */
  cursor: pointer;
  transition: color 0.3s ease; /* Animación suave al cambiar de color */
}

.link-hover:hover {
  color: #2196F3; /* Azul más oscuro al pasar el ratón */
  text-decoration: none; /* Elimina el subrayado al pasar el ratón */
  text-decoration: underline;
}
</style>
