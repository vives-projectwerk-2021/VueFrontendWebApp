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
      <v-select
      label="Choose Data"
      :items="dropdownItems"
      multiple
      @change="dropdownSelect($event)"
      >
      </v-select>
      <line-chart
        v-if="devicevalues.values"
        :dataset="dataForChart"
      />
      <p>{{dataForChart}}</p>
    </div>
  </div>
</template>

<script>
import LiveData from "@/components/LiveData";
import LineChart from "@/components/Chart.vue";
export default {
  name: "Sensor",
  components: {
    LiveData,
    LineChart,
  },
  data() {
    return {
      selectedItems: [],
      dropdownItems: ["moisture","airTemperature","groundTemperature",],
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
      return this.$store.getters.devicevalues
    },
    liveDeviceValues() {
      return this.$store.state.liveDeviceValues;
    },
    ws() {
      return this.$store.state.ws;
    },
    dataForChart() {
      let values = this.devicevalues.values;

      let time,
        moisture,
        airTemperature,
        groundTemperature = 0;
      time = values.map((values) => {
        return values.time;
      });

      moisture = values
        .map((values) => {
          return values.moisture;
        })
        .map((moisture) => {
          return moisture[0].value;
        });

      airTemperature = values.map((values) => {
        return values.temperature.air;
      });

      groundTemperature = values.map((values) => {
        return values.temperature.ground;
      });
      
      let yvalues = []
      let xlabels = []
      this.selectedItems.forEach((item)=> {
        switch(item) {
          case "moisture":
            yvalues.push(moisture)
            xlabels.push(item)
            break
          case "airTemperature":
            yvalues.push(airTemperature)
            xlabels.push(item)
            break
          case "groundTemperature":
            yvalues.push(groundTemperature)
            xlabels.push(item)
            break
        }
        
      })

      void (moisture, airTemperature, groundTemperature, time);
      console.log(xlabels)
      return {
        label: xlabels,
        labels: time,
        values: yvalues,
      };
    },

  },
  methods: {
    retryWsConnection() {
      this.$store.dispatch("tryWsConnection");
    },
    dropdownSelect(event) {
      this.selectedItems = event
    }
  },
};
</script>
