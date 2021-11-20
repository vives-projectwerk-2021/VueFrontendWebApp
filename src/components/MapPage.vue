<template>
  <div id="container">
    <h1>Map with sensor-devices.</h1>
    <div id="mapContainer"></div>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Icon } from 'leaflet';
import { config } from '@/config.js'
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
      L.tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
        {
          maxZoom: 18,
          id: "mapbox/streets-v11",
          accessToken: config.VUE_APP_MAPBOX_TOKEN,
        }
      ).addTo(this.map);

      delete Icon.Default.prototype._getIconUrl;
      Icon.Default.mergeOptions({
        iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
        iconUrl: require('leaflet/dist/images/marker-icon.png'),
        shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
      });
      
      var loc = [51.2024949, 3.227196];
      var marker = L.marker(loc).addTo(this.map);
      marker.bindTooltip("Device Sensor 1");
      marker.bindPopup("<b>Device Sensor 1</b><br>Brugge Centrum<br>51.2024949, 3.227196");

      var loc2 = [51.21511504695216, 3.2265794559620704];
      var marker2 = L.marker(loc2).addTo(this.map);
      marker2.bindPopup("<b>Device Sensor 2</b><br>Sint-Gillis Kerk<br>51.21511504695216, 3.2265794559620704");
      marker2.bindTooltip("Device Sensor 2");
    },
  },
  mounted() {
    this.setupLeafletMap();
  },
};
</script>

<style>
h1 {
  text-align: center;
  margin: 20px;
}
#mapContainer {
  width: 100%;
  height: 100vh;
}
</style>