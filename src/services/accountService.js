import axios from 'axios'
import { useUserStore } from '@/stores/userStore'

const api = axios.create({
  baseURL: 'https://localhost:7023/api/account'
})

// Optional: attach token if needed in the future
api.interceptors.request.use((config) => {
  const userStore = useUserStore()
  if (userStore.token) {
    config.headers.Authorization = `Bearer ${userStore.token}`
  }
  return config
})

export const register = (username, password) => {
  return api.post('/register', { username, password })
}

export const login = async (username, password) => {
  const response = await api.post('/login', { username, password })

  const { token, username: returnedUsername } = response.data
  const userStore = useUserStore()
  userStore.setUser(token, returnedUsername)

  return response.data
}
