<template>
  <div>
    <!--
    Navbar for mobile devices
    -->
    <v-app-bar
      app
      class="pa-0 hidden-sm-and-up"
      flat
      :color="this.$store.state.backgroundColor"
      elevate-on-scroll
      dark
    >
      <v-row>
        <v-col class="px-0">
          <v-card fill-height flat rounded="false" :color="this.$store.state.navBarColor">
            <v-card-title class="py-0">
              <v-btn :to="{ name: 'Home' }" class="text-h5" depressed plain
                >Pulu</v-btn
              >
              <v-spacer></v-spacer>
              <v-img
                max-height="45"
                max-width="45"
                src="../assets/pulu.png"
              ></v-img>

              <v-spacer class="mx-4"></v-spacer>

              <v-menu bottom left>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>

                <v-list :color="this.$store.state.navBarColor">
                  <v-list-item
                    :exact="true"
                    v-for="(link, i) in links"
                    :key="i"
                    :to="{ name: link }"
                    style="color: white"
                  >
                    <v-list-item-title>{{ link }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-app-bar>

    <!--
    Navbar for bigger screens
    -->

    <v-app-bar
      app
      :color="this.$store.state.navBarColor"
      flat
      class="hidden-xs-only"
      elevate-on-scroll
      dark
    >
      <v-container class="py-0 fill-height">
        <v-btn
          :exact="true"
          v-for="link in links"
          :key="link"
          :to="{ name: link }"
          text
          large
          tile
          outlined
          class="ml-2"
        >
          {{ link }}
        </v-btn>
        <v-spacer></v-spacer>
      </v-container>
      <v-img

        max-height="50"
        max-width="50"
        justify="end"
        src="../assets/pulu.png"
      ></v-img>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      links: ["Home", "AddSensor", "Sensors", "QR-scanner", "About"],
    };
  },
};
</script>