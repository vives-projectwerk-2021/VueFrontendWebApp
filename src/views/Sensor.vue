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

      <div v-else-if="hasReceivedValues" :key="sensorsComponentsUpdate">
        <v-card v-for="device in liveDeviceValues" :key="device.device_id">
          <LiveData :liveValues="device" class="ma-4" />
        </v-card>
      </div>

      <div v-else>
        <p>Waiting for data...</p>
        <v-progress-linear
        indeterminate
        color="yellow darken-2"
        ></v-progress-linear>
      </div>

    </div>
  </div>
    <div v-for="field in Object.keys(devicevalues)" :key="field">
      {{field}}: {{ devicevalues[field] }}
    </div>
  </div>
</template>

<script>
import LiveData from '@/components/LiveData'
import { mapState } from 'vuex'

export default {
  name: "Sensor",
  components: {
    LiveData
  },
  data() {
    return {
      loadingWS: true,
    }
  },
  created(){
    this.$store.dispatch("getSensorById",this.$route.params.deviceId)
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
    ...mapState([
      'devicevalues'
    ]),
        liveDeviceValues() {
      return this.$store.state.liveDeviceValues
    },
    sensorsComponentsUpdate() {
      return this.$store.state.sensorsComponentsUpdate
    },
    hasReceivedValues() {
      return this.$store.state.hasReceivedData
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
