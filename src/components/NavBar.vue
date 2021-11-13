<template>
  <div>
   <!--
    Navbar for mobile devices
    -->
    <v-row class="hidden-sm-and-up">
      <v-col>
        <v-card>
          <v-card-title >
            <span class="text-h5">Pulu</span>

            <v-spacer></v-spacer>

            <v-menu bottom left>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>

              <v-list>
                <v-list-item :exact="true" v-for="(link, i) in links" :key="i" :to="{ name: link }">
                  <v-list-item-title>{{ link }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>

    <!--
    Navbar for bigger screens
    -->

    <v-app-bar app color="white" flat class="hidden-xs-only">
      <v-container class="py-0 fill-height">
        <v-btn :exact="true" v-for="link in links" :key="link" :to="{ name: link }" text>
          {{ link }}
        </v-btn>
      </v-container>
    </v-app-bar>
  </div>
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
