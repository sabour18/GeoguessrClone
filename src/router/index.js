import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/Home.vue'
import Game from '@/views/Game.vue'
import GameConfig from '@/views/GameConfig.vue'
import useGameStore from '@/stores/store'

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
  history: createWebHistory('/GeoguessrClone/'),
  routes,
})

router.beforeEach((to, from, next) => {
  const gameStore = useGameStore()

  if (to.name === 'play') {
    const isValidGame = gameStore.isPlayingGame &&
      gameStore.selectedMap &&
      gameStore.totalRounds &&
      gameStore.locations.length > 0

    if (!isValidGame) {
      gameStore.exitGame()
      return next({ name: 'home' })
    }
  }

  next()
})

export default router
