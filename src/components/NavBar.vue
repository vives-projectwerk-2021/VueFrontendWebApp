<template>
  <v-app-bar app color="white" flat>
    <v-container class="py-0 fill-height">
      <v-btn v-for="link in links" :key="link" :to="{ name: link }" text>
        {{ link }}
      </v-btn>
    </v-container>
  </v-app-bar>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      links: ["Home", "About", "AddSensor", "Sensors"],
    };
  },
};
</script>
