<template>
  <div>
    <v-card class="my-3" elevation="5" v-if="devicevalues.id" >
      <v-row>
        <v-col cols="9" class="py-0">
          <v-card-title>Device name: {{ devicevalues.name }}</v-card-title>
          <v-card-text v-if="devicevalues.location.place_name">📍 Location:  {{ devicevalues.location.place_name }} </v-card-text>
          <v-card-text v-else>📍 Location:  [{{ devicevalues.location.lat }}, {{ devicevalues.location.long }}] </v-card-text>
        </v-col>
        <v-col v-if="this.$store.state.websocket.wsReadyState != 1 || !liveDeviceValues || liveDeviceValues.device_id != deviceId" cols="3" class="py-0">
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
      <v-select
        label="Choose Data"
        :items="dropdownMoistureItems"
        multiple
        @change="dropdownMoistureSelect($event)"
      />
      <line-chart v-if="devicevalues.values" :dataset="dataForMoistureChart" />
      <v-select
        label="Choose Data"
        :items="dropdownTemperatureItems"
        multiple
        @change="dropdownTemperatureSelect($event)"
      />
      <line-chart
        v-if="devicevalues.values"
        :dataset="dataForTemperatureChart"
      />
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
      selectedMoistureItems: [],
      selectedTemperatureItems: [],
      dropdownMoistureItems: [
        "moisture0",
        "moisture1",
        "moisture2",
        "moisture3",
      ],
      dropdownTemperatureItems: ["airTemperature", "groundTemperature"],
      loadingWS: true,
      deviceId: this.$route.params.deviceId,
    };
  },

  created(){
    this.$store.dispatch("getSensorById", this.deviceId)
    this.$store.dispatch("deviceListener" , this.deviceId)

    if (this.$store.state.websocket.wsReadyState != 1) {

      setTimeout(() => {
        console.log(this.devicevalues);
        this.retryWsConnection();
        this.loadingWS = false;
        if (this.devicevalues.id == this.deviceId) {
          console.log(this.devicevalues.id);
        } else {
          console.log("no device");
          this.$store.commit('changedeviceid', this.deviceId);
          this.$router.push({ name: 'AddSensor'});
        }
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
      let yvalues = [];
      let xlabels = [];
      this.selectedMoistureItems.forEach((item) => {
        switch (item) {
          case "moisture0":
            yvalues.push(MoistureHelper.get_level_values(allMoisture, 0));
            xlabels.push(item);
            break;
          case "moisture1":
            yvalues.push(MoistureHelper.get_level_values(allMoisture, 1));
            xlabels.push(item);
            break;
          case "moisture2":
            yvalues.push(MoistureHelper.get_level_values(allMoisture, 2));
            xlabels.push(item);
            break;
          case "moisture3":
            yvalues.push(MoistureHelper.get_level_values(allMoisture, 3));
            xlabels.push(item);
            break;
        }
      });
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

      let allMoisture = values.map((values) => {
        return values.moisture;
      });
      console.log(MoistureHelper.get_level_values(allMoisture, 0));
      airTemperature = values.map((values) => {
        return values.temperature.air;
      });

      groundTemperature = values.map((values) => {
        return values.temperature.ground;
      });
      let yvalues = [];
      let xlabels = [];
      this.selectedTemperatureItems.forEach((item) => {
        switch (item) {
          case "airTemperature":
            yvalues.push(airTemperature);
            xlabels.push(item);
            break;
          case "groundTemperature":
            yvalues.push(groundTemperature);
            xlabels.push(item);
            break;
        }
      });

      void (airTemperature, groundTemperature, time);
      return {
        label: xlabels,
        labels: time,
        values: yvalues,
      };
    },
  },
  methods: {
    retryWsConnection() {
      this.$store.dispatch('websocket/tryWsConnection')
    },
    dropdownMoistureSelect(event) {
      this.selectedMoistureItems = event;
    },
    dropdownTemperatureSelect(event) {
      this.selectedTemperatureItems = event;
    },
  },
};
</script>
