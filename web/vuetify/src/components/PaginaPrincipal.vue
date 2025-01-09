<template>
    <v-container>
      <!-- Indicador de cantidad de notificaciones -->
      <v-alert
        v-if="userStore.user && notificationsCount > 0"
        type="info"
        dismissible
        class="mb-4"
      >
        Tienes {{ notificationsCount }} notificación(es) de mentor(es) pendiente(s).
      </v-alert>
      <v-alert
        v-else-if="!userStore.user"
        type="warning"
        dismissible
        class="mb-4"
      >
        Inicia sesión para ver las notificaciones de mentores pendientes.
      </v-alert>
  
      <!-- Switch para activar/desactivar las notificaciones -->
      <v-switch
        v-model="notificationsEnabled"
        :disabled="!userStore.user"
        label="Mostrar notificaciones de mentores"
        class="mb-0"
      />
  
      <!-- Lista de notificaciones -->
      <v-expand-transition>
        <v-card v-if="notificationsEnabled && userStore.user">
          <v-card-title>
            <h3>Notificaciones de Mentores</h3>
          </v-card-title>
  
          <v-card-text>
            <!-- Mostrar solo el nombre y un ícono -->
            <div
              v-for="mentor in filteredMentores"
              :key="mentor.id_usuari"
              class="d-flex align-center mb-3"
            >
              <v-icon color="blue" class="mr-3">mdi-account-school</v-icon>
              <p>
                Tienes una notificación de <strong>{{ mentor.nom }} {{ mentor.cognom }}</strong>.
              </p>
            </div>
          </v-card-text>
        </v-card>
      </v-expand-transition>
  
      <!-- Snackbar para mensajes -->
      <v-snackbar
        v-model="snackbar.show"
        :timeout="3000"
        location="bottom center"
        color="primary"
      >
        {{ snackbar.message }}
        <template #actions>
          <v-btn text @click="snackbar.show = false">Cerrar</v-btn>
        </template>
      </v-snackbar>
    </v-container>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from "vue";
  import { getMentoresPendientes, validarMentor } from "@/services/communicationmanager";
  import { useUserStore } from "@/stores/userStore"; // Importar el store de usuario
  
  const mentores = ref([]);
  const snackbar = ref({
    show: false,
    message: "",
  });
  const notificationsEnabled = ref(false); // Controla si las notificaciones están activadas
  
  // Accedemos al correo del profesor desde Pinia
  const userStore = useUserStore();
  const userEmail = computed(() => userStore.user?.email || "");
  
  // Filtrar mentores basándonos en el correo del profesor
  const filteredMentores = computed(() => {
    if (!userStore.user) return []; // Si no hay usuario, no hay mentores
    return mentores.value.filter((mentor) => mentor.correu_profe === userEmail.value);
  });
  
  // Obtener la lista de mentores pendientes
  const obtenerMentores = async () => {
    try {
      mentores.value = await getMentoresPendientes();
    } catch (error) {
      console.error("Error al obtener mentores:", error);
    }
  };
  
  // Validar o rechazar mentor
  const validarmentor = async (mentorId, validado) => {
    try {
      const result = await validarMentor(mentorId, validado);
      snackbar.value.message = result.message;
      snackbar.value.show = true;
      obtenerMentores(); // Refrescar la lista después de la validación
    } catch (error) {
      console.error("Error al validar mentor:", error);
      snackbar.value.message = "Error al validar mentor.";
      snackbar.value.show = true;
    }
  };
  
  // Calcular cuántas notificaciones de mentores pendientes hay
  const notificationsCount = computed(() => filteredMentores.value.length);
  
  // Cargar los mentores pendientes al montar el componente
  onMounted(() => {
    obtenerMentores();
  });
  </script>
  
  <style scoped>
  .v-btn {
    margin-right: 10px;
  }
  
  .v-switch {
    margin-top: 10px;
  }
  
  .d-flex {
    display: flex;
    align-items: center;
  }
  </style>
  