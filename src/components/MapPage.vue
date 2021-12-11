<template>
  <div id="container">
    <div id="mapContainer" class="mx-1"></div>
  </div>
</template>

<script>
//import mapState from "vuex"
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
      loaded: false,
      markerarray: [],
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

      var LeafIcon = L.Icon.extend({
        options: {
          iconSize: [50, 50],
        },
      });

      var manIcon = new LeafIcon({
        iconUrl: "img/map-man-marker.png",
      });

      var liveMarker;
      this.map
        .locate({
          setView: true,
          maxZoom: 140,
        })
        .on("locationfound", (e) => {
          if (!liveMarker) {
            liveMarker = new L.marker(e.latlng, { icon: manIcon }).addTo(
              this.map
            );
          } else {
            liveMarker.setLatLng(e.latlng);
          }
          liveMarker.bindTooltip("You are here.");
          this.markerarray.push(liveMarker)
        });

      
      this.addPoints()
      
    },
    async addPoints(){
      await this.$store.dispatch('getAllSensors')
      this.$store.getters.devicelist.forEach(device =>{
        if(device.location.lat && device.location.long){
          const marker = (L.marker([device.location.lat, device.location.long]).addTo(this.map))
                   .bindTooltip(device.devicename)
                   .bindPopup(`<b>${device.devicename}</b><br>${device.location.place_name}</b><br><a href="${window.location.href}sensors/${device.deviceid}">See sensor data</a>`)
          
          this.markerarray.push(marker)

        }
      }) 
      this.map.fitBounds(L.latLngBounds(this.markerarray.map(marker => marker.getLatLng())))
    
    }
  },
  mounted() {
    this.setupLeafletMap()
  },
};
</script>

<style>
#mapContainer {
  height: 70vh;
}
</style>