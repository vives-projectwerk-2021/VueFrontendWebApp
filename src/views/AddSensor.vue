<template>
  <v-row>
    <v-col>
      <v-text-field label="Name" hide-details="auto" v-model="username"></v-text-field>
      <v-text-field label="Location" hide-details="auto" v-model="location"></v-text-field>
      <v-btn @click="sendData">
        Send data
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: "",
      location: "",
    };
  },
  methods: {
      sendData() {
          console.log('{"username": "' + this.username + '", "email": "' + this.location + '}')
          axios.post(`http://localhost:3000/mongo/createdevice`, `{"username": "` + this.username + `", "location": "` + this.location + `}`)
      }
  }
};
</script>

<style></style>
