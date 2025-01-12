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
      <v-list-item>
        <v-list-item-icon>
          <v-icon>mdi-account</v-icon>
        </v-list-item-icon>
        <v-list-item-title class="user-email">{{ userStore.user?.email || "Inicia Sesión para ver el usuario" }}</v-list-item-title>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item @click="handleAuthAction">
        <v-list-item-icon>
          <v-icon>{{ userStore.isAuthenticated ? 'mdi-logout' : 'mdi-login' }}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{ userStore.isAuthenticated ? "Cerrar sesión" : "Iniciar sesión" }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>

  <!-- Snackbar para mensajes -->
  <v-snackbar v-model="snackbar.show" :timeout="snackbar.timeout" top>
    {{ snackbar.message }}
    <template v-slot:action="{ attrs }">
      <v-btn color="red" text v-bind="attrs" @click="snackbar.show = false">
        Cerrar
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { getMentoresPendientes } from "@/services/communicationmanager";
import { useUserStore } from "@/stores/userStore";
import { useRouter } from "vue-router";
import { red } from "vuetify/util/colors";

// Variables reactivas
const fab = ref(false);
const mentores = ref([]);
const snackbar = ref({
  show: false,
  message: "",
  timeout: 3000,
});
const budget = ref(false);

const userStore = useUserStore();
const router = useRouter();

// Filtrar mentores según el correo del profesor
const filteredMentores = computed(() => {
  if (!userStore.user?.email) return [];
  return mentores.value.filter(
    (mentor) => mentor.correu_profe === userStore.user.email
  );
});

// Método para manejar la acción del botón (iniciar sesión o cerrar sesión)
const handleAuthAction = () => {
  if (userStore.isAuthenticated) {
    userStore.logout();
    snackbar.value = {
      show: true,
      message: "Sesión Cerrada",
      timeout: 5000,
    };
  } else {
    snackbar.value = {
      show: true,
      message: "Redirigiendo a iniciar sesión",
      timeout: 3000,
    };
    router.push("/");
  }
};

// Cargar mentores pendientes al montar el componente
const fetchMentoresPendientes = async () => {
  try {
    mentores.value = await getMentoresPendientes();
    if (filteredMentores.value.length === 0) {
      snackbar.value = {
        show: true,
        message: "No hay solicitudes de Mentores disponibles",
        timeout: 5000,
      };
    }
  } catch (error) {
    snackbar.value = {
      show: true,
      message: "Error al cargar los mentores pendientes",
      timeout: 3000,
    };
  }
};

// Manejar el estado de budget
const toggleBudget = () => {
  if (!budget.value) {
    snackbar.value = {
      show: true,
      message: "No hay notificaciones disponibles",
      timeout: 3000,
    };
  }
  budget.value = !budget.value;
};

// Montar el componente
onMounted(() => {
  fetchMentoresPendientes();
});
</script>

<style scoped>
.badge-container {
  position: relative;
  display: inline-block;
}

.notification-badge {
  position: absolute;
  top: 9px;
  right: 6px;
  z-index: 1;
  margin-bottom: 5rem;
}

.user-email {
  font-weight: bold;
  font-size: 14px;
  color: #4caf50;
}
</style>
