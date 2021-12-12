<template>
  <v-btn @click="deleteSensor" color="error" plain>Delete</v-btn>
</template>

<script>
import { Sensors } from "@/api/pulu.js";

export default {
  name: "DeleteSensorButton",
  props: {
    sensorid: String,
  },
  methods: {
    deleteSensor() {
      // send delete request to backend
      Sensors.delete_sensor(this.sensorid)
        .then(() => {
          this.$router.go(); // refresh page
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
