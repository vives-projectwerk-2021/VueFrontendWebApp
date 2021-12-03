<template>
  <div>
    
    <v-card class="mb-6" elevation="5" >
      <v-card-title>Device name: {{ devicevalues.info.devicename }}</v-card-title>
      <v-card-text>firstname:  {{ devicevalues.info.firstname }} </v-card-text>
      <v-card-text>Lastname:  {{ devicevalues.info.lastname }} </v-card-text>
      <v-card-text>📍 Location:  {{ devicevalues.info.location }} </v-card-text>
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
    <!-- <p>{{devicevalues}} </p> -->
    <div v-for="value in devicevalues.value" :key="value">
      <div v-if="value.moisture=='level4' "> 
      {{value._value}}
      {{value.moisture}}
      <p>------------------------------------------------</p>
      </div>
    </div>

    <div>

      <line-chart
      :v-if="loaded" 
      :chartdata="chartdata"
      :options="options" />

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
      chartdata:  {
        labels: [1,2,3,4,5,6,7],
        datasets: [
          {
            label: "temp",
            data: [2, 10, 5, 9, 0, 6, 20],
            backgroundColor: "transparent",
            borderColor: "red",
            pointBackgroundColor: "black"
          }
        ]
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
    this.dataForChart()
  },
  computed:{
    devicevalues() {
      return this.$store.getters.devicevalues
    },
    liveDeviceValues() {
      return this.$store.state.liveDeviceValues
    },
    ws() {
      return this.$store.state.ws
    },
  },
  methods: {
    retryWsConnection() {
      this.$store.dispatch('tryWsConnection')
    },
    dataForChart() {

      
      let devicevalues = this.$store.getters.devicevalues
      console.log("datatest")
      console.log(devicevalues.value[0]._value)
      
    }
  },
}
</script>
