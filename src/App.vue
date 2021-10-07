<template>
  <v-app id="inspire">
    <v-app-bar app color="white" flat>
      <v-container class="py-0 fill-height">
        <v-avatar class="mr-10" color="grey darken-1" size="32"></v-avatar>

        <v-btn v-for="link in links" :key="link" text>
          {{ link }}
        </v-btn>

        <v-spacer></v-spacer>

        <v-responsive max-width="260">
          <v-text-field
            dense
            flat
            hide-details
            rounded
            solo-inverted
          ></v-text-field>
        </v-responsive>
      </v-container>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col cols="2">
            <v-sheet rounded="lg">
              <v-list color="transparent">
                <v-list-item v-for="n in 5" :key="n" link>
                  <v-list-item-content>
                    <v-list-item-title> List Item {{ n }} </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-divider class="my-2"></v-divider>

                <v-list-item link color="grey lighten-4">
                  <v-list-item-content>
                    <v-list-item-title> Refresh </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-sheet>
          </v-col>

          <v-col>
            <v-sheet min-height="70vh" rounded="lg">
              <v-spacer></v-spacer>
              <v-col>
                <vue-ellipse-progress
                  :progress="68"
                  :determinate="false"
                  color="#7579ff"
                  empty-color="#324c7e"
                  :size="180"
                  :thickness="5"
                  :empty-thickness="3"
                  lineMode="in 10"
                  :legend-value="31"
                  animation="loop 700 1000"
                  fontSize="1.5rem"
                  font-color="blue"
                  dash="5"
                  :loading="false"
                  :no-data="noData"
                >
                  <span slot="legend-value">°C</span>
                  <p slot="legend-caption">Temperature</p>
                </vue-ellipse-progress>
              </v-col>

              <v-col>
                <vue-ellipse-progress
                  :progress="30"
                  :determinate="false"
                  color="#7579ff"
                  empty-color="#324c7e"
                  :size="180"
                  :thickness="5"
                  :empty-thickness="3"
                  lineMode="in 10"
                  :legend-value="30"
                  animation="loop 700 1000"
                  fontSize="1.5rem"
                  font-color="blue"
                  dash="5"
                  :loading="false"
                  :no-data="noData"
                >
                  <span slot="legend-value">%</span>
                  <p slot="legend-caption">Light level</p>
                </vue-ellipse-progress>
              </v-col>

              <v-col>
                <vue-ellipse-progress
                  :progress="68"
                  :determinate="false"
                  color="#7579ff"
                  empty-color="#324c7e"
                  :size="180"
                  :thickness="5"
                  :empty-thickness="3"
                  lineMode="in 10"
                  :legend-value="31"
                  animation="loop 700 1000"
                  fontSize="1.5rem"
                  font-color="blue"
                  dash="5"
                  :loading="false"
                  :no-data="noData"
                >
                  <span slot="legend-value">°C</span>
                  <p slot="legend-caption">Temperature</p>
                </vue-ellipse-progress>

                <vue-ellipse-progress class="mx-8"
                  :progress="68"
                  :determinate="false"
                  color="#7579ff"
                  empty-color="#324c7e"
                  :size="180"
                  :thickness="5"
                  :empty-thickness="3"
                  lineMode="in 10"
                  :legend-value="31"
                  animation="loop 700 1000"
                  fontSize="1.5rem"
                  font-color="blue"
                  dash="5"
                  :loading="false"
                  :no-data="noData"
                >
                  <span slot="legend-value">°C</span>
                  <p slot="legend-caption">Temperature</p>
                </vue-ellipse-progress>
              </v-col>
              <!--  -->
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    links: ["Dashboard", "Messages", "Profile", "Updates"],
  }),
};
</script>