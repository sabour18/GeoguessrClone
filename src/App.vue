<script setup>
  import HomePage from '@/views/Home.vue'
  import { onMounted } from 'vue';
  import { useUserStore } from '@/stores/userStore';

  onMounted(() => {
    const userStore = useUserStore();
    userStore.loadUserFromStorage();
  });
</script>

<template>
  <main>
    <div class="wrapper">
      <router-view />
    </div>
  </main>
</template>

<style>
</style>

