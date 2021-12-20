<template>
  <div>
    <v-btn @click="showDialog" color="error" plain>Delete</v-btn>
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title>
          Message
        </v-card-title>

        <v-card-text>
          Are you sure you want to delete this device?
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="deleteSensor">Yes</v-btn>
          <v-btn color="primary" text @click="dialog = false">No</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { Sensors, TTN } from "@/api/pulu.js";

export default {
  name: "DeleteSensorButton",
  data: () => {
    return {
      dialog: false,
    };
  },
  props: {
    sensorid: String,
  },
  methods: {
    showDialog() {
      this.dialog = true;
    },
    deleteSensor() {
      // send delete request to backend
      Sensors.delete_sensor(this.sensorid)
      .then(() => {
        TTN.removeDevice(this.sensorid)
        .then((res) => {
          console.log(res)
          this.$router.go(); // refresh page
        })
      })
      .catch((err) => console.log(err));
    },
  },
};
</script>
