<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useUserStore } from '@/stores/userStore'; // Importamos el store
import { deleteUsuaris, getUsuaris } from '@/services/communicationmanager';
import socket from '@/services/socket';

// Variables y referencias
const data = ref([]); // Lista de usuarios
const userStore = useUserStore();
const activeTab = ref('tots');
const selectedUsuariId = ref(null);
const dialog = ref(false);
const searchQuery = ref(''); // Variable para el filtro de búsqueda

const tabs = [
  { label: 'Alumno', value: "alum" },
  { label: 'Mentor', value: "ment" },
  { label: 'Tots', value: "tots" },
];

// Cargar usuarios desde el servicio
const loadUsuaris = async () => {
  try {
    data.value = await getUsuaris();
  } catch (e) {
    console.error('Error al cargar usuarios:', e);
  }
  console.log(userStore.user);
};

// Cargar usuarios al montar el componente
onMounted(() => {
  loadUsuaris();

  // Escuchar el evento de socket solo una vez
  socket.on('usuaris', (usuarisData) => {
    console.log('Recibidos los usuarios:', usuarisData);
    data.value = usuarisData; // Actualiza el estado reactivo
  });
});

// Limpiar el evento de socket al destruir el componente para evitar fugas de memoria
onBeforeUnmount(() => {
  socket.off('usuaris'); // Desactiva la escucha del evento 'usuaris'
});

// Filtrar usuarios según el correo del profesor, la pestaña activa y la búsqueda
const filteredData = computed(() => {
  if (!userStore.user?.email) {
    console.error("No se encontró el email del profesor en el estado.");
    return [];
  }

  console.log("Filtrando usuarios con email del profesor:", userStore.user.email);

  return activeTab.value === 'tots'
    ? data.value.filter(
        usuari =>
          usuari.correu_profe === userStore.user.email &&
          (usuari.tipus === 'alum' || usuari.tipus === 'ment') &&
          (usuari.nom.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
           usuari.cognom.toLowerCase().includes(searchQuery.value.toLowerCase()))
      )
    : data.value.filter(
        usuari =>
          usuari.correu_profe === userStore.user.email &&
          usuari.tipus === activeTab.value &&
          (usuari.nom.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
           usuari.cognom.toLowerCase().includes(searchQuery.value.toLowerCase()))
      );
});

// Confirmar eliminación
const confirmDelete = (id) => {
  selectedUsuariId.value = id;
  dialog.value = true;
  console.log(`Eliminar usuario con ID: ${id}`);
};

// Clase de tarjeta según el tipo
const getCardClass = (tipus) => {
  switch (tipus) {
    case 'alum':
      return 'bg-white';
    case 'prof':
      return 'bg-yellow';
    case 'ment':
      return 'bg-blue';
    case 'tots':
      return 'bg-red';
    default:
      return '';
  }
};

// Eliminar usuario
const deleteUsuarisHandler = async () => {
  try {
    await deleteUsuaris(selectedUsuariId.value);
    data.value = data.value.filter(user => user.id_usuari !== selectedUsuariId.value);
    dialog.value = false;
  } catch (error) {
    console.error("Error al eliminar la petición:", error);
    alert("No se pudo eliminar la petición.");
  }
};
</script>
