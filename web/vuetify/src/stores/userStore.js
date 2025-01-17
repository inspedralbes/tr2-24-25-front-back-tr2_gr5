// stores/userStore.js

import { defineStore } from 'pinia';

export const useUserStore = defineStore('userStore', {
  state: () => ({
    user: null, // Información del usuario (null si no está autenticado)
  }),
  getters: {
    isAuthenticated: (state) => !!state.user, // Devuelve true si el usuario está autenticado
  },
  actions: {
    login(userData) {
      // Guarda los datos del usuario en el estado
      this.user = userData;
    },
    logout() {
      // Limpia el estado del usuario al cerrar sesión
      this.user = null;
    },
  },
  persist: true, // Activamos la persistencia para esta tienda
});
