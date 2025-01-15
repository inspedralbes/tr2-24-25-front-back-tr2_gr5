<template>
  <v-container>
    <h2 class="text-center mb-5">Sol·licituds Pendents d'Alumnes</h2>
    <v-timeline>
      <v-timeline-item
        v-for="mentor in filteredMentores"
        :key="mentor.id_usuari"
        color="blue"
        class="timeline-item"
      >
        <template v-slot:opposite>
          <v-avatar size="48" color="blue">
            <span class="text-white">{{ mentor.nom.charAt(0) }}</span>
          </v-avatar>
        </template>

        <template v-slot:icon>
          <v-icon size="32" color="blue">mdi-account</v-icon>
        </template>

        <v-card>
          <v-card-title>
            <div>
              <h3 class="mb-2">{{ mentor.nom }} {{ mentor.cognom }}</h3>
            </div>
          </v-card-title>
          <v-card-text>
            <p class="text-body-1">
              Este mentor está pendiente de validación. ¿Deseas aprobar o rechazar su solicitud?
            </p>
          </v-card-text>
          <v-card-actions>
            <v-btn color="green" outlined @click="validarmentor(mentor.id_usuari, true)">
              <v-icon left>mdi-check</v-icon> Validar
            </v-btn>
            <v-btn color="red" outlined @click="validarmentor(mentor.id_usuari, false)">
              <v-icon left>mdi-close</v-icon> Rechazar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-timeline-item>
    </v-timeline>

    <!-- Snackbar para mensajes -->
    <v-snackbar 
      v-model="snackbar.show" 
      :timeout="5000"
      location="bottom center" 
      color="primary"
      :multi-line="true" 
      transition="slide-x-reverse-transition"
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

// Accedemos al correo del profesor desde Pinia
const userStore = useUserStore();
const userEmail = computed(() => userStore.user?.email || "");

// Filtrar mentores basándonos en el correo del profesor
const filteredMentores = computed(() => {
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

// Cargar los mentores pendientes al montar el componente
onMounted(() => {
  obtenerMentores();
});
</script>

<style scoped>
.timeline-item {
  margin-bottom: 20px;
}

.v-card {
  border: 1px solid #ccc;
  border-radius: 8px;
}

.v-btn {
  margin-right: 10px;
}
</style>
