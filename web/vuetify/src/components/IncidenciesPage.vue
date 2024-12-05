<template>
  <v-card
    class="my-5 ancho align-left d-flex justify-space-between align-center"
    :title="nom_peticio"
    :subtitle="descripcio"
  >
    <div class="ml-auto d-flex align-center">
      <v-btn @click="toggleEditPeticioDialog" icon color="primary">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn icon color="red">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </div>
    <v-dialog v-model="showEditPeticioDialog" max-width="500px">
      <v-card class="model">
        <v-card-title>
          Peticio id
        </v-card-title>
        <v-text-field
        label="Nom Petició">
        </v-text-field>
        <v-text-field
        label="Descripció">
        </v-text-field>
        
        <v-card-actions>
          <v-btn @click="showEditPeticioDialog = false" color="green">Guardar</v-btn>
          <v-btn @click="showEditPeticioDialog = false" color="red">Cancela</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script setup>
/*import getPeticio from "../services/communicationmanager"

const nom_peticio = ref("");
const descripcio = ref("");
const data = ref([]);*/
import { ref } from 'vue';

const showEditPeticioDialog = ref(false);

const toggleEditPeticioDialog = () => {
  showEditPeticioDialog.value = !showEditPeticioDialog.value;
};
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
.model{
  background-color:lightgray;
}
</style>

