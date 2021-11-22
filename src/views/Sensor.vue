<template>
  <div>
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
    <div v-for="value in devicevalues" :key="value">
      {{value}}: {{ devicevalues[value] }}
    </div>
  </div>
</template>

<script>
import LiveData from '@/components/LiveData'

export default {
  name: "Sensor",
  components: {
    LiveData
  },
  data() {
    return {
      loadingWS: true,
      deviceId: this.$route.params.deviceId,
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
  },
  methods: {
    retryWsConnection() {
      this.$store.dispatch('tryWsConnection')
    }
  },
}
</script>
