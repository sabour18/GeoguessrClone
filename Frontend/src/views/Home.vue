<script >
  import TheHeader from '@/components/shared/TheHeader.vue'
  import TheFooter from '@/components/shared/TheFooter.vue'
  import { useUserStore } from '@/stores/userStore';

  export default {
    components: {
      TheHeader,
      TheFooter,
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
      handlePlayClick() {
        if (!this.isAuthenticated){
          //alert("You must log in to play!");
          //return;
        }
        this.$router.push("/GameConfig");
      }
    }
  }
</script>

<template>
  <TheHeader />
  <div class="welcome-menu">
    <h1 class="welcome">Welcome {{ isAuthenticated ? `${userStore.username}! To` : 'to' }} my Geoguessr Clone!</h1>
    <p>Click play and select the map to start playing!</p>
    <div class="button-group">
        <button @click="handlePlayClick">Play</button>
    </div>
  </div>
  <TheFooter />
</template>

<style>
  .welcome-menu {
      height:75vh;
      display:flex;
      flex-direction:column;
      justify-content:center;
      align-items:center;
  }

  .welcome{
      text-align:center;
      padding-bottom:10px;
      color:white;
      font-size:3rem;
  }

  .button-group {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;
  }

  p{
      margin-bottom:20px;
  }
</style>
