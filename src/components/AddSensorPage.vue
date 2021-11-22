<template>
  <v-container>
    <v-card color="#A9C25D" elevation="5">
      <v-row>
        <v-col>
          <p class="text-h2 text-center">Add a Sensor</p>
          <p class="text-subtitle-1 text-center">
            You can add your pulu sensor here!
          </p>
        </v-col>
      </v-row>
      <v-divider />
      <v-form ref="form" v-model="valid" class="mx-4">
        <v-row>
          <v-col>
            <v-text-field
              label="Device ID"
              :rules="[
                rules.required,
                rules.devIdCounter,
                rules.deviceidValidator,
              ]"
              hide-details="auto"
              v-model="deviceid"
            ></v-text-field>
          </v-col>
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

        <v-row>
          <v-col class="pt-0">
            <v-text-field
              class="pt-0"
              label="Location (for now)"
              :rules="[rules.required]"
              hide-details="auto"
              v-model="location"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col class="pt-0">
            <v-text-field
              class="pt-0"
              label="First Name"
              :rules="[rules.required, rules.counter, rules.nameValidator]"
              hide-details="auto"
              v-model="firstname"
            ></v-text-field>
          </v-col>
          <v-col class="pt-0">
            <v-text-field
              class="pt-0"
              label="Last Name"
              :rules="[rules.required, rules.counter, rules.lastnameValidator]"
              hide-details="auto"
              v-model="lastname"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row class="mt-4">
          <v-col class="py-0">
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
              value="12345"
              label="Latitude"
              prepend-inner-icon="mdi-map-marker"
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
              value="56789"
              label="Longitude"
              prepend-inner-icon="mdi-map-marker"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row class="text-center mb-3">
          <v-col class="py-0">
            <v-btn class="mx-2" @click="mapLocation">With QR</v-btn>
            <v-btn class="mx-2" @click="qrLocation">With MAP</v-btn>
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
export default {
  name: "AddSensorPage",
  data() {
    return {
      deviceid: "",
      devicename: "",
      location: "",
      firstname: "",
      lastname: "",

      valid: true,
      snackbar: false,

      rules: {
        required: (value) => !!value || "Required.",
        counter: (value) => value.length <= 20 || "Max 20 characters",
        devIdCounter: (value) => value.length == 24 || "Exactly 24 characters",
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
          const pattern = /^[a-fA-F0-9]+$/;
          return (
            pattern.test(value) ||
            "Invalid Device ID: Can only be a hexadecimal value. (Letters from a to f, and numbers)"
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
      this.$refs.form.validate();

      if (this.valid == false) {
        this.$store.commit("addSensor", "Please, check for problems!");
      } else {
        let json = {
          deviceid: this.deviceid.toLowerCase(),
          devicename: this.devicename,
          location: this.location,
          firstname: this.firstname,
          lastname: this.lastname,
        };

        this.$store.dispatch("addSensor", json);
      }
      this.snackbar = true;
    },
  },
  computed: {
    snackbarText() {
      return this.$store.state.snackbarText;
    },
  },
};
</script>
