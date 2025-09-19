<script>
  export default {
    data(){
      return{
        rounds: [1,2,3,4,5],
        selectedRounds: null,
      }
    },
    methods: {
      selectRounds(round){
        this.selectedRounds = round;
        this.$emit('select-rounds', this.selectedRounds);
      }
    }, 
  }
</script>

<template>
  <button v-for="round in this.rounds"
          :class="{selected: round == this.selectedRounds}"
          @click="selectRounds(round)">
    {{round}}
  </button>
</template>

<style scoped>
  .round-container {
    margin-top: 40px;
    display: flex;
    flex-direction: column;
  }

  button{
      margin:5px;
  }
  .round-container h3 {
    margin: 10px;
  }

  .selected {
    color: white;
    background: rgb(7,32,71,0.85);
  }
</style>
