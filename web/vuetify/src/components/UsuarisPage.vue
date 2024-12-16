<template>
  <v-container>
    <!-- Pestañas -->
    <v-tabs v-model="activeTab">
      <v-tab v-for="tab in tabs" :key="tab.value"  :value="tab.value" class="custom-tab">
        {{ tab.label }}
      </v-tab>
    </v-tabs>

    <!-- Contenido de las pestañas -->
    <v-container class="">

      <v-row>
      <v-col v-for="(usuari, index) in filteredData" :key="usuari.id_usuari" cols="6">
      <v-expansion-panels v-for="usuari in filteredData" :key="usuari.id_usuari" class="my-5 mx-auto w-75">

        <v-expansion-panel  :class="getCardClass(usuari.tipus)" class=" mx-auto w-50">

            <v-expansion-panel-title class="text-h6 dense">{{ usuari.nom }}</v-expansion-panel-title>
            <div class="d-flex justify-end mt-2">
          
        </div>
            <v-expansion-panel-text> {{ usuari.tipus }} </v-expansion-panel-text>
            <v-expansion-panel-text> <b>Correu:</b> {{ usuari.correu_alumne }} </v-expansion-panel-text>
            <v-expansion-panel-text> {{ usuari.correu_profe }} </v-expansion-panel-text>
            <v-expansion-panel-text> {{ usuari.telefon }} </v-expansion-panel-text>
            <v-expansion-panel-text> {{ usuari.tipus }} </v-expansion-panel-text>
            <v-btn 
            @click="confirmDelete(usuari.id_usuari)" 
            color="red" 
            class="v-size-small mx-2 my-2 text"
          >
            Eliminar
          </v-btn>
          </v-expansion-panel>
        
      </v-expansion-panels>
    </v-col>
  </v-row>
    </v-container>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { getUsuaris } from '@/services/communicationmanager';

const data = ref([]);
const activeTab = ref('alum');
const tabs = [
  { label: 'Alumno', value: "alum"},
  { label: 'Profesor', value: "prof" },
  { label: 'Mentor', value: "ment" }
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
  data.value.filter((usuari) => usuari.tipus === activeTab.value)
);

// Acción de eliminar
const confirmDelete = (id) => {
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
    default:
      return '';
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
