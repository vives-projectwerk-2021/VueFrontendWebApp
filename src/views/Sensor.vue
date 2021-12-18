<template>
  <div>
    <v-card class="my-3" elevation="5" v-if="devicevalues.id" >
      <v-card-title>Device name: {{ devicevalues.name }}</v-card-title>
      <v-card-text v-if="devicevalues.location.place_name">📍 Location:  {{ devicevalues.location.place_name }} </v-card-text>
      <v-card-text v-else>📍 Location:  [{{ devicevalues.location.lat }}, {{ devicevalues.location.long }}] </v-card-text>
    </v-card>
    <div>
        <div v-if="liveDeviceValues && liveDeviceValues.device_id == deviceId">
          <v-card>
            <LiveData :liveValues="liveDeviceValues" class="ma-4" />
          </v-card>
        </div>
        <div v-else-if="latestDeviceValue">
          <v-card>
            <LiveData :liveValues="latestDeviceValue" class="ma-4" />
          </v-card>
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

  created(){
    this.$store.dispatch("getSensorById", this.deviceId)
    this.$store.dispatch("deviceListener" , this.deviceId)

    setTimeout(() => {
        if (this.devicevalues.id == this.deviceId) {
          //console.log("this is the device id", this.devicevalues.id);
        } else {
          //console.log("no device");
          this.$store.commit('changedeviceiddevice', this.$route.params.deviceId);
          this.$router.push({ name: 'AddSensor'});
        }
      }, 1000)

    if (this.$store.state.websocket.wsReadyState != 1) {

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
    latestDeviceValue() {
      let values = this.$store.getters.latestDeviceValue
      if (values) {
        return {
          'device_id': this.deviceId,
          'time': values.time,
          'sensors': {
            'light': {
              'value': values.light
            },
            'moisture': {
              'level1': {
                'value': values.moisture[0].value
              },
              'level2': {
                'value': values.moisture[1].value
              },
              'level3': {
                'value': values.moisture[2].value
              },
              'level4': {
                'value': values.moisture[3].value
              }
            },
            'temperature': {
              'air': {
                'value': values.temperature.air
              },
              'ground': {
                'value': values.temperature.ground
              }
            },
            'voltage': {
              'battery':  {
                'value': values.battery_voltage
              }
            }
          },
        }
      }
      return values
    },
    liveDeviceValues() {
      return this.$store.state.websocket.liveDeviceValues
    },
    ws() {
      return this.$store.state.websocket.ws
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
      this.$store.dispatch('websocket/tryWsConnection')
    }
  },
};
</script>
