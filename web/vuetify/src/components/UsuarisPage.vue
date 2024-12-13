<template>
  <v-container>
    <!-- Pestañas -->
    <v-tabs v-model="activeTab">
      <v-tab v-for="tab in tabs" :key="tab.value"  :value="tab.value">
        {{ tab.label }}
      </v-tab>
    </v-tabs>

    <!-- Contenido de las pestañas -->
    <v-container>
      <div v-for="usuari in filteredData" :key="usuari.id_usuari" class="my-5 ancho d-flex justify-space-between align-center">
        <div class="user-card" :class="getCardClass(usuari.tipus)">
          <div class="user-info">
            <h3>{{ usuari.nom }}</h3>
            <p>{{ usuari.tipus }}</p>
          </div>
          <v-btn @click="confirmDelete(usuari.id_usuari)" icon color="red">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
      </div>
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
      return 'bg-green';
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
</style>
