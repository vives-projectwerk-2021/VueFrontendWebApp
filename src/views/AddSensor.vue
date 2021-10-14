<template>
  <v-row>
    <v-col cols="12" sm="2" md="4">
      <v-btn @click="sendData">
        Send data
      </v-btn></v-col
    >
    <v-col cols="12" sm="10" md="8">
      <v-text-field
        label="Name"
        hide-details="auto"
        v-model="username"
      ></v-text-field>
      <v-text-field
        label="Location"
        hide-details="auto"
        v-model="location"
      ></v-text-field
    ></v-col>
  </v-row>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      username: "",
      location: "",
    };
  },
  methods: {
    sendData() {
      console.log(
        '{"username": "' + this.username + '", "email": "' + this.location + "}"
      );
      axios.post(
        `http://localhost:3000/mongo/createdevice`,
        `{"username": "` +
          this.username +
          `", "location": "` +
          this.location +
          `}`
      );
    },
  },
};
</script>

<style></style>
