<script>
  import Header from '../shared/Header.vue'

  export default {
  components: {
    Header,
  },
  data(){
    return{
      availableMaps: [
        { text: 'Canada', mapId: 'Canada'},
        { text: 'Canada Vancouver Island', mapId: 'CanadaVI'},
        { text: 'Famous Locations', mapId: 'FamousLocations'},
        { text: 'World Cities', mapId: 'cities'},
        { text: 'Funny/Cool Locations', mapId: 'FunnyCool'},
      ],
      selectedMap: null,
    }  
  },
  methods: {
    selectMap(map) {
      this.selectedMap = map.mapId;
    },//selectMap
    startGame(){
      if (!this.selectedMap) {
        alert('Please select a map before starting the game!');
        return;
      }

      this.$router.push({ name: 'play', query: { mapId: this.selectedMap } });
    }//startGame
  }
}
</script>

<template>
  <Header />

  <div class="config-container">
    <h1>Game Configuration</h1>
    <hr class="solid">
    <h3>Select amount of rounds:</h3>
    <button class="rounds-5">5</button>
    <h3>Choose a Map:</h3>
    <div class="btn-group">
      <button v-for="map in this.availableMaps"
              :key="map.mapId"
              :class="{ selected: selectedMap === map.mapId }"
              @click="selectMap(map)">
        {{map.text}}
      </button>
    </div>
    <button @click="startGame">Start</button>
  </div>
</template>

<style scoped>
  hr{
    width:80%;
  }

  h3{
    margin: 20px;
  }

  .config-container {
    margin-top: 5%;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .btn-group {
    margin: 5px;
    width: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  button{
    margin: 10px;
  }

  .selected {
    color: white;
    background: rgb(7,32,71,0.85);
  }

  .rounds-5 {
      color:white;
    background: rgb(7,32,71,0.85);
  }
</style>
