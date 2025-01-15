<script>
  export default {
    props: {
      name: String,
      mapId: String
    },
    methods: {
      selectMap() {
        this.$emit('select-map', this.mapId);
      }//selectMap
    }
  }
</script>

<template>
  <div class="card-container" @click="selectMap">
    <div class="card-image">
      <img/>
    </div>
    <h3>{{this.name}}</h3>
  </div>
</template>

<style scoped>
  .card-container {
    height: 170px;
    width: 190px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    transition: 0.1s;
  }

  .card-container:hover{
    cursor:pointer;
    transform: scale(1.1);
    transition:0.1s;
  }

  .card-image {
    height:80%;
    background: white;
    border-radius: 8px;
  }
</style>
