<template>
    <div class="container">
      <h2>Restaurar Contraseña</h2>
      <form @submit.prevent="submitNewPassword">
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
        </div>
        <button type="submit">Actualizar Contraseña</button>
      </form>
      <p v-if="message">{{ message }}</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        newPassword: '',
        confirmPassword: '',
        message: '',
      };
    },
    methods: {
      async submitNewPassword() {
        if (this.newPassword !== this.confirmPassword) {
          this.message = 'Las contraseñas no coinciden.';
          return;
        }
  
        try {
          const email = this.$route.query.email; // Obtener el correo desde la URL
          const response = await fetch('http://localhost:3000/restaurarContraProf', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email,
              newPassword: this.newPassword,
            }),
          });
  
          if (!response.ok) {
            throw new Error('Error al actualizar la contraseña.');
          }
  
          this.message = 'Contraseña actualizada con éxito.';
        } catch (error) {
          this.message = error.message;
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
    background-color: #f4f4f4;
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
    margin-top: 1rem;
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
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  p {
    margin-top: 1rem;
    color: green;
  }
  </style>
  