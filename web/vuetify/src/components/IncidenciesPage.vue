<template>
  <v-card
    v-for="incidencia in incidencies"
    :key="incidencia.ID"
    class="my-5 ancho align-left"
    :title="incidencia.Nom"
    :subtitle="incidencia.text_descriptiu"
    link
  >
  </v-card>
</template>

<script setup>
import { ref } from 'vue';
import incidenciesDades from "@/assets/incidencies.json";

const incidencies = ref([]);
incidencies.value = incidenciesDades;
</script>

<style scoped>
.ancho {
  height: 90px;
  width: 1300px;
}

.align-left {
  margin-left: 25px; 
  margin-right: auto;
}
</style>
