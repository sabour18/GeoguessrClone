<script>
  import { Loader } from '@googlemaps/js-api-loader';
  import { calcDistance, calcScore } from "@/utils/helpers.js";
  import { roundResultOptions } from "@/utils/mapOptions.js";
  import useGameStore from '@/stores/store'

  export default {
    data() {
      return {
        score: null,
        distance: null,
        markers: [],
        line: null
      }
    },
    computed: {
      gameStore() {
        return useGameStore();
      }
    },
    props: {
      actualLocation: Object,
      guessLocation: Object,
    },
    async mounted() {
      const apiOptions = {
        apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
      }

      const loader = new Loader(apiOptions);

      loader.load().then(() => {
        this.initFinalResultMap();
      });
    },
    methods:{
      async initFinalResultMap() {
        const mapDiv = document.getElementById("res");
        this.map = new google.maps.Map(mapDiv, roundResultOptions);
        
        
        this.addFinalMarkers();
      },  
      async addFinalMarkers() {
        for (let i = 0; i < this.gameStore.totalRounds; i++){
          this.drawLines(i);
          this.drawMarkers(i);
        }
      },
      async drawMarkers(index) {
        const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

        const actualMarker = new AdvancedMarkerElement({
          map: this.map,
          position: { lat: this.gameStore.locations[index].lat, lng: this.gameStore.locations[index].lng },
        });
        this.markers.push(actualMarker);

        const guessPin = document.createElement("img");
        guessPin.src = "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
        const guessMarker = new AdvancedMarkerElement({
          map: this.map,
          position: { lat: this.gameStore.guessedLocations[index].lat, lng: this.gameStore.guessedLocations[index].lng },
          content: guessPin,
        });
        this.markers.push(guessMarker);
      },
      drawLines(index) {
        const lineSymbol = {
          path: "M 0,-1 0,1",
          strokeOpacity: 1,
          strokeWeight: 2,
          scale: 3,
        };

        this.line = new google.maps.Polyline({
          path: [
            new google.maps.LatLng(this.gameStore.locations[index].lat, this.gameStore.locations[index].lng),
            new google.maps.LatLng(this.gameStore.guessedLocations[index].lat, this.gameStore.guessedLocations[index].lng)
          ],
          strokeOpacity: 0,
          icons: [
            {
              icon: lineSymbol,
              offset: "0",
              repeat: "20px",
            },
          ],
          map: this.map
        });
      },
      finishGame() {
        this.$router.push('/');
      }
    },
  }
</script>

<template>
  <div class="result">
    <div id="res"></div>
    <div class="result-nums"
         v-for="(round, index) in this.gameStore.locations">
      <div class="distance">Round {{index+1}}</div>
      <div class="score">Score: 0 pts</div>
    </div>
    <button class="result-button" @click="this.finishGame">End Game</button>
  </div>
</template>

<style scoped>
  .result {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 10;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items: center;
    background: rgb(7,32,71,0.85);
  }

  .result-nums{
    width: 50%;
    margin:20px;
    display:flex;
    justify-content: space-between;
  }
  .distance, .score{
      color:white;
  }
  #res {
    position: relative;
    width: 900px;
    height: 500px;
  }
</style>
