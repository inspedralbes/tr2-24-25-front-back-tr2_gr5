<template>
  <v-app>
    <NavBar v-if="showNavBar"/>
    <v-main>
    <router-view />
  </v-main>
  </v-app>
</template>

<script>
import NavBar from '@/components/NavBar.vue';

export default {
  components: {
    NavBar,
  },
  computed: {
    showNavBar() {
      // Verifica si la ruta actual tiene la meta propiedad "hideNavBar"
      return !this.$route.meta.hideNavBar;
    },
  },
};
</script>

<style>
</style>
