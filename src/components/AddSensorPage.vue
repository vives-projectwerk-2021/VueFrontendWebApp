<template>
  <v-container>
    <v-card color="#A9C25D" elevation="5">
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
              label="Location"
              hide-details="auto"
              v-model="location"
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

    <v-snackbar v-model="snackbar">
      {{ snackbarText }}
      <template v-slot:action="{ attrs }">
        <v-btn color="#A9C25D" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "AddSensorPage",
  data() {
    return {
      devicename: "",
      location: "",
      firstname: "",
      lastname: "",

      snackbar: false,
      snackbarText: "",
    };
  },
  methods: {
    sendData() {
      if (
        this.devicename == "" ||
        this.location == "" ||
        this.firstname == "" ||
        this.lastname == ""
      ) {
        this.snackbarText = "ERROR: All fields have to be filled in!";
      } else {
        this.snackbarText = `The device: ${this.devicename} has been created!`;

        let json = {
          name: this.devicename,
          location: this.location,
          firstname: this.firstname,
          lastname: this.lastname,
        };
        axios
          .post(`${process.env.VUE_APP_BACKEND_BASE_URL}/mongo/devices`, json)
          .then((response) => {
            console.log(response);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      this.snackbar = true;
    },
  },
};
</script>
