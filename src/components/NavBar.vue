<template>
  <div>
    <!--
    Navbar for mobile devices
    -->
    <v-app-bar
      app
      class="pa-0 hidden-sm-and-up"
      flat
      color="green darken-3"
      elevate-on-scroll
      dark
    >
      <v-row>
        <v-col class="px-0">
          <v-card
            fill-height
            flat
            rounded="false"
            :color="this.$store.state.navBarColor"
          >
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

                <v-list>
                  <v-list-item
                    :exact="true"
                    v-for="(link, i) in links"
                    :key="i"
                    :to="{ name: link }"
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
      color="green darken-3"
      class="hidden-xs-only"
      dark
    >
      <v-tabs optional centered>
        <v-tab
          v-for="link in links"
          :key="link"
          :to="{ name: link }"
          exact
        >
          {{ link }}
        </v-tab>
      </v-tabs>
      <v-spacer />
      <v-img
        max-height="50"
        max-width="50"
        justify="end"
        src="../assets/pulu.png"
      />
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      links: ["Home", "AddSensor", "Sensors", "About", "QR-scanner"],
    };
  },
};
</script>