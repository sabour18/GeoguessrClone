<script>
  import { Loader } from '@googlemaps/js-api-loader';

  export default {
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
      },
      calcDistance() {
        const R = 6371; // Radius of the Earth in kilometers
        const lat1 = this.location.lat;
        const lng1 = this.location.lng;
        const lat2 = this.guessLocation.lat;
        const lng2 = this.guessLocation.lng;

        // Convert degrees to radians
        const toRadians = (degree) => degree * (Math.PI / 180);

        const dLat = toRadians(lat2 - lat1);
        const dLng = toRadians(lng2 - lng1);

        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(toRadians(lat1)) *
          Math.cos(toRadians(lat2)) *
          Math.sin(dLng / 2) *
          Math.sin(dLng / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c; // Distance in kilometers
      },
    },
  }
</script>

<template>
  <div class="result">
    <div id="res"></div>
    <div class="result-nums">
      <div>Distance: {{Math.round(this.calcDistance() * 100) / 100}} km</div>
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
