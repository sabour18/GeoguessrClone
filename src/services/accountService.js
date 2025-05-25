import axios from 'axios';
import { useUserStore } from '@/stores/userStore';

const API_URL = 'https://localhost:7023/api/account';

export const register = (username, password) => {
  return axios.post(`${API_URL}/register`, {
    username,
    password
  });
};

export const login = async (username, password) => {
  const response = await axios.post(`${API_URL}/login`, {
    username,
    password,
  });

  const { token, username: returnedUsername } = response.data;
  const userStore = useUserStore();
  userStore.setUser(token, returnedUsername);

  return response.data;
};
