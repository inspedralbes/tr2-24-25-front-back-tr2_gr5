<template>
  <v-card
  class="my-5 ancho align-left"
  :title="nom_peticio"
  :subtitle="descripcio"
  ></v-card>
</template>
<script setup>
import getPeticio from "../services/communicationmanager"

const nom_peticio = ref("");
const descripcio = ref("");
const data = ref([]);



</script>
<style scoped>
.ancho {
  height: 105px;
  width: 1300px;
}
.align-left {
  margin-left: 25px; 
  margin-right: auto;
}
</style>
