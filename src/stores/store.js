import { defineStore } from 'pinia'

const useGameStore = defineStore('game', {
  state: () => ({
    selectedMap: null,
    isPlayingGame: false,
    totalRounds: 5,
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
    async startTheGame(map) {
  return new Promise((resolve) => {
    this.selectedMap = map;
    this.totalRounds = 5;
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
        // Dynamically import the JSON map based on the route query parameter
        const mapFile = await import(`@/maps/${this.selectedMap}.json`);
        this.mapJson = mapFile.customCoordinates;
        // Generate locations after the map data is loaded
        const indexes = [];
        // get 5 random indexes, cant be duplicates
        for (let i = 0; i < this.totalRounds; i++) {
          let randIndex = Math.floor(Math.random() * this.mapJson.length);
          while (indexes.includes(randIndex)) {
            randIndex = Math.floor(Math.random() * this.mapJson.length);
          }
          indexes.push(randIndex);
        }

        this.locations = indexes.map((index) => this.mapJson[index]);

        this.currentLocation = this.locations[this.currentRound-1];
      } catch (error) {
        console.error('Failed to load map JSON:', error);
      }
    }
  }
});
export default useGameStore;
