<script >
  import { useUserStore } from '@/stores/userStore';
  import LoginModal from '@/components/account/LoginModal.vue'

  export default {
    components: {
      LoginModal,
    },
    data() {
      return {
        showModal: false,
      }
    },
    computed: {
      userStore() {
        return useUserStore();
      },
      isAuthenticated() {
        return this.userStore.isAuthenticated;
      },
    },
    methods: {
      handleClick() {
        if (this.isAuthenticated) {
          this.userStore.logout();
          this.$router.push('/');
        } else {
          this.showModal = true;
        }
      },
    },
  }
</script>

<template>
  <div class="log-btn" @click="handleClick">
    {{ isAuthenticated ? `Logout` : 'Login' }}
  </div>

  <LoginModal v-if="showModal" @close="showModal = false" />
</template>

<style scoped>
  .log-btn {
    border: 2px solid black;
    border-radius: 6px;
    padding: 10px;
    color: #42b883;
  }

    .log-btn:hover {
      cursor: pointer;
      background-color: #35495e;
    }
</style>
