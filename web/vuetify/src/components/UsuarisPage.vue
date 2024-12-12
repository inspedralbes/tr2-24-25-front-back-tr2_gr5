<template>


<v-combobox
    v-model="chips"
    :items="items"
    label="Cercador"
    variant="solo"
    chips
    clearable
    multiple
    class="sausage-combobox rounded-xs  "
    style="max-width: 400px">

    <template v-slot:selection="{ attrs, item, select, selected }">
      <v-chip
        v-bind="attrs"
        :model-value="selected"
        closable
        @click="select"
        @click:close="remove(item)"
      >
        <strong>{{ item }}</strong>&nbsp;
        <span>(interest)</span>
      </v-chip>
    </template>
  </v-combobox>

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
.sausage-combobox {
  display: block;
  margin: 0 auto;
  margin-top: 20px;
  border-radius: 50px; /* Bordes redondeados */
  height: 50px; /* Ajusta la altura para hacerlo más "salchichoso" */
  padding: 0 20px; /* Espaciado interno para darle un buen aspecto */
  background-color: #f0f0f0;
}

.sausage-combobox .v-input__control {
  border-radius: 50px !important;  /* Forzar bordes redondeados */
  overflow: hidden;  /* Asegura que los bordes redondeados no se vean cortados */
}

.sausage-combobox .v-input__slot {
  border-radius: 50px !important;  /* Asegura bordes redondeados en la caja de entrada */
  padding: 0 16px;  /* Ajusta el espaciado interno de la caja */
  height: 40px !important;  /* Ajusta la altura del cuadro de búsqueda */
}

.sausage-combobox .v-select__input {
  border-radius: 50px !important;  /* Asegura bordes redondeados en el input */
  height: 40px !important;  /* Asegura la misma altura */
  padding: 0 10px;  /* Añade espacio dentro del input */
}
</style>