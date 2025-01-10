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
        { text: 'Canada Cities', mapId: 'CanadaCities'},
        { text: 'Canada Vancouver Island', mapId: 'CanadaVI'},
        { text: 'Famous Locations', mapId: 'FamousLocations'},
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

  <div class="settings-container">
    <h1>Setttings</h1>
    <hr class="solid">
    <h3>Choose a Map:</h3>
    <div class="btn-group">
      <button v-for="map in this.availableMaps"            
              :key="map.mapId"
              :class="{ selected: selectedMap === map.mapId }"            
              @click="selectMap(map)"
      >
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

  .settings-container {
    margin-top:5%;
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
</style>
