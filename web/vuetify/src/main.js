// main.js

// Plugins
import { registerPlugins } from '@/plugins';

// Components
import App from './App.vue';

// Composables
import { createApp } from 'vue';

// Pinia
import { createPinia } from 'pinia';

// Importar el plugin de persistencia
import piniaPersist from 'pinia-plugin-persistedstate';

// Crear la instancia de Pinia
const pinia = createPinia();

// Usar el plugin de persistencia con Pinia
pinia.use(piniaPersist); // Esto habilita la persistencia para todas las tiendas

const app = createApp(App);

// Registrar los plugins y Pinia
app.use(pinia);
registerPlugins(app);

app.mount('#app');
