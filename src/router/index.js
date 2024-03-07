import { createRouter, createWebHistory } from 'vue-router';
import Game from '../views/Game.vue';
import Home from '../views/Home.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/game', component: Game }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;