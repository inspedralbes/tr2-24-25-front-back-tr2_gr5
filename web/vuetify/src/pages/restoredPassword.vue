<template>
  <div class="container">
    <h2>Restaurar Contraseña</h2>
    <form @submit.prevent="submitNewPassword">
      <div class="form-group">
        <label for="email">Correo Electrónico:</label>
        <input
          type="email"
          id="email"
          v-model="email"
          required
          placeholder="Introduce tu correo electrónico"
        />
      </div>
      <div class="form-group">
        <label for="newPassword">Nueva Contraseña:</label>
        <input
          type="password"
          id="newPassword"
          v-model="newPassword"
          required
          placeholder="Introduce tu nueva contraseña"
        />
      </div>
      <div class="form-group">
        <label for="confirmPassword">Confirmar Contraseña:</label>
        <input
          type="password"
          id="confirmPassword"
          v-model="confirmPassword"
          required
          placeholder="Confirma tu nueva contraseña"
        />
        <p v-if="passwordMismatch" class="error-message">Las contraseñas no coinciden.</p>
      </div>
      <button type="submit" :disabled="passwordMismatch">Actualizar Contraseña</button>
    </form>
    <p v-if="message" :class="success ? 'success-message' : 'error-message'">{{ message }}</p>

    <!-- Snackbar -->
    <div v-if="showSnackbar" class="snackbar">{{ snackbarMessage }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      newPassword: '',
      confirmPassword: '',
      message: '',
      success: false,
      showSnackbar: false, // Controla la visibilidad del Snackbar
      snackbarMessage: '', // Contenido del mensaje del Snackbar
    };
  },
  computed: {
    passwordMismatch() {
      return this.newPassword && this.confirmPassword && this.newPassword !== this.confirmPassword;
    },
  },
  methods: {
    async submitNewPassword() {
      if (this.passwordMismatch) {
        this.message = 'Las contraseñas no coinciden.';
        this.success = false;
        return;
      }

      try {
        const response = await fetch('http://localhost:3000/restaurarContraProf', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            correu_profe: this.email,
            nova_contrasenya: this.newPassword,
            confirmar_contrasenya: this.confirmPassword,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Error al actualizar la contraseña.');
        }

  
        // Mostrar el Snackbar
        this.snackbarMessage = 'Contraseña actualizada con éxito.';
        this.showSnackbar = true;

        // Redirigir después de 2 segundos
        setTimeout(() => {
          this.showSnackbar = false;
          this.$router.push('/');
        }, 2000);
      } catch (error) {
        this.message = `Error: ${error.message}`;
        this.success = false;

        // Mostrar el Snackbar con el mensaje de error
        this.snackbarMessage = `Error: ${error.message}`;
        this.showSnackbar = true;

      }
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 400px;
  margin: 0 auto;
  padding: 1em;
  background-color: #292727;
  border-radius: 8px;
  margin-top: 15rem;
  text-align: center;
}

.form-group {
  margin-bottom: 1em;
}

label {
  display: block;
  margin-bottom: 0.5em;
  margin-top: 2.5rem;
}

input {
  width: 100%;
  padding: 0.8em;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 0.8em 1.5em;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 2rem;
}

button:hover {
  background-color: #0056b3;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

p {
  margin-top: 1rem;
}

.success-message {
  color: green;
}

.error-message {
  color: red;
}

/* Snackbar Styles */
.snackbar {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #333;
  color: #fff;
  padding: 1em;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  animation: fadeInOut 3s;
}

@keyframes fadeInOut {
  0% {
    opacity: 0;
    transform: translateX(-50%) translateY(10px);
  }
  10%,
  90% {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateX(-50%) translateY(10px);
  }
}
</style>
