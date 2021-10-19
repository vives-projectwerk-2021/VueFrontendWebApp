<template>
  <v-container>
    <v-row>
      <v-col>
        <p class="text-h4">Add your sensor!</p>
      </v-col>
      <v-col>
        <v-btn @click="sendData" large class="mx-5">
          <v-icon>
            mdi-plus
          </v-icon>
          Add Sensor
        </v-btn></v-col
      >
    </v-row>
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
</template>

<script>
import axios from "axios";

export default {
  name: "addSensor",
  data() {
    return {
      devicename: "",
      location: "",
    };
  },
  methods: {
    sendData() {
      console.log(
        '{"username": "' +
          this.devicename +
          '", "email": "' +
          this.location +
          "}"
      );
      let json= {name:this.username, location: this.location}
      axios.post(
        
        `${process.env.VUE_APP_BACKEND_BASE_URL}/mongo/createdevice`,
        json
        
      ).then(response=>{console.log(response)})
      .catch(err=>{console.log(err)})
    },
  },
};
</script>

<style></style>
