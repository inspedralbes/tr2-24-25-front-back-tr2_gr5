
/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router/auto';
import { routes as autoroutes } from 'vue-router/auto-routes';
import IniciarSesionPage from '@/components/IniciarSesionPage.vue';
import PaginaPrincipal from '@/components/PaginaPrincipal.vue';
import IncidenciesPage from '@/components/IncidenciesPage.vue';
import UsuarisPage from '@/components/UsuarisPage.vue';
import MentorsApplicationPage from '@/components/MentorsApplicationPage.vue';
import forgotpassword from '@/pages/forgotpassword.vue';


const routes = [
  ...autoroutes,
  {
    path: '/',
    name: 'login',
    component: IniciarSesionPage, // Componente de inicio de sesión
    meta: { hideNavBar: true } 
  },
  {
    path: '/home',
    name: 'Home',
    component: PaginaPrincipal, // Página principal después del inicio de sesión
   
  },
  {
    path: '/incidences',
    name: 'Incidencia',
    component: IncidenciesPage,
  },
  {
    path: '/users',
    name: 'Users',
    component: UsuarisPage,
  },
  {
    path: '/applicationMent',
    name: 'ApplicationMentors',
    component: MentorsApplicationPage,
  },
  {
    path: '/forgotPassword',
    name: 'forgotPassword',
    component: forgotpassword,
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
