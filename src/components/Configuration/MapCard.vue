<script>

</script>

<template>
  <div class="card-container">
    <div class="card-image">
      <img/>
    </div>
    <p>This is a map</p>
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
