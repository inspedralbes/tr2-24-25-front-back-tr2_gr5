<template>
  <v-container>
    <!-- Aviso si no hay usuario autenticado -->
    <v-alert
      v-if="!userStore.user"
      type="warning"
      dismissible
      class="mb-4"
    >
      Debes registrarte o iniciar sesión para poder acceder a los usuarios.
    </v-alert>

    <!-- Campo de búsqueda -->
    <v-text-field
      v-model="searchQuery"
      label="Buscar por nombre o apellido"
      append-icon="mdi-magnify"
      single-line
      hide-details
      class="mb-4"
      :disabled="!userStore.user"
    />

    <!-- Pestañas -->
    <v-card class="bordered-card">
      <v-tabs v-model="activeTab">
        <v-tab v-for="tab in tabs" :key="tab.value" :value="tab.value" class="custom-tab">
          {{ tab.label }}
        </v-tab>
      </v-tabs>

      <!-- Contenido de las pestañas -->
      <v-container>
        <v-row>
          <v-col v-for="(usuari, index) in filteredData" :key="usuari.id_usuari" cols="6">
            <v-card class="bordered-card w-75 mx-auto">
              <v-expansion-panels>
                <v-expansion-panel :class="getCardClass(usuari.tipus)" class="w-100">
                  <v-expansion-panel-title class="text-h6 dense">{{ usuari.nom }} {{ usuari.cognom }}</v-expansion-panel-title>
                  <hr>
                  <v-expansion-panel-text>
                    <v-icon icon="mdi-email" color="green-darken-2"></v-icon> {{ usuari.correu_alumne }}
                  </v-expansion-panel-text>
                  <v-expansion-panel-text>
                    <v-icon icon="mdi-email" color="blue-darken-2"></v-icon> {{ usuari.correu_profe }}
                  </v-expansion-panel-text>
                  <v-expansion-panel-text>
                    <v-icon icon="mdi-email"></v-icon> {{ usuari.correu_tutor }}
                  </v-expansion-panel-text>
                  <v-expansion-panel-text>
                    <v-icon icon="mdi-phone"></v-icon> {{ usuari.telefon }}
                  </v-expansion-panel-text>
                  <v-btn @click="confirmDelete(usuari.id_usuari)" color="red" class="mx-5 my-2 text" style="min-width: 14px; font-size: 11px; height: 28px;">
                    Eliminar
                  </v-btn>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>

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
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useUserStore } from '@/stores/userStore'; // Importamos el store
import { deleteUsuaris, getUsuaris } from '@/services/communicationmanager';
import socket from '@/services/socket';

// Variables y referencias
const data = ref([]);
const userStore = useUserStore();
const activeTab = ref('tots');
const selectedUsuariId = ref(null);
const dialog = ref(false);
const searchQuery = ref(''); // Variable para el filtro de búsqueda

const tabs = [
  { label: 'Alumno', value: "alum" },
  { label: 'Mentor', value: "ment" },
  { label: 'Tots', value: "tots" },
];

// Cargar usuarios desde el servicio
const loadUsuaris = async () => {
  try {
    data.value = await getUsuaris();
  } catch (e) {
    console.error('Error al cargar usuarios:', e);
  }
  console.log(userStore.user);
};


// Filtrar usuarios según el correo del profesor, la pestaña activa y la búsqueda
const filteredData = computed(() => {
  if (!userStore.user?.email) {
    console.error("No se encontró el email del profesor en el estado.");
    return [];
  }

  console.log("Filtrando usuarios con email del profesor:", userStore.user.email);

  return activeTab.value === 'tots'
    ? data.value.filter(
        usuari =>
          usuari.correu_profe === userStore.user.email &&
          (usuari.tipus === 'alum' || usuari.tipus === 'ment') &&
          (usuari.nom.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
           usuari.cognom.toLowerCase().includes(searchQuery.value.toLowerCase()))
      )
    : data.value.filter(
        usuari =>
          usuari.correu_profe === userStore.user.email &&
          usuari.tipus === activeTab.value &&
          (usuari.nom.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
           usuari.cognom.toLowerCase().includes(searchQuery.value.toLowerCase()))
      );
});

// Confirmar eliminación
const confirmDelete = (id) => {
  selectedUsuariId.value = id;
  dialog.value = true;
  console.log("Eliminar usuario con ID: ${id}");
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
    data.value = data.value.filter(user => user.id_usuari !== selectedUsuariId.value);
    dialog.value = false;
  } catch (error) {
    console.error("Error al eliminar la petición:", error);
    alert("No se pudo eliminar la petición.");
  }
};

// Cargar usuarios al montar el componente
onMounted(() => {
  loadUsuaris();
});

socket.on('usuaris', (usuarisData) => {
    console.log('Recibidos los usuarios:', usuarisData);
    data.value = usuarisData;  // Actualiza tu estado reactivamente
  });

</script>

<style scoped>
.custom-tab {
  min-width: 200px;
}

.bordered-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  box-shadow: none;
  margin-bottom: 20px;
}

.bordered-card:hover {
  border-color: #aaa;
}
</style>  