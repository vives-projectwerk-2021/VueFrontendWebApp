<template>
  <v-card color="blue lighten-4" elevation="5">
    <v-row>
      <v-col>
        <p class="text-h2 text-center">Add Sensor</p>
        <p class="text-subtitle-1 text-center">
          You can add your pulu sensor here!
        </p>
        <v-divider />
      </v-col>
    </v-row>

    <v-container>
      <v-row>
        <v-col>
          <v-text-field
            label="Device Name"
            hide-details="auto"
            v-model="devicename"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-text-field
            label="First Name"
            hide-details="auto"
            v-model="firstname"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            label="Last Name"
            hide-details="auto"
            v-model="lastname"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>

    <v-row>
      <v-col class="text-center">
        <v-divider />
        <v-btn @click="sendData" large class="mt-3">
          <v-icon>
            mdi-plus
          </v-icon>
          Add Sensor
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  name: "AddSensorPage",
  data() {
    return {
      devicename: "",
      firstname: "",
      lastname: "",
    };
  },
  methods: {
    sendData() {
      console.log(
        'Device Name: "' + this.devicename + '"\n' +
        'First Name: "' + this.firstname + '"\n' +
        'Last Name: "' + this.lastname + '"\n'
      );
      let json = { name: this.devicename, location: this.firstname };
      axios
        .post(
          `${process.env.VUE_APP_BACKEND_BASE_URL}/mongo/devices`,
          json
        )
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
