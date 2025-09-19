import './assets/main.css'
import { useUserStore } from '@/stores/userStore'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia);

const userStore = useUserStore()
userStore.loadUserFromStorage()

app.use(router);
app.mount('#app');
