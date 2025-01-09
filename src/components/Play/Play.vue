<script>
  import StreetView from '../Play/StreetView.vue'
  import MapChooser from '../Play/MapChooser.vue'
  import Result from '../Play/Result.vue'

  export default {
    components: {
      StreetView,
      MapChooser,
      Result
    },
    data() {
      return {
        currentLocation: null,
        guessLocation: null,
        show: false,
        rounds: 5,
        currentRound: 0,
        choosenLocations: [],
        totalScore: null
      }
    },
    emits: [
      'show-result',
    ],
    mounted() {
      this.getRandomCords();
      this.currentLocation = this.choosenLocations[this.currentRound];
    },
    methods: {
      showResult(marker) {
        this.guessLocation = JSON.parse(JSON.stringify(marker.position));

        this.show = true;
      },//showResult
      getRandomCords() {
        const locations = [
          { lat: 60.1710018, lng: 24.939350, country: "Finland" },
          { lat: 48.858093, lng: 2.294694, country: "France" },
          { lat: 51.510020, lng: -0.134730, country: "Great Britain" },
          { lat: 41.8902, lng: 12.4922, country: "Italy" },
          { lat: 25.195302, lng: 55.272879, country: "United Arab Emirates" },
          { lat: 1.283404, lng: 103.863134, country: "Singapore" },
          { lat: 29.976768, lng: 31.135538, country: "Egypt" },
          { lat: 40.757876, lng: -73.985592, country: "United States" },
        ];
        const availableLocations = [...locations];
        
        for (let i = 0; i < this.rounds; i++) {
          const randomIndex = Math.floor(Math.random() * availableLocations.length);
          const [s] = availableLocations.splice(randomIndex, 1);

          this.choosenLocations.push(s);
        }
      },//getRandomCords
      nextRound() {
        this.currentRound++;

        if (this.currentRound == this.rounds) {
          this.$router.push('/');
        }

        this.currentLocation = this.choosenLocations[this.currentRound];
        this.show = false;

        console.log("It is round: " + this.currentRound);
      }//nextRound
    }
  }
</script>

<template>
  <StreetView :actualLocation="this.currentLocation"/>
  <MapChooser @show-result="showResult"/>
  <Result v-if="this.show" @nextRound="nextRound" :actualLocation="this.currentLocation" :guessLocation="this.guessLocation"/>
<div class="round">
  <div>
    Round: {{this.currentRound+1}}/{{this.rounds}}
  </div>
</div>
</template>

<style>
  .round {
    position: fixed;
    z-index: 10;
    width: 200px;
    height: 50px;
    left: 0;
    top: 0;
    display:flex;
    padding: 10px;
    justify-content: end;
    align-items: center;
    background: rgb(7,32,71,0.85);
    color: white;
  }
</style>
