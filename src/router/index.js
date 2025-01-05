
import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './../components/Home/HomePage.vue'
import Play from './../components/Play/Play.vue'

const routes = [
  {
    path: '/',
    component: HomePage
  },
  {
    path: '/Play',
    component: Play
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

export default router;
