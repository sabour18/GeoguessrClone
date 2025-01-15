<script>
  export default {
    props: {
      name: String,
      mapId: String,
      selected: Boolean
    },
    methods: {
      selectMap() {
        this.$emit('select-map', this.mapId);
      },//selectMap  
    },
  }
</script>

<template>
  <div class="card-container" :class="{selected: selected}" @click="selectMap">
    <div class="card-image">
      <img :src="`../../../public/maps/${this.mapId}.png`"/>
    </div>
    <h3>{{this.name}}</h3>
  </div>
</template>

<style scoped>
  .card-container {
    padding:3px;
    height: 216px;
    width: 320px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    transition: 0.1s;
  }

  .card-container:hover{
    cursor:pointer;
    transform: scale(1.15);
    transition:0.1s;
  }

  .card-image {
    height:80%;
    background: white;
    overflow:hidden;
    border-radius: 8px;
  }

  .card-image img{
    width:100%;
    height: auto;
  }

  .card-container.selected {
    opacity:0.5;
    transform: scale(1.15);
    transition: 0.2s ease-in-out;
    border: 2px solid #073071;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
</style>
