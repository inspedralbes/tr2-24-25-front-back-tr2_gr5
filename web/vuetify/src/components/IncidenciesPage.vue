incidencies:

<template>
  <v-container>
    <v-card
      v-for="peticio in data"
      :key="peticio.id"
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
    <v-dialog
      v-model="dialog"
      max-width="500"
    >
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
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getPeticio, deletePeticion } from '@/services/communicationmanager';

const data = ref([]); 
const dialog = ref(false); 
const selectedPeticioId = ref(null); 

const loadPeticions = async () => {
  try {
    data.value = await getPeticio();
  } catch (error) {
    console.error("Error al cargar peticions:", error);
  }
};

const confirmDelete = (id) => {
  console.log(id)
  selectedPeticioId.value = id;
  dialog.value = true;
};

const deletePeticioHandler = async () => {
  try {
    await deletePeticion(selectedPeticioId.value); 
    data.value = data.value.filter(peticio => peticio.id !== selectedPeticioId.value);
    dialog.value = false;
  } catch (error) {
    console.error("Error al eliminar la petición:", error);
    alert("No se pudo eliminar la petición.");
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
.align-left {
  margin-left: 25px;
  margin-right: auto;
}
.model {
  background-color: lightgray;
}
</style>
