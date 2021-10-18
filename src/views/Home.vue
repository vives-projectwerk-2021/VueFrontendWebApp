<template>
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

      <div v-else-if="hasReceivedValues">
        <v-card v-for="device in liveDeviceValues" :key="device.device_id">
          <Sensor :liveValues="device" class="ma-4"/>
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
</template>

<script>
// @ is an alias to /src

import Sensor from '@/components/Sensor'

export default {
  name: 'Home',

  components: {
    Sensor
  },

  data() {
    return {
      loadingWS: true
    }
  },

  created() {
    if (this.$store.state.wsReadyState != 1) {
      setTimeout(() => {
        this.retryWsConnection()
        this.loadingWS = false
      }, 1000)
    } else {
      this.loadingWS = false
    }
  },

  computed: {
    liveDeviceValues() {
      return this.$store.state.liveDeviceValues
    },
    hasReceivedValues(){
      return this.$store.state.hasReceivedData
    },
    ws(){
      return this.$store.state.ws
    },
  },

  methods: {
    retryWsConnection(){
      this.$store.dispatch('tryWsConnection')
    },
  },
}
</script>
