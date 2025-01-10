<script scoped>
  import { Loader } from '@googlemaps/js-api-loader';
  import { streetViewOptions } from "@/utils/mapOptions.js";

  export default {
    data() {
      return {
        streetViewMap: null
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
        this.initStreetView();
      });

    },
    watch: {
      actualLocation: {
        handler(newLocation) {
          if (this.streetViewMap) {
            this.streetViewMap.setPosition(newLocation);
          }
        },
        deep: true,
      },
    },
    methods: {
      initStreetView() {
        const mapDiv = document.getElementById("pano");
        this.streetViewMap = new google.maps.StreetViewPanorama(mapDiv, streetViewOptions);
        this.streetViewMap.setOptions(
          {
            mapTypeControlOptions: {
              position: this.actualLocation
            },
            zoomControlOptions: {
              position: google.maps.ControlPosition.LEFT_BOTTOM
            },
            panControlOptions: {
              position: google.maps.ControlPosition.LEFT_BOTTOM
            }
          }
        );
        setTimeout(() => {
          streetView.setPosition(this.actualLocation);
        }, 100);
      },//initStreetView
    }
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
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }
</style>
