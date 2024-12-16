<template>
  <v-container>
    <!-- Pestañas -->
    <v-tabs v-model="activeTab">
      <v-tab v-for="tab in tabs" :key="tab.value"  :value="tab.value" class="custom-tab">
        {{ tab.label }}
      </v-tab>
    </v-tabs>

    <!-- Contenido de las pestañas -->
    <v-container>

      <v-row>
      <v-col v-for="(usuari, index) in filteredData" :key="usuari.id_usuari" cols="6">
      <v-expansion-panels class=" mx-auto w-75">
        <v-expansion-panel  :class="getCardClass(usuari.tipus)" class=" mx-auto w-50">
            <v-expansion-panel-title class="text-h6 dense">{{ usuari.nom }}</v-expansion-panel-title><hr>    
            <v-expansion-panel-text> <v-icon icon="mdi-email" color="green-darken-2"></v-icon> {{  usuari.correu_alumne }} </v-expansion-panel-text>
            <v-expansion-panel-text> <v-icon icon="mdi-email" color="blue-darken-2"></v-icon> {{  usuari.correu_profe }} </v-expansion-panel-text>
            <v-expansion-panel-text> <v-icon icon="mdi-email"></v-icon> {{  usuari.correu_tutor }} </v-expansion-panel-text>
            <v-expansion-panel-text> <v-icon icon="mdi-phone"></v-icon> {{ usuari.telefon }} </v-expansion-panel-text>
            <v-btn 
            @click="confirmDelete(usuari.id_usuari)" 
            color="red" 
            class="mx-5 my-2 text"
            style="min-width: 14px; font-size: 11px; height: 28px;"
          >
            Eliminar
          </v-btn>
          </v-expansion-panel> 
      </v-expansion-panels>
    </v-col>
  </v-row>
    </v-container>
  </v-container>


  <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title class="headline">Confirmar Eliminació</v-card-title>
        <v-card-text>
          Vols eliminar aquesta petició?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">Tornar enrera</v-btn>
          <v-btn color="red darken-1" text @click="deleteUsuarisHandler">Eliminar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { deleteUsuaris, getUsuaris } from '@/services/communicationmanager';

const data = ref([]);
const selectedUsuariId = ref(null);
const dialog = ref(false);
const activeTab = ref('tots');
const tabs = [
  { label: 'Alumno', value: "alum"},
  { label: 'Profesor', value: "prof" },
  { label: 'Mentor', value: "ment" },
  { label: 'Tots', value: "tots" },
];

// Carga de datos
const loadUsuaris = async () => {
  try {
    data.value = await getUsuaris();
  } catch (e) {
    console.error('Error al cargar usuarios:', e);
  }
};

// Computed para filtrar usuarios según el tipo seleccionado
const filteredData = computed(() =>
activeTab.value === 'tots'
? data.value
: data.value.filter((usuari) => usuari.tipus === activeTab.value)
);

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

const deleteUsuarisHandler = async () => {
  try {
    await deleteUsuaris(selectedUsuariId.value); 
    data.value = data.value.filter(data => data.id_usuari !== selectedUsuariId.value);
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
</script>

<style scoped>
.user-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
}

.bg-green {
  background-color: #e8f5e9; /* Verde claro */
}

.bg-yellow {
  background-color: #c9dd11; /* Amarillo claro */
}

.bg-blue {
  background-color: #0fafe0; /* Azul claro */
}

.custom-tab {
  min-width: 2000px; /* Cambia el tamaño según tus necesidades */
}
.custom-tabs {
  overflow-x: auto; /* Permite el desplazamiento horizontal si las pestañas se desbordan */
}
</style>
