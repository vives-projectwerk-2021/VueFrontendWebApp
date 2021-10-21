<template>
  <v-container>
    <add-sensor-page />
  </v-container>
</template>

<script>
import AddSensorPage from "@/components/AddSensorPage";
import axios from "axios";

export default {
  components: {
    AddSensorPage,
  },
  name: "addSensor",
  data() {
    return {
      username: "",
      location: "",
    };
  },
  methods: {
    sendData() {
      console.log(
        '{"username": "' +
          this.username +
          '", "location": "' +
          this.location +
          "}"
      );
      let json = { name: this.username, location: this.location };
      axios
        .post(
          `${process.env.VUE_APP_BACKEND_BASE_URL}/mongo/createdevice`,
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
