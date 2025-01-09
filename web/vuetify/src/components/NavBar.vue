<template>
  <!-- Barra superior -->
  <v-app-bar app color="primary" dark>
    <!-- Botón de menú -->
    <v-app-bar-nav-icon @click="fab = !fab" />

    <!-- Títulos -->
    <v-toolbar-title>
      <!-- Botón con badge para notificaciones -->
      <div class="badge-container">
        <v-btn to="/home" text>
          Supportly
        </v-btn>
        <!-- Badge para mostrar notificaciones de mentores pendientes -->
        <v-badge
          v-if="filteredMentores.length > 0"
          :content="filteredMentores.length"
          color="red"
          overlap
          class="notification-badge"
        >
        </v-badge>
      </div>
    </v-toolbar-title>

    <!-- Botones de navegación -->
    <v-btn to="/applicationMent">
      <v-icon>mdi-account-school</v-icon>
      Mentors
    </v-btn>
    <v-btn to="/incidences">
      <v-icon>mdi-alert-circle-outline</v-icon>
      Incidències
    </v-btn>
    <v-btn to="/users">
      <v-icon>mdi-school</v-icon>
      Alumnes
    </v-btn>
  </v-app-bar>

  <!-- Navigation Drawer -->
  <v-navigation-drawer v-model="fab" app temporary>
    <v-list>
      <v-list-item @click="viewAccount">
        <v-list-item-icon>
          <v-icon>mdi-account</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Mi Cuenta</v-list-item-title>
      </v-list-item>
      <v-list-item @click="handleAuthAction">
        <v-list-item-icon>
          <v-icon>{{ userStore.isAuthenticated ? 'mdi-logout' : 'mdi-login' }}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{ userStore.isAuthenticated ? "Cerrar sesión" : "Iniciar sesión" }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { getMentoresPendientes } from "@/services/communicationmanager";
import { useUserStore } from "@/stores/userStore"; // Importar la tienda de usuarios
import { useRouter } from "vue-router"; // Importar el router para redirección

// Variables reactivas
const fab = ref(false); // Controla el estado del Navigation Drawer
const mentores = ref([]); // Lista de mentores pendientes

// Obtener la tienda de usuarios
const userStore = useUserStore();
const router = useRouter(); // Instancia de router para redirecciones

// Filtrar mentores según el correo del profesor
const filteredMentores = computed(() => {
  if (!userStore.user?.email) return [];
  return mentores.value.filter(mentor => mentor.correu_profe === userStore.user.email);
});

// Método para manejar la acción del botón (iniciar sesión o cerrar sesión)
const handleAuthAction = () => {
  if (userStore.isAuthenticated) {
    userStore.logout();
    alert("Cerrando sesión");
  } else {
    alert("Redirigiendo a iniciar sesión");
    router.push("/"); // Redirige al componente de inicio de sesión
  }
};

// Cargar mentores pendientes al montar el componente
const fetchMentoresPendientes = async () => {
  try {
    mentores.value = await getMentoresPendientes();
  } catch (error) {
    console.error("Error al cargar los mentores pendientes:", error);
  }
};

// Montar el componente
onMounted(() => {
  fetchMentoresPendientes();
});
</script>

<style scoped>
/* Asegura que el contenedor tenga una posición relativa */
.badge-container {
  position: relative;
  display: inline-block;
}

/* Posiciona el badge en la esquina superior derecha */
.notification-badge {
  position: absolute;
  top: 9px;
  right: 6px;
  z-index: 1;
}
</style>
