
import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/Home.vue'
import Game from '@/views/Game.vue'
import GameConfig from '@/views/GameConfig.vue'

const routes = [
  {
    path: '/',
    component: HomePage,
    name: 'home'
  },
  {
    path: '/Play',
    component: Game,
    name: 'play'
  },
  {
    path: '/GameConfig',
    component: GameConfig,
    name: 'gameConfig'
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

export default router;
