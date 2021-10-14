<template>
  <v-row>
    <v-col>
      <p class="h6">Sensor Name</p>
      <v-text-field label="Name" hide-details="auto">{{ username }}</v-text-field>
      <p class="h6">Sensor Location</p>
      <v-text-field label="Location" hide-details="auto">{{ location }}</v-text-field>
      <v-btn @click="send">
        Send data
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      location: "",
    };
  },
  methods: {
      send() {
          //post('{"username":"' + this.username + '", "email": "' + this.location + '}')
          console.log('{"username":"' + this.username + '", "email": "' + this.location + '}')
      }
  }
};
</script>

<style></style>
