<template>
  <v-container>
    <add-sensor-page />
  </v-container>
</template>

<script>
import AddSensorPage from '@/components/AddSensorPage'
import axios from "axios";

export default {
  name: "addSensor",
  components: {
    AddSensorPage
  },
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
      let json = { name: this.devicename, location: this.location };
      axios
        .post(`http://localhost:3000/mongo/createdevice`, json)
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

<style></style>
