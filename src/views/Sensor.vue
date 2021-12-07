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
      v-if="devicevalues.values" 
      :dataset="dataForChart"
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
            backgroundColor: "transparent",
            borderColor: "red",
            pointBackgroundColor: "black"
      },

    }
  },
  created(){
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
  },
  computed:{
    devicevalues() {
      //return this.$store.getters.devicevalues

      return { "id": "270918480", "name": "boer", "location": "westlekeboarigem","values": [{ "time": "1", "moisture": [{ "value": 123, "depth": -20 }],
                "temperature": { "air": "2", "ground": "3" }, "light": "4", "battery_voltage": "5"},{"time": "2","moisture": [{ "value": 124, "depth": -20}],
                "temperature": { "air": "10", "ground": "24" }, "light": "12","battery_voltage": "303"}] }
    },
    liveDeviceValues() {
      return this.$store.state.liveDeviceValues
    },
    ws() {
      return this.$store.state.ws
    },
    dataForChart() {
      let  values = this.devicevalues.values

      let time = values.map((values)=>{
        return values.time
      })
      
      let moisture = values.map((values)=>{
        return values.moisture
      }).map((moisture)=>{
        return moisture[0].value
      })

      let airTemperature = values.map((values)=>{
        return values.temperature.air
      })

      let groundTemperature = values.map((values)=>{
        return values.temperature.ground
      })

      void(moisture,airTemperature,groundTemperature,time)
      return {label:["test","test2"],labels:[1,2],values:[[5,6],[5,3]]}
    },
  },
  methods: {
    retryWsConnection() {
      this.$store.dispatch('tryWsConnection')
    },
  },
  watch: {
    
  }

}
</script>
