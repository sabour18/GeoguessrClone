<script>
  import json from '../../maps/canada.json'
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
        mapJson: json.customCoordinates,
        currentLocation: null,
        guessLocation: null,
        show: false,
        rounds: 5,
        currentRound: 0,
        choosenLocations: [],
        totalScore: 0
      }
    },
    emits: [
      'show-result',
    ],
    mounted() {
      console.log(this.mapJson);
      this.getLocations();
      this.currentLocation = this.choosenLocations[this.currentRound];
    },
    methods: {
      showResult(marker) {
        this.guessLocation = JSON.parse(JSON.stringify(marker.position));

        this.show = true;
      },//showResult
      getLocations() {
        const indexes = [];

        for (let i = 0; i < this.rounds; i++) {
          let randIndex = Math.floor(Math.random() * this.mapJson.length);
          while (indexes.includes(randIndex)) {
            randIndex = Math.floor(Math.random() * this.mapJson.length);
          }
          indexes.push(randIndex);
        }

        console.log("These are the final indexes: " + indexes);

        for (let i = 0; i < indexes.length; i++) {
          this.choosenLocations.push(this.mapJson[indexes[i]]);
        }
      },//getLocations
      nextRound(score) {
        this.totalScore += score;
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
<div class="ui">
  <div>Round: {{this.currentRound+1}}/{{this.rounds}}</div>
  <div>Score: {{this.totalScore}}pts</div>
</div>
</template>

<style>
  .ui {
    position: fixed;
    z-index: 10;
    width: 300px;
    height: 50px;
    left: 0;
    top: 0;
    display:flex;
    padding: 10px;
    justify-content: space-evenly;
    align-items: center;
    background: rgb(7,32,71,0.85);
    color: white;
  }
</style>
