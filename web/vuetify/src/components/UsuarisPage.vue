<template>
<v-container>
    <v-card
    v-for="usuari in data"
    :key="usuari.id_usuari"
    class="my-5 ancho d-flex justify-space-between align-center"
    :title="usuari.nom"
    :subtitle="usuari.tipus"
    style="padding-right: 30px; padding-left: 16px">

    <div>
        <v-btn @click="confirmDelete(usuari.id_usuari)" icon color="red">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
</v-card>
</v-container>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import {getUsuaris} from '@/services/communicationmanager';

const data = ref([]);
const deleteDialog = ref(false);
const editDialog = ref(false);
const selectedUsuariId = ref(null);

const loadUsuaris = async () => {
    try {
        data.value = await getUsuaris();
    } catch (e) {
        console.error("Error al cargar usuarios:", e)
    }
}

const confirmDelete = (id) => {
    selectedUsuariId.value = id;
    deleteDialog.value = true;
}

onMounted(() => {
    loadUsuaris();
})
</script>
<style scoped>

</style>