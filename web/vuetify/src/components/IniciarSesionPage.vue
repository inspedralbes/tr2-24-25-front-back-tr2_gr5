<template>
  <v-window v-model="window" fluid class="d-flex justify-center fill-height background-image rounded">
    <!-- Login Window Item -->
    <v-window-item value="0">
      <v-card class="pa-5" min-width="700" min-height="500" max-width="1000" elevation="12" rounded="xl">
        <v-card-title class="text-h4 mb-10 letra-gorda">LOGIN</v-card-title>
        <v-card-text>
          <v-card-actions>
            <v-text class="text-h5 letra-fuente">No tens un compte encara?</v-text>
            <v-btn text class="p-0 m-0 link-hover" @click="navigate(1)">
              Regístrate
            </v-btn>
          </v-card-actions>
          <v-form>
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
            <v-btn :disabled="!email || !password" color="primary" block class="mt-4" @click="login">
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
      <v-card class="pa-5" min-width="700" min-height="500" max-width="1000" elevation="12" rounded="xl">
        <v-btn text class="p-0 m-0 link-hover" @click="navigate(-1)">
        ← Volver al Login
      </v-btn>
        <v-card-title class="text-h4 mb-10 letra-gorda">REGISTRO</v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field v-model="newName" label="Nombre" type="text" required outlined>
              <template #prepend>
                <v-icon>mdi-account</v-icon>
              </template>
            </v-text-field>
            <v-text-field v-model="newSurname" label="Apellido" type="text" required outlined>
              <template #prepend>
                <v-icon>mdi-account-details</v-icon>
              </template>
            </v-text-field>
            <v-text-field v-model="newEmail" label="Correo Electrónico" type="email" required outlined>
              <template #prepend>
                <v-icon>mdi-email</v-icon>
              </template>
            </v-text-field>
            <v-text-field v-model="newPassword" label="Contraseña" type="password" required outlined :error-messages="passwordError">
              <template #prepend>
                <v-icon>mdi-lock</v-icon>
              </template>
            </v-text-field>
            <v-text-field v-model="confirmPassword" label="Confirmar Contraseña" type="password" required outlined :error-messages="confirmPasswordError">
              <template #prepend>
                <v-icon>mdi-lock</v-icon>
              </template>
            </v-text-field>
            <v-btn :disabled="!newName || !newSurname || !newEmail || !newPassword || newPassword !== confirmPassword"
              color="primary" block class="mt-4" @click="register">
              Registrar
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-window-item>

    <!-- Snackbar para mostrar mensajes -->
    <v-snackbar v-model="snackbar.visible" :color="snackbar.color" :timeout="snackbar.timeout" top>
      {{ snackbar.text }}
    </v-snackbar>
  </v-window>
</template>

<script setup>
import { ref, computed } from 'vue';
import { registerProfessor, loginProfessor } from '@/services/communicationmanager';
import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'vue-router';

const router = useRouter();

// Variables reactivas
const email = ref('');
const password = ref('');
const userStore = useUserStore();
const window = ref(0); // 0: Login, 1: Register
const newName = ref('');
const newSurname = ref('');
const newEmail = ref('');
const newPassword = ref('');
const confirmPassword = ref('');

// Computed properties para validación
const passwordError = computed(() => {
  return newPassword.value && confirmPassword.value && newPassword.value !== confirmPassword.value
    ? 'Las contraseñas no coinciden'
    : '';
});

const confirmPasswordError = computed(() => {
  return newPassword.value && confirmPassword.value && newPassword.value !== confirmPassword.value
    ? 'Las contraseñas no coinciden'
    : '';
});

// Estado del snackbar
const snackbar = ref({
  visible: false,
  text: '',
  color: '',
  timeout: 3000,
});

const showSnackbar = (message, color) => {
  snackbar.value = {
    visible: true,
    text: message,
    color: color,
    timeout: 3000,
  };
};

// Métodos
const login = async () => {
  try {
    const response = await loginProfessor(email.value, password.value);

    if (response.user) {
      userStore.login({
        email: response.user.email,
        contrasenya: response.user.contrasenya,
      });
      showSnackbar('Inicio de sesión exitoso', 'success');
      router.push('/home');
    } else {
      showSnackbar('Datos incorrectos', 'error');
    }
  } catch (error) {
    showSnackbar(`Error al iniciar sesión: ${error.message}`, 'error');
  }
};

const forgotPassword = () => {
  router.push('/forgotpassword')
  showSnackbar('Recuperar contraseña', 'info');
};

const navigate = (step) => {
  window.value += step;
  console.log('Current window:', window.value);
};

const register = async () => {
  if (newPassword.value !== confirmPassword.value) {
    return;
  }

  try {
    const payload = {
      nom: newName.value,
      cognom: newSurname.value,
      correu_profe: newEmail.value,
      contrasenya: newPassword.value,
    };

    const result = await registerProfessor(payload);
    showSnackbar('Registro exitoso', 'success');
    navigate(-1);
  } catch (error) {
    showSnackbar(`Error durante el registro: ${error.message}`, 'error');
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

.v-card {
  margin-top: 10rem;
}

.background-image {
  background: url('https://via.placeholder.com/1920x1080') no-repeat center center;
  background-size: cover;
}

.link-hover {
  color: rgba(73, 147, 222, 0.6);
  cursor: pointer;
  transition: color 0.3s ease;
}

.link-hover:hover {
  color: #2196F3;
  text-decoration: underline;
}
</style>
