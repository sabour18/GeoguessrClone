import { defineStore } from 'pinia'
import { getLocationsByMapId } from '@/services/mapsService';

const useGameStore = defineStore('game', {
  state: () => ({
    selectedMap: null,
    isPlayingGame: false,
    totalRounds: null,
    currentRound: 1,
    locations: [],
    currentLocation: null,
    currentScore: 0,
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
    goToNextRound(score) {
      this.currentScore += score;
      this.currentRound += 1;
      this.currentLocation = this.locations[this.currentRound - 1];
      console.log(this.locations);
    },
    setTotalRounds(rounds) {
      this.totalRounds = rounds;
    },
    exitGame() {
      this.currentRound = 1;
      this.currentLocation = null;
      this.locations = null;
      this.isPlayingGame = false;
    },
    async setLocations() {
      try {
        const response = await getLocationsByMapId(this.selectedMap);
        const tempLocations = response.data;

        const indexes = [];
        // get number of rounds of random indexes, cant be duplicates
        for (let i = 0; i < this.totalRounds; i++) {
          let randIndex = Math.floor(Math.random() * tempLocations.length);
          while (indexes.includes(randIndex)) {
            randIndex = Math.floor(Math.random() * tempLocations.length);
          }
          indexes.push(randIndex);
        }

        this.locations = indexes.map((index) => tempLocations[index]);
        this.currentLocation = this.locations[this.currentRound-1];      
      } catch (error) {
        console.error('Failed to retrieve map locations.', error);
      }
    }
  }
});
export default useGameStore;
