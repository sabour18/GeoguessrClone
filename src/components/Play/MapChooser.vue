<script scoped>
  import { Loader } from '@googlemaps/js-api-loader';
  import MouseCrosshair from "@/assets/crosshair.png";
  import Result from '../Play/Result.vue'

  export default {
    data() {
      return {
        map: null,
        marker: null,
        guessMade: false
      }
    },
    async mounted() {
      const apiOptions = {
        apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        mapId: "DEMO_MAP_ID"
      }
      const loader = new Loader(apiOptions);

      loader.load().then(() => {
        this.initMap();
      });

    },
    methods: {
      initMap() {
        if (this.marker) {
          this.marker.setMap(null);
          this.marker = null;
        }

        const mapOptions = {
          center: { lat: 0, lng: 0 },
          zoom: 1,
          disableDefaultUI: true,
          clickableIcons: false,
          zoomControl: true,
          draggableCursor: MouseCrosshair,
          draggingCursor: MouseCrosshair,
        };

        const mapDiv = document.getElementById("map");
        this.map = new google.maps.Map(mapDiv, mapOptions);
        this.map.addListener("click", (event) => {
          this.addMarker(event.latLng);
        });

        this.marker = null;

      },
      addMarker(location) {
        if (this.marker) {
          this.marker.setPosition(location);
        } else {
          this.marker = new google.maps.Marker({
            position: location,
            map: this.map,
          });
        }
        this.guessMade = true;
      },
      submitGuess(e) {
        e.preventDefault();

        if (!this.marker) {
          alert("Please place a marker first");
          return;
        }

        this.$emit('show-result', this.marker);

        this.guessMade = false;
        this.initMap();
      }
    }
  }
</script>

<template>
  <div class="map-container">
    <div id="map"></div>
    <form class="submit-guess-form" @submit="submitGuess">
      <button class="guess-made"  :disabled="!this.guessMade" >Make Guess</button>
    </form>
  </div>
</template>

<style scoped>
  /*
      TODO: General Clean up, delete redundant styles
      TODO: Change to not use transform and scale for the map, container, and button
      FIX: Scaling and transform makes map blurry, and button text stretched
  */
  .map-container {
    display: flex;
    flex-direction: column;
    margin: 15px;
    height: 30vh;
    width: 20vw;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 0;
    right: 0;
    z-index: 1;
  }

  #map {
    border: 3px solid #072047;
    border-radius: 3px;
    margin: auto;
    position: relative;
    width: 100%;
    height: 100%;
    transition: transform .05s;
    opacity: 0.3;
  }

    #map:hover {
      cursor: crosshair !important;
    }

  .map-container:hover {
    height: 70vh;
    width: 50vw;
  }
  .map-container:hover #map {
    opacity: 1;
    width: 100%;
    height: 100%;
  }

  .guess-made:disabled {
    width: 100%;
    color:black;
    background-color: lightblue;
    opacity: 0.3 !important;
  }

  .guess-made {
    background-color: #072047;
    color: white;
    width: 100%;
    margin-top: 10px;
  }

  .map-container:hover .guess-made {
    opacity: 1;
  }

  .submit-guess-form {
    width: 100%;
  }
</style>
