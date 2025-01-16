<script>
  import { mapState, mapActions } from 'pinia';
  import useGameStore from '@/stores/store'

  export default {
    computed: {
    },
    methods: {
      ...mapActions(useGameStore, ['exitGame']), // Map store actions
    }
  }
</script>

<template>
  <div class="exit">
    <a href="/" @click="exitGame">X</a>
  </div>
</template>

<style scoped>
  .exit {
    opacity: 0.7;
    position: fixed;
    z-index: 10;
    width: 40px;
    height: 40px;
    right: 0;
    top: 0;
    display: flex;
    padding: 10px;
    justify-content: space-evenly;
    align-items: center;
    background: rgb(7,32,71,0.85);
    color: white;
    border-bottom-left-radius:10px;
  }

  .exit:hover {
    opacity: 1;
  }

  a {
    color:white;
  }
</style>
