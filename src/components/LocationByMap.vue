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
      pin: null,
      maxBounds: [
        //south west
        [-90, -180],
        //north east
        [90, 180],
      ],
    };
  },
  methods: {
    setupLeafletMap () {
      this.map = L.map("mapContainer").setView(this.center,9);
      L.tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
        {
          minZoom: 2,
          maxZoom: 18,
          id: "mapbox/streets-v11",
          accessToken: config.VUE_APP_MAPBOX_TOKEN,
        }
      ).addTo(this.map);
      this.map.setMaxBounds(this.maxBounds);

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
    },
    monitorDrag(){
      this.pin.on('dragend', (e)=> {
        var marker = e.target;  // you could also simply access the marker through the closure
        var result = marker.getLatLng(); 
        this.$store.dispatch("updatelatlng", result)

      });
    },
  },
  
  mounted() {
    this.setupLeafletMap()
  },
  watch: {
    "$store.state.latlng": {
      handler: function(nv) {
        setTimeout(() =>  100);
        if(nv){
          if(this.pin){
            this.pin.setLatLng(nv)          
          }
          else{
            this.pin = L.marker(nv,{ riseOnHover:true,draggable:true })
            this.pin.setLatLng(nv)          
            this.pin.addTo(this.map);
          }
          this.map.panTo(nv)
          this.monitorDrag()

        }
        
      },
    }
  },
};
</script>

<style>
#mapContainer {
  height: 70vh;
}
</style>