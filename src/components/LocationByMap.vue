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
      center: [50.951236,4.254118],
      data: [],
      map: null,
      loaded: false,
      markerlocation: null,
      pin: null
    };
  },
  methods: {
    setupLeafletMap () {
      this.map = L.map("mapContainer").setView(this.center,9);
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
      
      this.monitorClick()
    },
    monitorClick(){
        this.map.on('click', (e)=> {
            if (this.pin) {
                this.pin.setLatLng(e.latlng);
            }
            else {
                this.pin = L.marker(e.latlng,{ riseOnHover:true,draggable:true })
                this.pin.addTo(this.map);
            }
            this.$store.dispatch("updatelatlng", e.latlng)
        });
    }
  },
  mounted() {
    this.setupLeafletMap()
  },
  watch: {
    "$store.state.latlng": {
      handler: function(nv) {
        if(nv){
          this.pin.setLatLng(nv)
          this.map.panTo(nv);        

        }
        
      },
      immediate: true // provides initial (not changed yet) state
    }
  },
};
</script>

<style>
#mapContainer {
  height: 70vh;
}
</style>