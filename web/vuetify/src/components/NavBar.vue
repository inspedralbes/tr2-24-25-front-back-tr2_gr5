<template>
  <v-app-bar id="tabla">
    <v-toolbar-title>
    <v-btn to="/paginaprincipal">Supportly</v-btn>
    </v-toolbar-title>
    <v-spacer>
      <v-combobox
    v-model="chips"
    :items="items"
    label="Cercador"
    variant="solo"
    chips
    clearable
    multiple>

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

<script>
</script>

<style scoped>
</style>