import { createRouter, createWebHistory } from 'vue-router';
import { HOME_PAGE_NAME, LOGIN_PAGE_NAME } from '@/constants/router';
import { useAuthStore } from '@/stores/auth';
import routes from '@/router/routes';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
});

// Auth router guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.name === LOGIN_PAGE_NAME && authStore.isUserAuth) next({ name: HOME_PAGE_NAME });

  if (to.name !== LOGIN_PAGE_NAME && !authStore.isUserAuth) next({ name: LOGIN_PAGE_NAME });
  else next();
});

export default router;
