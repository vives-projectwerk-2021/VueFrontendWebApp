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
            <v-card-text class="pt-0">
              <ul>
                <li><b>Device ID: </b> {{ device.deviceid }}</li>
                <li v-if="device.location.place_name">
                  <b>Location: </b> {{ device.location.place_name }}
                </li>
                <li v-else>
                  <b>Location: </b>[{{ device.location.lat }},
                  {{ device.location.long }}]
                </li>
                <li>
                  <b>Moisture L1: </b> {{lastSend.moisture.value}}
                </li>
                <li>
                  <b>Moisture L2: </b> {{}}
                </li>
                <li>
                  <b>Moisture L3: </b> {{}}
                </li>
                <li>
                  <b>Moisture L4: </b> {{}}
                </li>
              </ul>
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

  computed: {
    ...mapState(["devicelist"]),
  },
};
</script>
