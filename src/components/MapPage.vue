<template>
  <div id="container">
    <h1>Map with sensor-devices.</h1>
    <div id="mapContainer"></div>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
export default {
  name: "Map",
  data() {
    return {
      center: [51.209348, 3.2246995],
      data: [],
      map: null,
    };
  },
  methods: {
    setupLeafletMap () {
      this.map = L.map("mapContainer").setView(this.center, 14);
      L.marker([51.209348, 3.2246995]).addTo(mapLeaflet);
      L.tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
        {
          maxZoom: 18,
          id: "mapbox/streets-v11",
          accessToken:
            "pk.eyJ1IjoiYXJ0aHVyMiIsImEiOiJja3c3djNudHMwOGY2Mm5zM2w1d2MzengyIn0.1Ihd1j68_0ipew2AjE85Hw",
        }
      ).addTo(this.map);
    },
  },
  mounted() {
    this.setupLeafletMap();
  },
};
</script>

<style>

#info {
  width: 18vw;
  height: 100vh;
}
#mapContainer {
  width: 80vw;
  height: 100vh;
}
</style>