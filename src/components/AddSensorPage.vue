<template>
  <v-container>
    <v-card elevation="5">
      <v-row>
        <v-col>
          <p class="text-h2 text-center">Add a Sensor</p>
        </v-col>
      </v-row>
      <v-divider />
      <v-form ref="form" v-model="valid" class="mx-4">
        <v-row>
          <v-col class="pb-0">
            <v-text-field
              label="Device ID"
              :rules="[
                rules.required,
                rules.deviceidValidator,
                rules.devIdCounter,
              ]"
              hide-details="auto"
              v-model="deviceid"
              counter="24"
            ></v-text-field>
          </v-col>

          <SerialConnect
            v-on:deviceId="updateDeviceId"
            class="my-auto mr-3"
          ></SerialConnect>
        </v-row>

        <v-row>
          <v-col class="pt-0">
            <v-text-field
              class="pt-0"
              label="Device Name"
              :rules="[
                rules.required,
                rules.counter,
                rules.devicenameValidator,
              ]"
              hide-details="auto"
              v-model="devicename"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row class="mt-4">
          <v-col class="pb-0">
            <p class="text-subtitle-1 text-center my-0">
              Add the location of the sensor
            </p>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-text-field
              class="py-4"
              outlined
              readonly
              disabled
              dense
              hide-details="auto"
              v-model="latitude"
              label="Latitude"
              prepend-inner-icon="mdi-map-marker"
              :rules="[rules.required, rules.latValidator]"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              class="py-4"
              outlined
              readonly
              disabled
              dense
              hide-details="auto"
              v-model="longitude"
              label="Longitude"
              prepend-inner-icon="mdi-map-marker"
              :rules="[rules.required, rules.longValidator]"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row class="text-center mb-3">
          <v-col class="py-0">
            <v-expansion-panels>
              <v-expansion-panel>
                <v-expansion-panel-header disable-icon-rotate>
                  With QR code
                  <template v-slot:actions>
                    <v-icon> mdi-qrcode-scan </v-icon>
                  </template>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  QR-CODE-SCANNER (Coming soon!)
                </v-expansion-panel-content>
              </v-expansion-panel>

              <v-expansion-panel class="expanel" @click="onExpansionPanelClick">
                <v-expansion-panel-header disable-icon-rotate>
                  With map
                  <template v-slot:actions>
                    <v-icon> mdi-map </v-icon>
                  </template>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <location-by-map v-if="mapOpen == true"></location-by-map>
                </v-expansion-panel-content>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-header disable-icon-rotate>
                  Manual input
                  <template v-slot:actions>
                    <v-icon> mdi-pen </v-icon>
                  </template>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-row>
                    <v-col>
                      <v-text-field
                        class="py-4"
                        outlined
                        dense
                        hide-details="auto"
                        v-model="lat"
                        label="Latitude"
                        prepend-inner-icon="mdi-map-marker"
                        :rules="[rules.latValidator]"
                      ></v-text-field>
                    </v-col>
                    <v-col>
                      <v-text-field
                        class="py-4"
                        outlined
                        dense
                        hide-details="auto"
                        v-model="long"
                        label="Longitude"
                        prepend-inner-icon="mdi-map-marker"
                        :rules="[rules.longValidator]"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-btn @click="UseGPS" class="mt-4 mx-4">Use GPS</v-btn>
                  </v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
        </v-row>
      </v-form>

      <v-row>
        <v-col class="text-center">
          <v-divider />
          <v-btn @click="sendData" large class="mt-3">
            <v-icon> mdi-plus </v-icon>
            Add Sensor
          </v-btn>
        </v-col>
      </v-row>
    </v-card>

    <v-snackbar v-model="snackbar">
      {{ snackbarText }}
      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import SerialConnect from "@/components/SerialConnect.vue";
import LocationByMap from '@/components/LocationByMap.vue';
import { Map } from "@/api/mapbox.js"

export default {
  name: "AddSensorPage",
  components: {
    SerialConnect,
    LocationByMap
  },
  data() {
    
    return {
      deviceid: "",
      devicename: "",
      longitude: "",
      latitude: "",

      long: "",
      lat: "",
      placeName: "",

      valid: true,
      snackbar: false,
      mapOpen: false,

      rules: {
        required: (value) => !!value || "Required.",
        counter: (value) => value.length <= 20 || "Max 20 characters",
        devIdCounter: (value) => value.length == 24 || "Exactly 24 characters",
        deviceidValidator: (value) => {
          // Can only be a hexadecimal value
          const pattern = /^[a-fA-F0-9]+$/;
          return pattern.test(value) || this.deviceidText;
        },
        devicenameValidator: (value) => {
          // Can only be lowercase letters, numbers, underscores or dashes (multiple words)
          const pattern = /^([a-zA-Z-_]+([a-z]?['-]?[a-zA-Z-_]+)*)$/;

          return pattern.test(value) || this.devicenameText;
        },
        latValidator: (value) => {
          const pattern =
            // -90.0000000 to 90.0000000 --> Match exactly 7 chars after .
            // /^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/;
            /^(\+|-)?(?:90(?:(?:\.0*)?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]*)?))$/;

          return pattern.test(value) || this.deviceLatText;
        },
        longValidator: (value) => {
          // -180.0000000 to 180.0000000 --> Match exactly 7 chars after .
          // /^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$/;
          const pattern =
            /^(\+|-)?(?:180(?:(?:\.0*)?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]*)?))$/;

          return pattern.test(value) || this.deviceLongText;
        },
      },
    };
  },
  methods: {
    sendData() {
      this.$refs.form.validate();

      // get location place name "place_name"
      
      Map.reverse_geolocation(this.latitude, this.longitude)
      .then((res) => {
        if(res.data.features.length != 0) {
          this.placeName = res.data.features[0].place_name
        }
        if (this.valid == false) {
          this.$store.commit("addSensor", "Please, check for problems!");
        } else {
          let json = {
            deviceid: this.deviceid.toLowerCase(),
            devicename: this.devicename,
            location: {
              lat: this.latitude,
              long: this.longitude,
              place_name: this.placeName
            },
          };

          this.$store.dispatch("addSensor", json);
        }
        this.snackbar = true;
      })
      .catch(() => {
        console.log("could not get reverse geolocation")
      })

    },
    updateDeviceId(id) {
      this.deviceid = id;
    },
    UseGPS(){
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(this.showPosition)
      }else{
          console.log("error")
      }

            
    },
    showPosition(position) {
      this.lat= position.coords.latitude
      this.long= position.coords.longitude

    },
    onExpansionPanelClick(event) {
      if(event.target.classList.contains('v-expansion-panel-header--active')) {
        this.mapOpen = false
      } else {
        setTimeout(() => {  this.mapOpen = true }, 100);
        if(this.latitude && this.longitude){
          this.$store.dispatch("updatelatlng",{lat: this.latitude ,lng: this.longitude} )
        }
      }
    }
  },
  computed: {
    snackbarText() {
      return this.$store.state.snackbarText;
    },
    deviceidText() {
      return this.$store.state.deviceidText;
    },
    devicenameText() {
      return this.$store.state.devicenameText;
    },
    deviceLatText() {
      return this.$store.state.deviceLatText;
    },
    deviceLongText() {
      return this.$store.state.deviceLongText;
    },
  },
  watch: {
    deviceid() {
      this.$nextTick(() => {
        this.deviceid = this.deviceid.replace(/\s+/g, "");
      });
    },
    long() {
      this.$nextTick(() => {
        this.longitude = Number(this.long).toFixed(7);
      });
    },
    lat() {
      this.$nextTick(() => {
        this.latitude = Number(this.lat).toFixed(7);
      });
    },
     "$store.state.latlng": {
      handler: function(nv) {
        if(nv){
          this.lat = String(nv.lat);
          this.long = String(nv.lng);
        }
        
      },
      immediate: true // provides initial (not changed yet) state
    }
  },
};
</script>
