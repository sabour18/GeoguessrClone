<script>
  import Header from '@/components/shared/TheHeader.vue'
  import MapCard from '@/components/Configuration/MapCard.vue'
  import RoundsSelector from '@/components/Configuration/RoundsSelector.vue'
  import useGameStore from '@/stores/store'
  import { mapState, mapActions } from 'pinia';
  import { getAllMaps } from '@/services/mapsService';

  export default {
  components: {
      Header,
      MapCard,
      RoundsSelector,
    },
    emits: [
      'select-map',
    ],
    computed: {
      ...mapState(useGameStore, ['isPlayingGame', 'totalRounds', 'currentRound']), // Map store states
    },
  data(){
    return{
      maps:[],
      selectedMap: null,
      selectedRounds: null,
    }
    },
    mounted() {
      alert("hello");
      getAllMaps().then(response => {
        this.maps = response.data;

        console.log(response);
      });

    },
    methods: {
      ...mapActions(useGameStore, ['startTheGame','setTotalRounds', 'goToNextRound', 'setTotalRounds', 'setLocations']), // Map store actions
    selectMap(mapId) {
      this.selectedMap = mapId;
    },
    selectRounds(rounds) {
      this.selectedRounds = rounds;
    },
    async startGame(){
      if (!this.selectedMap) {
        alert('Please select a map before starting the game!');
        return;
      }
      if (!this.selectedRounds) {
        alert('Please select mount of rounds to play, before starting the game!');
        return;
      }
      await this.startTheGame(this.selectedMap, this.selectedRounds);
      await this.setLocations();

      this.$router.push({ name: 'play'});
    }
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
                 v-for="map in this.maps"
                 :name="map.name"
                 :mapId="map.mapId"
                 :image="map.image"
                 :selected="map.mapId === this.selectedMap"
                 @select-map="selectMap"
                 />
      </div>
    </div>
    <div class="round-container">
      <h3>Select amount of rounds:</h3>
      <RoundsSelector @select-rounds="selectRounds($event)"/>
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
</style>
