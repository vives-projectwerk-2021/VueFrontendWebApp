<template>
  <v-container>
    <HomePage />
  </v-container>
</template>

<script>
// @ is an alias to /src

import HomePage from "@/components/HomePage";

export default {
  name: "Home",

  components: {
    HomePage,
  },
};
</script>
