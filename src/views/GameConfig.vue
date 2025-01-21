<script>
  import Header from '@/components/shared/TheHeader.vue'
  import MapCard from '@/components/Configuration/MapCard.vue'
  import useGameStore from '@/stores/store'
  import { mapState, mapActions } from 'pinia';

  export default {
  components: {
    Header,
    MapCard,
    },
    emits: [
      'select-map',
    ],
    computed: {
      ...mapState(useGameStore, ['isPlayingGame', 'totalRounds', 'currentRound']), // Map store states
    },
  data(){
    return{
      availableMaps: [
        { name: 'Canada', mapId: 'Canada'},
        { name: 'Canada Vancouver Island', mapId: 'CanadaVI'},
        { name: 'Famous Locations', mapId: 'FamousLocations'},
        { name: 'World Cities', mapId: 'citiesp'},
        { name: 'Funny/Cool Locations', mapId: 'FunnyCool'},
        { name: 'Personal Locations', mapId: 'Personal'},
      ],
      selectedMap: null,
      selectedRounds: 5,
    }
  },
    methods: {
      ...mapActions(useGameStore, ['startTheGame','setTotalRounds', 'goToNextRound', 'setTotalRounds', 'setLocations']), // Map store actions
    selectMap(mapId) {
      this.selectedMap = mapId;
    },//selectMap
    selectRounds() {
      this.selectedRounds = 5;
    },//selectRounds
    async startGame(){
      if (!this.selectedMap) {
        alert('Please select a map before starting the game!');
        return;
      }
      await this.startTheGame(this.selectedMap);
      await this.setLocations();

      this.$router.push({ name: 'play'});
    }//startGame
  }
}
</script>

<template>
  <Header />
  <div class="config-container">

    <div class="title">
      <h1>Game Configuration</h1>
      <hr/>
    </div>
    <div class="map-container">
      <h3>Select a Map:</h3>
      <div class="map-list">
        <MapCard class="map-card"
                 v-for="map in this.availableMaps"
                 :name="map.name"
                 :mapId="map.mapId"
                 :selected="map.mapId === this.selectedMap"
                 @select-map="selectMap"
                 />
      </div>
    </div>
    <div class="round-container">
      <h3>Select amount of rounds:</h3>
      <button class="rounds-5" @click="selectRounds">5</button>
    </div>
    

    <button @click="startGame">Start</button>
  </div>
</template>

<style scoped>

  .title{
    display:flex;
    flex-direction:column;
    align-content:center;
  }
  .title hr {
    width: 80vw;
  }

  .title h1{
    margin:auto;
  }

  .config-container {
    margin-top: 15px;
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

  button {
    margin: 10px;
  }

  .selected {
    color: white;
    background: rgb(7,32,71,0.85);
  }

  /* Map Card Section */
  .map-container {
    margin-top: 40px;
    width: 80%;
  }

  .map-list{
    display:flex;
    flex-wrap:wrap;
    justify-content: center;
    align-items:center;
  }

  .map-card{
    margin: 15px 20px 15px 20px;
  }

  /* Round selection section*/
  .round-container{
      margin-top: 40px;
      display: flex;
      flex-direction:column;
  }

  .round-container h3 {
    margin: 10px;
  }

  .rounds-5 {
    color: white;
    background: rgb(7,32,71,0.85);
  }

</style>
