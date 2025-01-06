<template>
  <v-container>
    <!-- Pestañas -->
    <v-tabs v-model="activeTab">
      <v-tab v-for="tab in tabs" :key="tab.value" :value="tab.value" class="custom-tab">
        {{ tab.label }}
      </v-tab>
    </v-tabs>

    <!-- Contenido de las pestañas -->
    <v-container>
      <v-row>
        <v-col v-for="(usuari, index) in filteredData" :key="usuari.id_usuari" cols="6">
          <v-expansion-panels class="mx-auto w-75">
            <v-expansion-panel :class="getCardClass(usuari.tipus)" class="mx-auto w-50">
              <v-expansion-panel-title class="text-h6 dense">{{ usuari.nom }}</v-expansion-panel-title>
              <hr>
              <v-expansion-panel-text><v-icon icon="mdi-email" color="green-darken-2"></v-icon> {{ usuari.correu_alumne }}</v-expansion-panel-text>
              <v-expansion-panel-text><v-icon icon="mdi-email" color="blue-darken-2"></v-icon> {{ usuari.correu_profe }}</v-expansion-panel-text>
              <v-expansion-panel-text><v-icon icon="mdi-email"></v-icon> {{ usuari.correu_tutor }}</v-expansion-panel-text>
              <v-expansion-panel-text><v-icon icon="mdi-phone"></v-icon> {{ usuari.telefon }}</v-expansion-panel-text>
              <v-btn @click="confirmDelete(usuari.id_usuari)" color="red" class="mx-5 my-2 text" style="min-width: 14px; font-size: 11px; height: 28px;">
                Eliminar
              </v-btn>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
      </v-row>
    </v-container>
  </v-container>

  <!-- Confirmar eliminación -->
  <v-dialog v-model="dialog" max-width="500">
    <v-card>
      <v-card-title class="headline">Confirmar Eliminación</v-card-title>
      <v-card-text>
        ¿Deseas eliminar esta petición?
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="dialog = false">Volver atrás</v-btn>
        <v-btn color="red darken-1" text @click="deleteUsuarisHandler">Eliminar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useUserStore } from '@/stores/userStore'; // Importamos el store
import { deleteUsuaris, getUsuaris } from '@/services/communicationmanager';

// Usamos el store para obtener el correo del profesor autenticado
const data = ref([]);
const userStore = useUserStore();
const activeTab = ref('tots');
const selectedUsuariId = ref(null);
const dialog = ref(false);

const tabs = [
  { label: 'Alumno', value: "alum" },
  { label: 'Mentor', value: "ment" },
  { label: 'Tots', value: "tots" },
];

// Cargar los usuarios desde el servicio


const loadUsuaris = async () => {
  try {
    data.value = await getUsuaris();
  } catch (e) {
    console.error('Error al cargar usuarios:', e);
  }
  console.log(userStore.user)
};

// Computed para filtrar usuarios según el correo del profesor y la pestaña activa
const filteredData = computed(() => {
  if (!userStore.user?.email) {
    console.error("No se encontró el email del profesor en el estado.");
    return [];
  }

  console.log("Filtrando usuarios con email del profesor:", userStore.user.email);

  // Lógica para filtrar
  return activeTab.value === 'tots'
    ? data.value.filter(
        usuari =>
          usuari.correu_profe === userStore.user.email &&
          (usuari.tipus === 'alum' || usuari.tipus === 'ment') // Solo alumnos y mentores
      )
    : data.value.filter(
        usuari =>
          usuari.correu_profe === userStore.user.email &&
          usuari.tipus === activeTab.value
      );
});

// Acción de eliminar
const confirmDelete = (id) => {
  selectedUsuariId.value = id;
  dialog.value = true;
  console.log(`Eliminar usuario con ID: ${id}`);
};

// Clase de tarjeta según el tipo
const getCardClass = (tipus) => {
  switch (tipus) {
    case 'alum':
      return 'bg-white';
    case 'prof':
      return 'bg-yellow';
    case 'ment':
      return 'bg-blue';
    case 'tots':
      return 'bg-red';
    default:
      return '';
  }
};

// Eliminar usuario
const deleteUsuarisHandler = async () => {
  try {
    await deleteUsuaris(selectedUsuariId.value);
    data.value = data.value.filter(user => user.id_usuari !== selectedUsuariId.value); // Eliminamos el usuario localmente
    dialog.value = false;
  } catch (error) {
    console.error("Error al eliminar la petición:", error);
    alert("No se pudo eliminar la petición.");
  }
};

// Cargar usuarios cuando se monta el componente
onMounted(() => {
  loadUsuaris();
});
</script>

<style scoped>
.custom-tab {
  min-width: 2000px;
}
</style>
