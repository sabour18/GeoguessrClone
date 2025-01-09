
import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './../components/Home/HomePage.vue'
import PlaySettings from './../components/Play/PlaySettings.vue'

const routes = [
  {
    path: '/',
    component: HomePage
  },
  {
    path: '/Play',
    component: PlaySettings
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

export default router;
