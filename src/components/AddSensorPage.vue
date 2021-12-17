<template>
  <v-container>
    <v-card elevation="5">
      <v-card-title class="pd-0"> <h1>Add a Sensor</h1> </v-card-title>
      <v-card-text> On this page you can add a Sensor </v-card-text>
      <v-divider />
      <v-container class="px-6">
        <v-form ref="form" v-model="valid" class="mb-4">
          <v-row style="align-items: center;">
            <v-col class="pb-0" cols="12" sm="8" md="9">
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
            <v-col cols="12" sm="4" md="3">
              <SerialConnect
                v-on:deviceId="updateDeviceId"
              ></SerialConnect>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-text-field
                label="Device Name"
                :rules="[rules.required, rules.devNameCounter]"
                hide-details="auto"
                v-model="devicename"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" sm="4" md="5">
              <v-text-field
                outlined
                dense
                hide-details="auto"
                v-model="lat"
                label="Latitude"
                prepend-inner-icon="mdi-map-marker"
                @keydown.enter="Locationedit"
                @blur="Locationedit"
                :rules="[rules.required, rules.latValidator]"
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="4" md="5">
              <v-text-field
                outlined
                dense
                hide-details="auto"
                v-model="long"
                label="Longitude"
                prepend-inner-icon="mdi-map-marker"
                @blur="Locationedit"
                @keydown.enter="Locationedit"
                :rules="[rules.required, rules.longValidator]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4" md="2" class="d-flex align-center">
              <v-btn @click="UseGPS" block>Use GPS</v-btn>
            </v-col>
            <v-col cols="12">
              <location-by-map></location-by-map>
            </v-col>
          </v-row>
        </v-form>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn @click="sendData" large color="success">
            <v-icon> mdi-plus </v-icon>
            Add Sensor
          </v-btn>
        </v-card-actions>
      </v-container>
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
import LocationByMap from "@/components/LocationByMap.vue";
import { TTN } from "@/api/pulu.js";
import { Map } from "@/api/mapbox.js";

export default {
  name: "AddSensorPage",
  components: {
    SerialConnect,
    LocationByMap,
  },
  data() {
    return {
      devicename: "",

      long: "",
      lat: "",
      placeName: "",

      valid: true,
      snackbar: false,

      rules: {
        required: (value) => !!value || "Required.",
        counter: (value) => value.length <= 20 || "Max 20 characters",
        devIdCounter: (value) => value.length == 24 || "Exactly 24 characters",
        devNameCounter: (value) => value.length <= 50 || "Max 50 characters",
        deviceidValidator: (value) => {
          // Can only be a hexadecimal value
          const pattern = /^[a-fA-F0-9]+$/;
          return pattern.test(value) || this.deviceidText;
        },
        latValidator: (value) => {
          const pattern =
            // -90.0000000 to 90.0000000 --> Match exactly 7 chars after .
            /^(\+|-)?(?:90(?:(?:\.0*)?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]*)?))$/;

          return pattern.test(value) || this.deviceLatText;
        },
        longValidator: (value) => {
          const pattern =
            // -180.0000000 to 180.0000000 --> Match exactly 7 chars after .
            /^(\+|-)?(?:180(?:(?:\.0*)?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]*)?))$/;

          return pattern.test(value) || this.deviceLongText;
        },
      },

      ttnInfo: {},
    };
  },
  methods: {
    sendData() {
      this.$refs.form.validate();

      // get location place name "place_name"

      Map.reverse_geolocation(this.lat, this.long)
        .then((res) => {
          if (res.data.features.length != 0) {
            this.placeName = res.data.features[0].place_name;
          }
          if (this.valid == false) {
            this.$store.commit("addSensor", "Please, check for problems!");
          } else {
            let json = {
              deviceid: this.deviceid.toLowerCase(),
              devicename: this.devicename,
              location: {
                lat: this.lat,
                long: this.long,
                place_name: this.placeName,
              },
            };

            this.$store.dispatch("addSensor", json);
            this.getTTNInfo();
          }
          this.snackbar = true;
        })
        .catch(() => {
          console.log("could not get reverse geolocation");
        });
    },
    updateDeviceId(id) {
      this.deviceid = id;
    },

    getTTNInfo() {
      TTN.registerDevice({
        device_id: this.deviceid,
        name: this.devicename,
      })
        .then(async (res) => {
          console.log(res.data);
          const bytes =
            res.data.ids.dev_eui +
            res.data.ids.join_eui +
            res.data.root_keys.app_key.key +
            "001E";
          const buffer = Uint8Array.from(
            bytes.match(/(..)/g).map((b) => "0x" + b)
          );
          const payload = Buffer.from(
            String.fromCharCode(...buffer),
            "binary"
          ).toString("base64");
          if (this.$store.state.serial.serialPort) {
            this.serialWriter(payload);
          } else {
            console.log(payload);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async serialWriter(str) {
      const encoder = new TextEncoder();
      const writer = this.$store.state.serial.serialPort.writable.getWriter();
      await writer.write(encoder.encode(str));
      writer.releaseLock();
    },
    UseGPS() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.showPosition);
      } else {
        console.log("error");
      }
    },
    showPosition(position) {
      this.lat = position.coords.latitude;
      this.long = position.coords.longitude;
      this.Locationedit();
    },
    FormatLatLong() {
      this.lat = Number(this.lat).toFixed(7);
      this.long = Number(this.long).toFixed(7);
    },
    Locationedit() {
      this.$store.dispatch("updatelatlng", { lat: this.lat, lng: this.long });
      this.FormatLatLong();
    },
  },
  computed: {
    snackbarText() {
      return this.$store.state.snackbarText;
    },
    deviceidText() {
      return this.$store.state.deviceidText;
    },
    deviceLatText() {
      return this.$store.state.deviceLatText;
    },
    deviceLongText() {
      return this.$store.state.deviceLongText;
    },
    deviceid() {
      return this.$store.state.deviceid;
    },
  },
  watch: {
    deviceid() {
      this.$nextTick(() => {
        this.deviceid = this.deviceid.replace(/\s+/g, "");
      });
    },
    "$store.state.latlng": {
      handler: function (nv) {
        if (nv) {
          this.lat = String(nv.lat);
          this.long = String(nv.lng);
          this.FormatLatLong();
        }
      },
      immediate: true, // provides initial (not changed yet) state
    },
  },
};
</script>
