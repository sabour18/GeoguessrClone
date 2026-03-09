import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/Home.vue'
import Game from '@/views/Game.vue'
import GameConfig from '@/views/GameConfig.vue'
import useGameStore from '@/stores/store'
import { useUserStore } from '@/stores/userStore'

const routes = [
  {
    path: '/',
    component: HomePage,
    name: 'home'
  },
  {
    path: '/Play',
    component: Game,
    name: 'play',
    meta: { requiresAuth: true }
  },
  {
    path: '/GameConfig',
    component: GameConfig,
    name: 'gameConfig',
    meta: { requiresAuth: true }
  },
];

const router = createRouter({
  history: createWebHistory('/GeoguessrClone/'),
  routes,
})

router.beforeEach((to, from, next) => {
  const gameStore = useGameStore();
  const auth = useUserStore();

  // Load user from localStorage if not already
  if (!auth.token) {
    auth.loadUserFromStorage();
  }

  // Block unauthenticated access to routes that require it
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    //return next({ name: 'home' });
  }

  // Validate game state for play route
  if (to.name === 'play') {
    const isValidGame = gameStore.isPlayingGame &&
      gameStore.selectedMap &&
      gameStore.totalRounds &&
      gameStore.locations.length > 0;

    if (!isValidGame) {
      gameStore.exitGame();
      return next({ name: 'home' });
    }
  }

  next();
});


export default router
