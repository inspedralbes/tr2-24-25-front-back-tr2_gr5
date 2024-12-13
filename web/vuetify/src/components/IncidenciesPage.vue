<template>
  <v-container>
    <SearchBar
      label="Buscar por categoria de la incidencia"
      @update:search="updateSearchQuery"
    />
    <v-card
      v-for="peticio in filteredData"
      :key="peticio.id_peticio"
      class="my-5 ancho d-flex justify-space-between align-center"
      :title="peticio.nom_peticio"
      :subtitle="peticio.descripcio"
      style="padding-right: 30px; padding-left: 16px">

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

    <v-dialog v-model="editDialog" max-width="500">
      <v-card>
        <v-card-title class="headline">Editar Petició</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="editedPeticio.nom_peticio"
            label="Nom Petició"
          ></v-text-field>
          <v-text-field
            v-model="editedPeticio.descripcio"
            label="Descripció"
          ></v-text-field>
          <v-text-field
            v-model="editedPeticio.id_usuari"
            label="ID Usuari"
            type="number"
          ></v-text-field>
          <v-text-field
            v-model="editedPeticio.id_categoria"
            label="ID Categoria"
            type="number"
          ></v-text-field>
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


const dialog = ref(false);
const editDialog = ref(false);
const selectedPeticioId = ref(null);
const editedPeticio = ref({});
const peticions = ref([]); // Lista de peticiones
const categorias = ref([]); // Lista de categorías
const searchQuery = ref(''); // Valor de búsqueda


// Función para cargar las categorías
const loadCategoria = async () => {
  try {
    categorias.value = await getCategoria();
    console.log('Categorías cargadas:', categorias.value);
  } catch (error) {
    console.error('Error al cargar categorías:', error);
  }
};

const loadPeticions = async () => {
  try {
    peticions.value = await getPeticio();
    console.log('Peticiones cargadas:', peticions.value);
  } catch (error) {
    console.error('Error al cargar peticiones:', error);
  }
};

const confirmDelete = (id) => {
  selectedPeticioId.value = id;
  dialog.value = true;
};

const deletePeticioHandler = async () => {
  try {
    await deletePeticion(selectedPeticioId.value); 
    peticions.value = peticions.value.filter(peticio => peticio.id_peticio !== selectedPeticioId.value);
    dialog.value = false;
  } catch (error) {
    console.error("Error al eliminar la petición:", error);
    alert("No se pudo eliminar la petición.");
  }
};

const toggleEditPeticioDialog = (peticio) => {
  editedPeticio.value = { ...peticio };
  editDialog.value = true;
};

const saveEditPeticio = async () => {
  try {
    const updatedPeticio = await modificarPeticio(editedPeticio.value);
    const index = peticions.value.findIndex(peticio => peticio.id_peticio === updatedPeticio.id_peticio);
    if (index !== -1) {
      data.value[index] = updatedPeticio;
    }
    editDialog.value = false;
  } catch (error) {
    console.error("Error al guardar la edición:", error);
    alert("No se pudo guardar la edición.");
  }
};

const filteredData = computed(() => {
  // Encuentra los IDs de categorías que coincidan con la búsqueda
  const filteredCategoryIds = categorias.value
    .filter((categoria) =>
      categoria.nom.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
    .map((categoria) => categoria.id_categoria);

  // Filtra las peticiones que tienen IDs de categoría coincidentes
  return peticions.value.filter((peticio) =>
    filteredCategoryIds.includes(peticio.id_categoria)
  );
});

const updateSearchQuery = (query) => {
  searchQuery.value = query;
};

const getCategoriaNombre = (idCategoria) => {
  const categoria = categorias.value.find((cat) => cat.id_categoria === idCategoria);
  return categoria ? categoria.nom : 'Sin categoría';
};

// Obtener color basado en la categoría
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
</style>
