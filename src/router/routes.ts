import type { RouteRecordRaw } from 'vue-router';
import { HOME_PAGE_NAME, HOME_PAGE_URL, LOGIN_PAGE_NAME, LOGIN_PAGE_URL } from '@/constants/router';
import HomeView from '@/views/HomeView.vue';

const routes: RouteRecordRaw[] = [
  {
    path: HOME_PAGE_URL,
    name: HOME_PAGE_NAME,
    component: HomeView,
  },
  {
    path: LOGIN_PAGE_URL,
    name: LOGIN_PAGE_NAME,
    component: () => import('../views/LoginView.vue'),
  },
];

export default routes;
