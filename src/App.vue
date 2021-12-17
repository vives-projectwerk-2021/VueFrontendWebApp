<template>
  <v-app id="Pulu App">
    <nav-bar />

    <v-main class="grey lighten-3">
      <v-container>
        <router-view />
      </v-container>
    </v-main>

    <FooTer />
  </v-app>
</template>

<script>
import NavBar from "@/components/NavBar";
import FooTer from "@/components/FooTer";

export default {
  components: {
    NavBar,
    FooTer,
  },
};
</script>