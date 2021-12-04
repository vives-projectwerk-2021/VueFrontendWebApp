<template>
  <v-app id="Pulu App">
    <nav-bar />

    <v-main class="grey lighten-4">
      <v-container>
        <v-row>
          <v-col>
            <router-view />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import NavBar from "@/components/NavBar";
export default {
  components: { NavBar },
};
</script>
