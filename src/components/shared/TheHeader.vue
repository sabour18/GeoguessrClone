<script setup>
  import LogInOutButton from '@/components/shared/LogInOutButton.vue'
</script>

<template>
  <nav>  
    <header>
      <a href="/" class="home-btn material-symbols-outlined">home</a>
      <LogInOutButton></LogInOutButton>
    </header>
    </nav>
</template>

<style scoped>


  nav header {
    position: sticky;
    top: 0;
  }

  header {
    display: flex;
    flex-direction:row;
    justify-content:space-between;
    align-items:center;
    padding: 18px;
    background-color: #072047;
  }

  home-btn{
  }

</style>
