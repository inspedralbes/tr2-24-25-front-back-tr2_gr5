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
  
        <button type="submit" :disabled="loading">
          {{ loading ? "Enviando..." : "Restablecer Contraseña" }}
        </button>
        <p v-if="message" :class="{ success: success, error: !success }">{{ message }}</p>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: "",
        loading: false,
        message: "",
        success: false
      };
    },
    methods: {
      async resetPassword() {
        this.loading = true;
        this.message = "";
        this.success = false;
  
        try {
          const response = await fetch("http://localhost:3000/peticioRestaurarContraProfes", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ correu_profe: this.email })
          });
  
          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText);
          }
  
          const data = await response.text();
          this.message = data; // Mensaje de éxito del servidor
          this.success = true;
        } catch (error) {
          this.message = error.message || "Error al enviar la solicitud.";
          this.success = false;
        } finally {
          this.loading = false;
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 400px;
    margin: 0 auto;
    padding: 1em;
    background-color: #272626;
    border-radius: 8px;
    margin-top: 15rem;
    text-align: center;
    color: #fff;
  }
  
  .form-group {
    margin-bottom: 1em;
  }
  
  label {
    display: block;
    margin-bottom: 0.5em;
    margin-top: 2rem;
  }
  
  input {
    width: 100%;
    padding: 0.8em;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 2rem;
  }
  
  button {
    padding: 0.8em 1.5em;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:disabled {
    background-color: #6c757d;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  p.success {
    color: #28a745;
    margin-top: 1rem;
  }
  
  p.error {
    color: #dc3545;
    margin-top: 1rem;
  }
  </style>
  