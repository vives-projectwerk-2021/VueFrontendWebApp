<template>
  <div>
    <v-card class="my-3" elevation="5" v-if="devicevalues.id" >
      <v-row>
        <v-col cols="9" class="py-0">
          <v-card-title>Device name: {{ devicevalues.name }}</v-card-title>
          <v-card-text v-if="devicevalues.location.place_name">📍 Location:  {{ devicevalues.location.place_name }} </v-card-text>
          <v-card-text v-else>📍 Location:  [{{ devicevalues.location.lat }}, {{ devicevalues.location.long }}] </v-card-text>
        </v-col>
        <v-col v-if="this.$store.state.wsReadyState != 1 || !liveDeviceValues || liveDeviceValues.device_id != deviceId" cols="3" class="py-0">
          <div align="center" class="mt-5" justify="end">
            <v-progress-circular
              class="mx-auto"
              indeterminate
              size="25"
            ></v-progress-circular>
            <p>Waiting for live data</p>
          </div>
        </v-col>
      </v-row>
    </v-card>
    <div>
        <div v-if="liveDeviceValues && liveDeviceValues.device_id == deviceId">
          <v-card>
            <LiveData :liveValues="liveDeviceValues" class="ma-4" />
          </v-card>
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
      return this.$store.getters.devicevalues
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
