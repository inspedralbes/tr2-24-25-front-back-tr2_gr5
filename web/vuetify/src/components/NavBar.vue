<template>
  <v-app-bar id="tabla">
    <v-toolbar-title>
    <v-btn to="/paginaprincipal">Supportly</v-btn>
    </v-toolbar-title>
    <v-spacer>
      
    </v-spacer>

    <v-layout class="overflow-visible" style="height: 56px">
      <v-bottom-navigation v-model="value" class="options" grow rounded="lg">
        <v-btn to="/incidencies">
          <v-icon>mdi-alert-circle-outline</v-icon>

          Incidencies
        </v-btn>
        <v-btn to="/usuaris">
          <v-icon>mdi-school</v-icon>

          Alumnes
        </v-btn>
      </v-bottom-navigation>
    </v-layout>
  </v-app-bar>
</template>


<script setup>
import { ref } from 'vue'

const chips = ref([
  'Programming',
  'Playing video games',
  'Watching movies',
  'Sleeping',
])

const items = ref(['Streaming', 'Eating'])

const remove = (item) => {
  const index = chips.value.indexOf(item)
  if (index !== -1) {
    chips.value.splice(index, 1)
  }
}
</script>

<style scoped>
</style>