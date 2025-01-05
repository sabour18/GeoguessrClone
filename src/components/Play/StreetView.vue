<script scoped>
  import { Loader } from '@googlemaps/js-api-loader';

  export default {
    data() {
      return {
        locations: []
      }
    },
    props: {
      actualLocation: Object,
    },
    async mounted() {
      const apiOptions = {
        apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
      }

      const loader = new Loader(apiOptions);

      loader.load().then(() => {
        this.displayMap();
      });

    },
    methods: {
      displayMap() {
        const mapOptions = {
          position: this.actualLocation,  
          pov: { heading: 165, pitch: 0 },
          zoomControlOptions: {
            position: google.maps.ControlPosition.LEFT_BOTTOM,
          },
          panControlOptions: {
            position: google.maps.ControlPosition.LEFT_BOTTOM,
          },
          addressControl: false,
          fullscreenControl: false,
          scaleControl: false,
        }

        const mapDiv = document.getElementById("pano");
        const map = new google.maps.StreetViewPanorama(mapDiv, mapOptions);
            }
    },
  }
</script>

<template>
  <div class="pano-container">
    <div id="pano"></div>
  </div>
</template>

<style scoped>
  .pano-container {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #pano {
    margin: auto;
    position: relative;
    width: 98vw;
    height: 98vh;
    overflow: hidden;
  }
</style>
