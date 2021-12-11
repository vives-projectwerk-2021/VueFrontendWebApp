<template>
  <div>
    <v-card class="mb-6" elevation="5" v-if="devicevalues.id" >
      <v-card-title>Device name: {{ devicevalues.name }}</v-card-title>
      <v-card-text v-if="devicevalues.location.place_name">📍 Location:  {{ devicevalues.location.place_name }} </v-card-text>
      <v-card-text v-else>📍 Location:  [{{ devicevalues.location.lat }}, {{ devicevalues.location.long }}] </v-card-text>
    </v-card>
    <div>
      <div v-if="loadingWS" >
        <p>Waiting for websocket connection</p>
        <v-progress-linear
          indeterminate
          color="yellow darken-2"
        ></v-progress-linear>
      </div>

      <div v-else>
        <v-card v-if="!ws || ws.readyState != 1" class="mx-auto text-center pa-6 red accent-1">
          <h3>No WebSocket Connection</h3>
          <v-btn @click="retryWsConnection" 
            elevation="2"
            large
            outlined
            >Retry Connecting
          </v-btn>
        </v-card>

        <div v-else-if="liveDeviceValues && liveDeviceValues.device_id == deviceId">
          <v-card>
            <LiveData :liveValues="liveDeviceValues" class="ma-4" />
          </v-card>
        </div>

        <div v-else>
          <p>Waiting for live data...</p>
          <v-progress-linear
          indeterminate
          color="yellow darken-2"
          ></v-progress-linear>
        </div>
      </div>
    </div>   
    <div>
      <line-chart
      v-if="devicevalues.value" 
      :dataset="level4Values"
      :options="chartOptions" />
    </div>
  </div>
</template>

<script>
import LiveData from '@/components/LiveData'
import LineChart from '@/components/Chart.vue'


export default {
  name: "Sensor",
  components: {
    LiveData,
    LineChart
  },
  data() {
    return {
      loadingWS: true,
      deviceId: this.$route.params.deviceId,
      chartOptions:  {
            label: "Humidity",
            backgroundColor: "transparent",
            borderColor: "red",
            pointBackgroundColor: "black"
      },

    }
  },
  created(){
    this.$store.dispatch("getAllSensors")
    if(this.devicelist.find(x => x.deviceid === this.deviceId)) {
      this.$store.dispatch("getSensorById", this.deviceId)
      this.$store.dispatch("deviceListener" , this.deviceId)
      if (this.$store.state.wsReadyState != 1) {
        setTimeout(() => {
          this.retryWsConnection()
          this.loadingWS = false
        }, 1000)
      } else {
        this.loadingWS = false
      }
    }
    else {
      this.$store.dispatch("updateDeviceId", this.deviceId);
      this.$router.push({ name: 'AddSensor'})
    }
    
  },
  computed:{
    devicevalues() {
      return this.$store.getters.devicevalues
    },
    devicelist() {
      return this.$store.getters.devicelist
    },
    liveDeviceValues() {
      return this.$store.state.liveDeviceValues
    },
    ws() {
      return this.$store.state.ws
    },
    level4Values() {
      const level4 = this.devicevalues.value
        .filter((element)=>{
          return element.moisture === "level4"
        })

      return {
        labels:  level4.map((element)=> {
         return element._time
        })
        ,
        values: level4.map((element)=>{
          return element._value
        })
      }

    },
  },
  methods: {
    retryWsConnection() {
      this.$store.dispatch('tryWsConnection')
    },
    dataForChart() {

      
    },
  },
  watch: {
    
  }

}
</script>
