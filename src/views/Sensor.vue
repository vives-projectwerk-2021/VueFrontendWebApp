<template>
  <div>
    <v-card class="mb-6" elevation="5" v-if="devicevalues.id">
      <v-card-title>Device name: {{ devicevalues.name }}</v-card-title>
      <v-card-text v-if="devicevalues.location.place_name"
        >📍 Location: {{ devicevalues.location.place_name }}
      </v-card-text>
      <v-card-text v-else
        >📍 Location: [{{ devicevalues.location.lat }},
        {{ devicevalues.location.long }}]
      </v-card-text>
    </v-card>
    <div>
      <div v-if="loadingWS">
        <p>Waiting for websocket connection</p>
        <v-progress-linear
          indeterminate
          color="yellow darken-2"
        ></v-progress-linear>
      </div>

      <div v-else>
        <v-card
          v-if="!ws || ws.readyState != 1"
          class="mx-auto text-center pa-6 red accent-1"
        >
          <h3>No WebSocket Connection</h3>
          <v-btn @click="retryWsConnection" elevation="2" large outlined
            >Retry Connecting
          </v-btn>
        </v-card>

        <div
          v-else-if="liveDeviceValues && liveDeviceValues.device_id == deviceId"
        >
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

      <v-card class="mt-6" elevation="5" v-if="devicevalues.values">
        <v-card-title>Moisture</v-card-title>
          <line-chart 
            v-if="devicevalues.values"
            :dataset="dataForMoistureChart" />
      </v-card>

      <v-card class="mt-6" elevation="5" v-if="devicevalues.values">
        <v-card-title>Temperature</v-card-title>
        <line-chart
          v-if="devicevalues.values"
          :dataset="dataForTemperatureChart"
        />
      </v-card>
      <v-card class="mt-6" elevation="5" v-if="devicevalues.values">
        <v-card-title>Battery</v-card-title>
        <line-chart
          v-if="devicevalues.values"
          :dataset="dataForBatteryChart"
        />
      </v-card>
      <v-card class="mt-6" elevation="5" v-if="devicevalues.values">
        <v-card-title>Light</v-card-title>
        <line-chart
          v-if="devicevalues.values"
          :dataset="dataForlightChart"
        />
      </v-card>
    </div>
  </div>
</template>

<script>
import LiveData from "@/components/LiveData";
import LineChart from "@/components/Chart.vue";
import MoistureHelper from "@/helpers/moistureHelper.js";

export default {
  name: "Sensor",
  components: {
    LiveData,
    LineChart,
  },
  data() {
    return {
      loadingWS: true,
      deviceId: this.$route.params.deviceId,
    };
  },
  created() {
    this.$store.dispatch("getSensorById", this.deviceId);
    this.$store.dispatch("deviceListener", this.deviceId);
    if (this.$store.state.wsReadyState != 1) {
      setTimeout(() => {
        this.retryWsConnection();
        this.loadingWS = false;
      }, 1000);
    } else {
      this.loadingWS = false;
    }
  },
  computed: {
    devicevalues() {
      return this.$store.getters.devicevalues;
    },
    liveDeviceValues() {
      return this.$store.state.liveDeviceValues;
    },
    ws() {
      return this.$store.state.ws;
    },
    dataForMoistureChart() {
      let values = this.devicevalues.values;
      if (values == undefined) {
        return 0;
      }
      let time = values.map((values) => {
        return values.time;
      });
      let allMoisture = values.map((values) => {
        return values.moisture;
      });
      let yvalues = [
        MoistureHelper.get_level_values(allMoisture, 0),
        MoistureHelper.get_level_values(allMoisture, 1),
        MoistureHelper.get_level_values(allMoisture, 2),
        MoistureHelper.get_level_values(allMoisture, 3)
      ];
      let xlabels = ["level 1", "level 2", "level 3", "level 4"];

      return {
        label: xlabels,
        labels: time,
        values: yvalues,
      };
    },
    dataForTemperatureChart() {
      let values = this.devicevalues.values;
      let time,
        airTemperature,
        groundTemperature = 0;
      if (values == undefined) {
        return 0;
      }
      time = values.map((values) => {
        return values.time;
      });

      airTemperature = values.map((values) => {
        return values.temperature.air;
      });

      groundTemperature = values.map((values) => {
        return values.temperature.ground;
      });
      let yvalues = [groundTemperature,airTemperature];
      let xlabels = ["groundTemperature","airTemperature"];

      return {
        label: xlabels,
        labels: time,
        values: yvalues,
      };
    },
    dataForBatteryChart() {
      let values = this.devicevalues.values;
      if (values == undefined) {
        return 0;
      }
      let time = values.map((values) => {
        return values.time;
      });

     let battery = values.map((values) => {
        return values.battery_voltage;
      });

      return {
        label: ["battery"],
        labels: time,
        values: [battery],
      };
    },
    dataForlightChart() {
      let values = this.devicevalues.values;
      if (values == undefined) {
        return 0;
      }
      let time = values.map((values) => {
        return values.time;
      });

     let light = values.map((values) => {
        return values.light;
      });

      return {
        label: ["light"],
        labels: time,
        values: [light],
      };
    },
  },
  methods: {
    retryWsConnection() {
      this.$store.dispatch("tryWsConnection");
    },
  },
};
</script>
