<template>
    <div class="container">
      <h2>Recuperar Contraseña</h2>
      <form @submit.prevent="resetPassword">
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
  
        <button type="submit">Restablecer Contraseña</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: ''
      };
    },
    methods: {
      resetPassword() {
        // Aquí puedes agregar la lógica para manejar el restablecimiento
        console.log('Correo electrónico enviado:', this.email);
      }
    }
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 400px;
    margin: 0 auto;
    padding: 1em;
    background-color: #3f3e3e;
    border-radius: 8px;
    margin-top: 10rem;
    align-items: center;
    text-align: center;
    
  }
  
  .form-group {
    margin-bottom: 1em;
  }
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    margin-top: 2rem;
    color: #f9f9f9;
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
    margin-top: 3rem;
    
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>
  