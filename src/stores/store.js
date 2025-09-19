import { defineStore } from 'pinia';
import { getNumberLocations } from '@/services/mapsService';

const useGameStore = defineStore('game', {
  state: () => ({
    selectedMap: null,
    isPlayingGame: false,
    totalRounds: null,
    currentRound: 1,
    locations: [],
    currentLocation: null,
    currentScore: 0,
    roundScores: [],
    guessedLocations: [],
  }),
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'game-store',
        storage: localStorage,
      },
    ],
  },
  actions: {
    async startTheGame(map, rounds) {
      return new Promise((resolve) => {
    this.currentScore = 0;
    this.selectedMap = map;
    this.totalRounds = rounds;
    this.currentRound = 1;
    this.isPlayingGame = true;
    resolve(); // Simulate async completion
  });
    },
    recordLocation(guess) {
      this.guessedLocations[this.currentRound - 1] = guess;
    },
    goToNextRound(score) {
      this.currentScore += score;
      this.roundScores[this.currentRound - 1] = score;
      this.currentRound += 1;
      this.currentLocation = this.locations[this.currentRound - 1];
    },
    setTotalRounds(rounds) {
      this.totalRounds = rounds;
    },
    exitGame() {
      this.selectedMap = null;
      this.isPlayingGame = false;
      this.totalRounds = null;
      this.currentRound = 1;
      this.locations = [];
      this.currentLocation = null;
      this.currentScore = 0;
      this.roundScores = [];
      this.guessedLocations = [];
    },
    async setLocations() {
      try {
        console.log(this.selectedMap);
        const response = await getNumberLocations(this.selectedMap, this.totalRounds);
        //const tempLocations = response.data;

        //const indexes = [];
        //// get number of rounds of random indexes, cant be duplicates
        //for (let i = 0; i < this.totalRounds; i++) {
        //  let randIndex = Math.floor(Math.random() * tempLocations.length);
        //  while (indexes.includes(randIndex)) {
        //    randIndex = Math.floor(Math.random() * tempLocations.length);
        //  }
        //  indexes.push(randIndex);
        //}

        //this.locations = indexes.map((index) => tempLocations[index]);
        this.locations = response.data;
        console.log(response);
        this.currentLocation = this.locations[this.currentRound-1];      
      } catch (error) {
        console.error('Failed to retrieve map locations.', error);
      }
    }
  }
});
export default useGameStore;
