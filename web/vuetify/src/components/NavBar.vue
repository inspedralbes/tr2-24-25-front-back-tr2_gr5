<template>
  <v-app-bar id="tabla">
    <v-toolbar-title>
      <v-btn to="/supportly">Supportly</v-btn>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-layout class="overflow-visible" style="height: 56px">
      <v-bottom-navigation v-model="value" class="options" grow rounded="lg">
        <v-btn to="/incidencies">
          <v-icon>mdi-alert-circle-outline</v-icon>

          Incidencies
        </v-btn>
      </v-bottom-navigation>
    </v-layout>
  </v-app-bar>
</template>

<script>
</script>

<style scoped>
.options {
  background-color: rgb(255, 251, 230);
}
#tabla {
  background-color: rgb(255, 234, 167);
}
</style>