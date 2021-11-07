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
              label="Device ID"
              :rules="[rules.required, rules.counter, rules.deviceidValidator]"
              hide-details="auto"
              v-model="deviceid"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-text-field
              label="Device Name"
              :rules="[rules.required, rules.counter, rules.devicenameValidator]"
              hide-details="auto"
              v-model="devicename"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-text-field
              label="Location"
              :rules="[rules.required]"
              hide-details="auto"
              v-model="location"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-text-field
              label="First Name"
              :rules="[rules.required, rules.counter, rules.nameValidator]"
              hide-details="auto"
              v-model="firstname"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              label="Last Name"
              :rules="[rules.required, rules.counter, rules.lastnameValidator]"
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
      deviceid: "",
      devicename: "",
      location: "",
      firstname: "",
      lastname: "",

      snackbar: false,
      snackbarcolor: "success",
      snackbarText: "",

      rules: {
        required: (value) => !!value || "Required.",
        counter: (value) => value.length <= 20 || "Max 20 characters",
        nameValidator: (value) => {
          // First char can be a (non)capital letter, all other chars can only be non-capital letters!
          const pattern = /^([a-zA-Z][a-z]+([ ]?[[a-zA-Z][a-z]+)*)$/;
          return (
            pattern.test(value) ||
            "Invalid Name: Can only be 1 (non)capital letter + lowercase letters."
          );
        },
        lastnameValidator: (value) => {
          // First char can be a (non)capital letter, all other chars can only be non-capital letters, 1 or more names!
          const pattern = /^([a-zA-Z][a-z]+([ ]?[a-z]?['-]?[a-zA-Z][a-z]+)*)$/;
          return (
            pattern.test(value) ||
            "Invalid Name: Can only be 1 (non)capital letter + lowercase letters (- and ')."
          );
        },
        deviceidValidator: (value) => {
          // Can only be lowercase letters, numbers or dashes
          const pattern = /^[a-z0-9-]+$/;
          return (
            pattern.test(value) ||
            "Invalid Device ID: Can only be lowercase letters, numbers or dashes."
          );
        },
        devicenameValidator: (value) => {
          // Can only be lowercase letters, numbers, underscores or dashes (multiple words)
          const pattern = /^([a-zA-Z-_]+([ ]?[a-z]?['-]?[a-zA-Z-_]+)*)$/;
          return (
            pattern.test(value) ||
            "Invalid Device Name: Can only be letters, numbers, underscores or dashes."
          );
        },
      },
    };
  },
  methods: {
    sendData() {
      if (
        this.deviceid == "" ||
        this.devicename == "" ||
        this.location == "" ||
        this.firstname == "" ||
        this.lastname == ""
      ) {
        this.snackbarText = "ERROR: All fields have to be filled in!";
      } else {
        this.snackbarText = `The device: ${this.devicename} has been created!`;

        let json = {
          deviceid: this.deviceid,
          devicename: this.devicename,
          location: this.location,
          firstname: this.firstname,
          lastname: this.lastname,
        };
        axios
          .post(`${this.$VUE_APP_BACKEND_BASE_URL}/devices`, json)
          .then((response) => {
            console.log(response);
            if (response.data == "Already exists") {
              this.snackbarText = `The device with deviceid: ${this.deviceid} already exists`;
            } else {
              this.snackbarText = `The device: ${this.devicename} has been created!`;
            }
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
