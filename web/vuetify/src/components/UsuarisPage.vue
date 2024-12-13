<template>
  <v-container>
    <!-- Barra de búsqueda -->
    <SearchBar
      label="Buscar por tipo de usuario"
      @update:search="updateSearchQuery"
    />

    <v-card
      v-for="usuari in filteredData"
      :key="usuari.id_usuari"
      class="my-5 ancho d-flex justify-space-between align-center"
      :title="usuari.nom"
      :subtitle="usuari.tipus"
      :class="getCardClass(usuari.tipus)"
      style="padding-right: 30px; padding-left: 16px"
    >
      <div>
        <v-btn @click="confirmDelete(usuari.id_usuari)" icon color="red">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { getUsuaris } from '@/services/communicationmanager';

const data = ref([]);
const searchQuery = ref('');
const deleteDialog = ref(false);
const selectedUsuariId = ref(null);

const loadUsuaris = async () => {
  try {
    data.value = await getUsuaris();
  } catch (e) {
    console.error('Error al cargar usuarios:', e);
  }
};

// Filtrar usuarios según el tipo
const filteredData = computed(() =>
  data.value.filter((usuari) =>
    usuari.tipus.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
);

const updateSearchQuery = (query) => {
  searchQuery.value = query;
};

const confirmDelete = (id) => {
  selectedUsuariId.value = id;
  deleteDialog.value = true;
};

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


onMounted(() => {
  loadUsuaris();
});
</script>
<style scoped>
.bg-green {
  background-color: #e8f5e9; /* Verde claro */
}

.bg-yellow {
  background-color: #c9dd11; /* Rojo claro */
}

.bg-blue {
  background-color: #0fafe0; /* Azul claro */
}
</style>