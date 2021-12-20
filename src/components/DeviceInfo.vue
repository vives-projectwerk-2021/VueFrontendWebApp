<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col>
          <p class="text-h2 text-center bold"><b>Your Devices</b></p>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <p class="text-center text-h5">
            Here you can view your devices and add new ones.
          </p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6" v-for="device in devicelist" :key="device.id">
          <v-card
            v-if="device.location.lat && device.location.long"
            elevation="5"
          >
            <v-card-title
              ><router-link
                style="text-decoration: none"
                :to="{ name: 'Sensor', params: { deviceId: device.deviceid } }"
                >{{ device.devicename }}</router-link
              ></v-card-title
            >
            <v-spacer></v-spacer>
            <v-card-text>
              <v-row>
                <v-col>
                <v-card-text v-if="device.lastSend != testString"
                  ><v-icon color="red">mdi-thermometer</v-icon
                  ><b
                    >Air Temperature:
                    {{
                      Number(device.lastSend.temperature.air).toFixed(2)
                    }}°C</b></v-card-text>
                    <v-card-text v-if="device.lastSend != testString"
                  ><v-icon color="light-blue">mdi-water</v-icon
                  ><b
                    >Moisture L1:
                    {{
                      Number(device.lastSend.moisture[0].value).toFixed(2)
                    }}</b
                  ></v-card-text
                >
                <v-card-text v-if="device.lastSend != testString"
                  ><v-icon color="light-blue">mdi-water</v-icon
                  ><b
                    >Moisture L3:
                    {{
                      Number(device.lastSend.moisture[2].value).toFixed(2)
                    }}</b
                  ></v-card-text>
                  <v-card-text v-if="device.lastSend != testString"
                  ><v-icon color="light-green">mdi-battery</v-icon
                  ><b
                    >Battery Voltage:
                    {{ Number(device.lastSend.battery_voltage).toFixed(2) }}%</b
                  ></v-card-text
                >
                </v-col>
                <v-col>
                <v-card-text v-if="device.lastSend != testString"
                  ><v-icon color="red">mdi-thermometer</v-icon
                  ><b
                    >Ground Temperature:
                    {{
                      Number(device.lastSend.temperature.ground).toFixed(2)
                    }}°C</b
                  ></v-card-text>
                  <v-card-text v-if="device.lastSend != testString"
                  ><v-icon color="light-blue">mdi-water</v-icon
                  ><b
                    >Moisture L2:
                    {{
                      Number(device.lastSend.moisture[1].value).toFixed(2)
                    }}</b
                  ></v-card-text>
                <v-card-text v-if="device.lastSend != testString"
                  ><v-icon color="light-blue">mdi-water</v-icon
                  ><b
                    >Moisture L4:
                    {{
                      Number(device.lastSend.moisture[3].value).toFixed(2)
                    }}</b
                  ></v-card-text>
                  <v-card-text v-if="device.lastSend != testString"
                  ><v-icon color="yellow">mdi-brightness-4</v-icon
                  ><b
                    > Lumen:
                    {{ Number(device.lastSend.light).toFixed(5)}}</b
                  ></v-card-text
                >
                </v-col>
              </v-row>


            </v-card-text>
            <v-card-text>
              <map-lat-long
                v-if="device.location.lat && device.location.long"
                v-bind:lat="device.location.lat"
                v-bind:long="device.location.long"
                v-bind:device="device.deviceid"
              />
            </v-card-text>

            <v-card-actions>
              <v-spacer />
              <delete-sensor-button :sensorid="device.deviceid" />
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-btn
      elevation="2"
      color="green"
      :to="{ name: 'AddSensor' }"
      fab
      dark
      large
      fixed
      bottom
      right
      ><v-icon>mdi-plus</v-icon></v-btn
    >
  </div>
</template>

<script>
import { mapState } from "vuex";
import DeleteSensorButton from "@/components/DeleteSensorButton.vue";
import MapLatLong from "@/components/MapLatLong.vue";

export default {
  name: "DeviceInfo",
  components: {
    DeleteSensorButton,
    MapLatLong,
  },
  created() {
    this.$store.dispatch("getAllSensors");
  },
  data() {
    return {
      testString: "None",
      //   d: new Date(),
      //   d2: new Date(device.lastSend.time),
      //   d3: new Date(d.getTime() - d2.getTime())
    };
  },
  computed: {
    ...mapState(["devicelist"]),
  },
};
</script>
