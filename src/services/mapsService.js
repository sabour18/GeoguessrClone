import axios from 'axios';
import { useUserStore } from '@/stores/userStore'

const api = axios.create({
  baseURL: 'https://localhost:7023/api/maps',
})

api.interceptors.request.use((config) => {
  const userStore = useUserStore()
  if (userStore.token) {
    config.headers.Authorization = `Bearer ${userStore.token}`
  }
  return config
})

export const getAllMaps = () => api.get(`/AllMaps`);
export function getLocationsByMapId(mapId) {
  return api.get(`}/locations`, {
    params: {
      mapId: mapId,
    }
  });
}
export function getNumberLocations(mapId, rounds) {
  return api.get(`/locationsx`, {
    params: {
      mapId: mapId,
      rounds
    }
  });
}
