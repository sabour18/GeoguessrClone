<script>
  import { Loader } from '@googlemaps/js-api-loader';
  import { calcDistance } from "../../utils/helpers.js";


  export default {
    data() {
      return {
        distance: null,
      }
    },
    props: {
      location: Object,
      guessLocation: Object,
    },
    async mounted() {
      const apiOptions = {
        apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
      }

      const loader = new Loader(apiOptions);

      loader.load().then(() => {
        this.displayMap();
        this.distance = calcDistance(this.location, this.guessLocation);
      });
    },
    methods:{
      async displayMap() {
        const {AdvancedMarkerElement} = await google.maps.importLibrary("marker");

        const mapOptions = {
            center: { lat: 0, lng: 0 },
            zoom: 1,
            disableDefaultUI: true,
            mapId: "DEMO_MAP_ID"
        };

        const mapDiv = document.getElementById("res");
        this.map = new google.maps.Map(mapDiv, mapOptions);

        const marker = new AdvancedMarkerElement({
          map: this.map,
          position: this.location,
          title: this.location.country,
        });

        const guessPin = document.createElement("img");
        guessPin.src = "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
        const guessMarker = new AdvancedMarkerElement({
          map: this.map,
          position: { lat: this.guessLocation.lat, lng: this.guessLocation.lng },
          content: guessPin,
        });

        this.drawLine();
      },
      drawLine() {
        const lineSymbol = {
          path: "M 0,-1 0,1",
          strokeOpacity: 1,
          strokeWeight: 2,
          scale: 3,
        };

        const line = new google.maps.Polyline({
          path: [
            new google.maps.LatLng(this.location.lat, this.location.lng),
            new google.maps.LatLng(this.guessLocation.lat, this.guessLocation.lng)
          ],
          strokeOpacity: 0,
          icons: [
            {
              icon: lineSymbol,
              offset: "0",
              repeat: "20px",
            },
            ],
          map: this.map
        })
      }
    },
  }
</script>

<template>
  <div class="result">
    <div id="res"></div>
    <div class="result-nums">
      <div>Distance: {{ this.distance }} km</div>
    </div>
    <button class="result-button">Next</button>
  </div>
</template>

<style scoped>
  .result {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 10;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items: center;
    background: rgb(7,32,71,0.85);
  }

  .result-nums{
    width: 35%;
    margin:20px;
    display:flex;
    justify-content: space-between;
  }

  #res {
    position: relative;
    width: 900px;
    height: 500px;
  }
</style>
