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
      <v-select
        label="Choose Data"
        :items="dropdownItems"
        multiple
        @change="dropdownSelect($event)"
      >
      </v-select>
      <line-chart v-if="devicevalues.values" :dataset="dataForChart" />
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
      dropdownItems: ["moisture", "airTemperature", "groundTemperature"],
      loadingWS: true,
      deviceId: this.$route.params.deviceId,
    };
  },
  created(){
    this.$store.dispatch("getAllSensors")
    if(this.devicelist.find(x => x.deviceid === this.deviceId)) {
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
    }
    else {
      this.$store.dispatch("updateDeviceId", this.deviceId);
      this.$router.push({ name: 'AddSensor'})
    }
    
  },
  computed: {
    devicevalues() {
      return this.$store.getters.devicevalues;
    },
    devicelist() {
      return this.$store.getters.devicelist
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
      if (values == undefined) {
        return 0;
      }
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

      let yvalues = [];
      let xlabels = [];
      this.selectedItems.forEach((item) => {
        switch (item) {
          case "moisture":
            yvalues.push(moisture);
            xlabels.push(item);
            break;
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

      void (moisture, airTemperature, groundTemperature, time);
      console.log(xlabels);
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
      this.selectedItems = event;
    },
  },
};
</script>
