<template>
  <v-container>
    <!-- Aviso si no hay usuario autenticado -->
    <v-alert
      v-if="!userStore.user"
      type="warning"
      dismissible
      class="mb-4"
    >
      Debes registrarte o iniciar sesión para poder ver las incidencias.
    </v-alert>

    <!-- Buscador -->
    <v-text-field
      v-model="searchQuery"
      label="Buscar por nombre"
      outlined
      class="mb-4"
      :disabled="!userStore.user" 
    >
      <template v-slot:append>
        <v-icon>mdi-magnify</v-icon>
      </template>
    </v-text-field>

    <!-- Filtro por categoría -->
    <v-row class="d-flex flex-wrap ma-0" v-if="userStore.user">
      <v-chip
        v-for="categoria in categorias"
        :key="categoria.id_categoria"
        v-model="selectedCategories"
        :value="categoria.id_categoria"
        class="ma-0 mr-1 mb-1"
        :color="getCategoriaColor(categoria.id_categoria)"
        dark
        :input-value="selectedCategories.includes(categoria.id_categoria)"
        @click="toggleCategorySelection(categoria.id_categoria)"
      >
        <template v-slot:append>
          <v-icon v-if="selectedCategories.includes(categoria.id_categoria)">mdi-check</v-icon>
        </template>
        {{ categoria.nom }}
      </v-chip>
    </v-row>

    <!-- Separador visual -->
    <v-divider class="my-7" v-if="userStore.user"></v-divider>

    <!-- Título de la sección de peticiones -->
    <h3 class="mb-4 text-h5 font-weight-medium" v-if="userStore.user">Listado de Peticiones</h3>

    <!-- Tarjetas de peticiones -->
    <v-card
      v-for="peticio in filteredData"
      :key="peticio.id_peticio"
      class="my-5 ancho d-flex justify-space-between align-center"
      :title="peticio.nom_peticio"
      :subtitle="peticio.descripcio"
      style="padding-right: 30px; padding-left: 16px"
      v-if="userStore.user"
    >
      <v-row class="mt-2">
        <v-col cols="12">
          <v-chip
            class="ma-3"
            :color="getCategoriaColor(peticio.id_categoria)"
            dark
          >
            {{ getCategoriaNombre(peticio.id_categoria) }}
          </v-chip>
        </v-col>
      </v-row>

      <div class="d-flex">
        <div class="pr-3">
          <v-btn @click="toggleEditPeticioDialog(peticio)" icon color="primary">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </div>
        <div>
          <v-btn @click="confirmDelete(peticio.id_peticio)" icon color="red">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
      </div>
    </v-card>

    <!-- Confirmar eliminación -->
    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title class="headline">Confirmar Eliminació</v-card-title>
        <v-card-text>
          Vols eliminar aquesta petició?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">Tornar enrera</v-btn>
          <v-btn color="red darken-1" text @click="deletePeticioHandler">Eliminar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Editar petición -->
    <v-dialog v-model="editDialog" max-width="500">
      <v-card>
        <v-card-title class="headline">Editar Petició</v-card-title>
        <v-card-text>
          <v-text-field v-model="editedPeticio.nom_peticio" label="Nom Petició"></v-text-field>
          <v-text-field v-model="editedPeticio.descripcio" label="Descripció"></v-text-field>
          <v-text-field v-model="editedPeticio.id_usuari" label="ID Usuari" type="number"></v-text-field>
          <v-text-field v-model="editedPeticio.id_categoria" label="ID Categoria" type="number"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="saveEditPeticio">Guardar</v-btn>
          <v-btn color="red darken-1" text @click="editDialog = false">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { getPeticio, getCategoria, deletePeticion, modificarPeticio } from '@/services/communicationmanager';
import { useUserStore } from '@/stores/userStore'; // Importar el store de usuario

const dialog = ref(false);
const editDialog = ref(false);
const selectedPeticioId = ref(null);
const editedPeticio = ref({});
const peticions = ref([]);
const categorias = ref([]);
const selectedCategories = ref([]);
const searchQuery = ref('');

// Obtener el store del usuario
const userStore = useUserStore();

// Cargar categorías
const loadCategoria = async () => {
  try {
    categorias.value = await getCategoria();
    console.log('Categorías cargadas:', categorias.value);
  } catch (error) {
    console.error('Error al cargar categorías:', error);
  }
};

// Cargar peticiones
const loadPeticions = async () => {
  try {
    peticions.value = await getPeticio();
    console.log('Peticiones cargadas:', peticions.value);
  } catch (error) {
    console.error('Error al cargar peticiones:', error);
  }
};

// Confirmar eliminación
const confirmDelete = (id) => {
  selectedPeticioId.value = id;
  dialog.value = true;
};

// Eliminar petición
const deletePeticioHandler = async () => {
  try {
    await deletePeticion(selectedPeticioId.value);
    peticions.value = peticions.value.filter((peticio) => peticio.id_peticio !== selectedPeticioId.value);
    dialog.value = false;
  } catch (error) {
    console.error('Error al eliminar la petición:', error);
    alert('No se pudo eliminar la petición.');
  }
};

// Editar petición
const toggleEditPeticioDialog = (peticio) => {
  editedPeticio.value = { ...peticio };
  editDialog.value = true;
};

const saveEditPeticio = async () => {
  try {
    const updatedPeticio = await modificarPeticio(editedPeticio.value);
    const index = peticions.value.findIndex((peticio) => peticio.id_peticio === updatedPeticio.id_peticio);
    if (index !== -1) {
      peticions.value[index] = updatedPeticio;
    }
    editDialog.value = false;
  } catch (error) {
    console.error('Error al guardar la edición:', error);
    alert('No se pudo guardar la edición.');
  }
};

// Filtrar las peticiones basadas en las categorías seleccionadas y el texto de búsqueda
const filteredData = computed(() => {
  return peticions.value.filter((peticio) => {
    const matchesCategory =
      selectedCategories.value.length === 0 || selectedCategories.value.includes(peticio.id_categoria);
    const matchesSearch = peticio.nom_peticio.toLowerCase().includes(searchQuery.value.toLowerCase());
    return matchesCategory && matchesSearch;
  });
});

// Obtener nombre de la categoría
const getCategoriaNombre = (idCategoria) => {
  const categoria = categorias.value.find((cat) => cat.id_categoria === idCategoria);
  return categoria ? categoria.nom : 'Sin categoría';
};

// Obtener color de la categoría
const getCategoriaColor = (idCategoria) => {
  const categoria = categorias.value.find((cat) => cat.id_categoria === idCategoria);
  if (!categoria) return 'grey';
  // Definir colores según categorías
  const colores = {
    '1': 'green',
    '2': 'blue',
    '3': 'red',
  };
  return colores[idCategoria] || 'grey';
};

// Función para alternar la selección de una categoría
const toggleCategorySelection = (idCategoria) => {
  const index = selectedCategories.value.indexOf(idCategoria);
  if (index > -1) {
    selectedCategories.value.splice(index, 1);
  } else {
    selectedCategories.value.push(idCategoria);
  }
};

onMounted(() => {
  loadPeticions();
  loadCategoria();
});
</script>

<style scoped>
.ancho {
  height: 105px;
  width: 1200px;
}

.text-h5 {
  color: #3f51b5; /* Opcional: color personalizado */
}
</style>
