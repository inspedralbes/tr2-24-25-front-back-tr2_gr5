<template>
    <v-text-field
      v-model="searchQuery"
      :label="label"
      clearable
      class="mb-4 "
      rounded
    ></v-text-field>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps({
    label: {
      type: String,
      default: 'Buscar',
    },
  });
  
  const emit = defineEmits(['update:search']);
  const searchQuery = ref('');
  
  watch(searchQuery, (newValue) => {
    emit('update:search', newValue);
  });
  </script>