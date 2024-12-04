<template>
  <v-app-bar id="tabla">
    <v-toolbar-title>
    <v-btn to="/paginaprincipal">Supportly</v-btn>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-layout class="overflow-visible" style="height: 56px">
      <v-bottom-navigation v-model="value" class="options" grow rounded="lg">
        <v-btn to="/incidencies">
          <v-icon>mdi-alert-circle-outline</v-icon>

          Incidencies
        </v-btn>
        <v-btn to="/alumnes">
          <v-icon>mdi-school</v-icon>

          Alumnes
        </v-btn>
        <v-btn to="/mentors">
          <v-icon>mdi-account-tie</v-icon>

          Mentors
        </v-btn>
      </v-bottom-navigation>
    </v-layout>
  </v-app-bar>
</template>

<script>
</script>

<style scoped>
</style>