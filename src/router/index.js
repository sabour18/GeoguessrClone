
import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './../components/Home/HomePage.vue'
import Play from '../components/Play/Play.vue'
import PlaySettings from '../components/Configuration/PlayConfig.vue'

const routes = [
  {
    path: '/',
    component: HomePage,
    name: 'home'
  },
  {
    path: '/Play',
    component: Play,
    name: 'play'
  },
  {
    path: '/PlayConfig',
    component: PlaySettings,
    name: 'config'
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

export default router;
