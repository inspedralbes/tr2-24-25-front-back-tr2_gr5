<template>
  <v-container>
    <v-card
      v-for="peticio in data"
      :key="peticio.id"
      class="my-5 ancho align-left d-flex justify-space-between align-center"
      :title="peticio.nom_peticio"
      :subtitle="peticio.descripcio"
    >
      <div class="ml-auto d-flex align-center">
        <v-btn @click="toggleEditPeticioDialog(peticio)" icon color="primary">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn @click="deletePeticio(peticio.id)" icon color="red">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
    </v-card>


  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getPeticio } from '@/services/communicationmanager'; 
const data = ref([]); 

const loadPeticions = async () => {
  try {
    data.value = await getPeticio();
  } catch (error) {
    console.error("Error al cargar peticions:", error);
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
