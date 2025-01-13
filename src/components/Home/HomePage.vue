<script >
  import Header from '../shared/Header.vue'

  export default {
    components: {
      Header,
    }
  }
</script>

<template>
  <Header />
  <div class="welcome-menu">
    <h1 class="welcome">Welcome to my Geoguessr Clone!</h1>
    <p>Click play and select the map to start playing!</p>
    <div class="button-group">
      <form action="/PlayConfig">
        <button type="submit">Play</button>
      </form>
    </div>
  </div>
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
