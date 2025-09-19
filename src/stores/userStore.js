import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    token: null,
    username: null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    setUser(token, username) {
      this.token = token;
      this.username = username;
      localStorage.setItem('user-token', token);
      localStorage.setItem('user-name', username);
    },
    logout() {
      this.token = null;
      this.username = null;
      localStorage.removeItem('user-token');
      localStorage.removeItem('user-name');
    },
    loadUserFromStorage() {
      const token = localStorage.getItem('user-token');
      const username = localStorage.getItem('user-name');
      if (token && username) {
        this.token = token;
        this.username = username;
      }
    },
  }
});
