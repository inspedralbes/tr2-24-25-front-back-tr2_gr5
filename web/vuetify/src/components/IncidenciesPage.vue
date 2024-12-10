<template>
  <v-container>
    <v-card
      v-for="peticio in data"
      :key="peticio.id_peticio"
      class="my-5 ancho d-flex justify-start align-center"
      :title="peticio.nom_peticio"
      :subtitle="peticio.descripcio"
    >
      <div class="ml-auto d-flex align-center">
        <v-btn @click="toggleEditPeticioDialog(peticio)" icon color="primary">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn @click="confirmDelete(peticio.id_peticio)" icon color="red">
          <v-icon>mdi-close</v-icon>
        </v-btn>
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
import { ref, onMounted } from 'vue';
import { getPeticio, deletePeticion, modificarPeticio } from '@/services/communicationmanager';

const data = ref([]); 
const dialog = ref(false);
const editDialog = ref(false);
const selectedPeticioId = ref(null);
const editedPeticio = ref({});

const loadPeticions = async () => {
  try {
    data.value = await getPeticio();
  } catch (error) {
    console.error("Error al cargar peticions:", error);
  }
};

const confirmDelete = (id) => {
  selectedPeticioId.value = id;
  dialog.value = true;
};

const deletePeticioHandler = async () => {
  try {
    await deletePeticion(selectedPeticioId.value); 
    data.value = data.value.filter(peticio => peticio.id_peticio !== selectedPeticioId.value);
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
    const index = data.value.findIndex(peticio => peticio.id_peticio === updatedPeticio.id_peticio);
    if (index !== -1) {
      data.value[index] = updatedPeticio;
    }
    editDialog.value = false;
  } catch (error) {
    console.error("Error al guardar la edición:", error);
    alert("No se pudo guardar la edición.");
  }
};

onMounted(() => {
  loadPeticions();
});
</script>

<style scoped>
.ancho {
  height: 105px;
  width: 1750px;
}
</style>
