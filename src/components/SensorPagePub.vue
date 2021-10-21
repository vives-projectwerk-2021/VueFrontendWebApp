<template>
  <v-container>
    <v-card color="red lighten-4" elevation="5">
      <v-row>
        <v-col>
          <p class="text-h2 text-center">{{ devicename }}</p>
          <v-divider />
        </v-col>
      </v-row>

      <v-row class="px-4">
        <v-col>
          <v-row>
            <v-col cols="5">
              <p class="text-h6 font-weight-medium">First Name:</p>
            </v-col>
            <v-col cols="7">
              <p class="text-h6 font-weight-regular">{{ firstname }}</p>
            </v-col>
          </v-row>
        </v-col>

        <v-col>
          <v-row>
            <v-col cols="5">
              <p class="text-h6 font-weight-medium">Last Name:</p>
            </v-col>
            <v-col cols="7">
              <p class="text-h6 font-weight-regular">{{ lastname }}</p>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "SensorPagePub",
  data() {
    return {
      devicename: "Serre A",
      firstname: "Bob",
      lastname: "Boer",
    };
  },
};
</script>
