<template>
  <div class="modal-backdrop">
    <div class="modal">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <input type="text"
               v-model="username"
               placeholder="Username"
               required />
        <input type="password"
               v-model="password"
               placeholder="Password"
               required />
        <div class="actions">
          <button type="submit">Login</button>
          <button type="button" @click="$emit('close')">Cancel</button>
        </div>
        <p v-if="error" class="error">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script>
  import { login } from '@/services/accountService';

  export default {
    data() {
      return {
        username: '',
        password: '',
        error: '',
      };
    },
    methods: {
      async handleLogin() {
        try {
          await login(this.username, this.password);
          this.$emit('close');
        } catch (err) {
          this.error = 'Login failed. Check your credentials.';
        }
      },
    },
  };
</script>

<style scoped>
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .modal {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    width: 300px;
  }

  input {
    display: block;
    margin: 1rem 0;
    width: 100%;
    padding: 0.5rem;
  }

  .actions {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
  }

  .error {
    color: red;
    margin-top: 0.5rem;
  }
</style>
