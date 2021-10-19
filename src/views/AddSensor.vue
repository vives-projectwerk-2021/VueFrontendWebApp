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
