<script>
  import StreetView from '@/components/Game/StreetView.vue'
  import MapChooser from '@/components/Game/MapChooser.vue'
  import Result from '@/components/Game/Result.vue'
  import ExitGame from '@/components/Game/ExitGame.vue'

  import useGameStore from '@/stores/store'
  import { mapState, mapActions } from 'pinia';


  export default {
    components: {
      StreetView,
      MapChooser,
      Result,
      ExitGame
    },
    computed: {
      ...mapState(useGameStore, ['isPlayingGame', 'totalRounds', 'currentRound', 'currentScore', 'currentLocation', 'locations']), // Map store states
    },
    data() {
      return {
        mapJson: null,
        guessLocation: null,
        show: false,
      }
    },
    emits: [
      'show-result',
    ],
    methods: {
      ...mapActions(useGameStore, ['setTotalRounds', 'goToNextRound']), // Map store actions
      showResult(marker) {
        this.guessLocation = JSON.parse(JSON.stringify(marker.position));

        this.show = true;
      },//showResult
      nextRound(score) {
        this.goToNextRound(score);

        if (this.currentRound == this.totalRounds) {
          this.$router.push('/');
        }

        this.show = false;
      }//nextRound
    }
  }
</script>

<template>
  <StreetView/>
  <MapChooser @show-result="showResult"/>
  <Result v-if="this.show" @nextRound="nextRound" :actualLocation="this.currentLocation" :guessLocation="this.guessLocation"/>
<div class="ui">
  <div>Round: {{this.currentRound}}/{{this.totalRounds}}</div>
  <div>Score: {{this.currentScore}}pts</div>
</div>
  <ExitGame></ExitGame>
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
    border-bottom-right-radius: 10px;
  }
</style>
