import { createRouter, createWebHistory } from 'vue-router';
import Login from './components/Login.vue';
import Registration from './components/Registration.vue';
import User from './components/User.vue';

const routes = [
  { path: '/', component: Login },
  { path: '/registration', component: Registration },
  { path: '/user', component: User }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export { routes };

export default router;
