<template>
    <div>
      <h2>Mentores Pendientes</h2>
      <ul>
        <li v-for="mentor in mentores" :key="mentor.id_usuari">
          <p>{{ mentor.nom }} {{ mentor.cognom }}</p>
          <button @click="validarmentor(mentor.id_usuari, true)">Validar</button>
          <button @click="validarmentor(mentor.id_usuari, false)">Rechazar</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { getMentoresPendientes, validarMentor } from '@/services/communicationmanager'; // Importa tus funciones
  
  const mentores = ref([]);
  
  const obtenerMentores = async () => {
    try {
      mentores.value = await getMentoresPendientes();
    } catch (error) {
      console.error('Error al obtener mentores:', error);
    }
  };
  
  const validarmentor = async (mentorId, validado) => {
    try {
      const result = await validarMentor(mentorId, validado);
      alert(result.message);
      obtenerMentores(); // Refrescar la lista después de la validación
    } catch (error) {
      console.error('Error al validar mentor:', error);
    }
  };
  
  onMounted(() => {
    obtenerMentores();
  });
  </script>
  