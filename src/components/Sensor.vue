<template>
  <div>
    <div v-if="loadingWS">
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
        <h1>{{deviceValues.device_id}}</h1>
        <vue-ellipse-progress
          :progress="(100/50)*deviceValues.sensors.temperature.air.value"
          :determinate="false"
          color="#009E45"
          empty-color="#324c7e"
          :size="180"
          :thickness="5"
          :empty-thickness="3"
          lineMode="in 10"
          :legend-value="deviceValues.sensors.temperature.air.value"
          animation="loop 700 1000"
          fontSize="1.5rem"
          font-color="#009E45"
          dash="4"
          :loading="false"
        >
          <span slot="legend-value">°C</span>
          <p slot="legend-caption">Air temperature</p>
        </vue-ellipse-progress>


        <vue-ellipse-progress
          class="ml-14"
          :progress="deviceValues.sensors.moisture.level1.value"
          :determinate="false"
          color="#009E45"
          empty-color="#324c7e"
          :size="180"
          :thickness="5"
          :empty-thickness="3"
          lineMode="in 10"
          :legend-value="deviceValues.sensors.moisture.level1.value"
          animation="loop 700 1000"
          fontSize="1.5rem"
          font-color="#009E45"
          dash="4"
          :loading="false"
        >
          <span slot="legend-value">%</span>
          <p slot="legend-caption">Moisture level1</p>
        </vue-ellipse-progress>
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
export default {
  name: 'Sensor',

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
    deviceValues() {
      return this.$store.state.deviceValues
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
