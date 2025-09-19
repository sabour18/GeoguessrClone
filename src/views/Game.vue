<script>
  import StreetView from '@/components/Game/StreetView.vue'
  import MapChooser from '@/components/Game/MapChooser.vue'
  import Result from '@/components/Game/Result.vue'
  import ExitGame from '@/components/Game/ExitGame.vue'
  import FinalResult from '@/components/Game/FinalResult.vue'

  import useGameStore from '@/stores/store'
  import { mapState, mapActions } from 'pinia';


  export default {
    components: {
      StreetView,
      MapChooser,
      Result,
      ExitGame,
      FinalResult,
    },
    computed: {
      ...mapState(useGameStore, ['recordLocation', 'isPlayingGame', 'totalRounds', 'currentRound', 'currentScore', 'currentLocation', 'locations']), // Map store states
      isLastRound() {
        return this.currentRound >= this.totalRounds;
      }
    },
    data() {
      return {
        mapJson: null,
        guessLocation: null,
        show: false,
        showFinalResult: false,
      }
    },
    emits: [
      'show-result',
    ],
    methods: {
      ...mapActions(useGameStore, ['recordLocation','setTotalRounds', 'goToNextRound']), // Map store actions
      showResult(marker) {
        this.guessLocation = JSON.parse(JSON.stringify(marker.position));

        this.show = true;
      },//showResult
      nextRound(score) {
        if (this.isLastRound) {
          this.showFinalResult = true;
        } else {
          this.goToNextRound(score);
        }
        this.show = false;
      }//nextRound
    }
  }
</script>

<template>
  <StreetView/>
  <MapChooser @show-result="showResult"/>
  <Result v-if="this.show" @nextRound="nextRound" :actualLocation="this.currentLocation" :guessLocation="this.guessLocation" :isLastRound="this.isLastRound"/>
  <FinalResult v-if="this.showFinalResult"></FinalResult>
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
