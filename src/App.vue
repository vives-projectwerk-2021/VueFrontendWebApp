<template>
  <v-app id="Pulu App">
    <!-- De bar -->
    <v-app-bar app color="white" flat>
      <v-container class="py-0 fill-height">
        <v-btn v-for="link in links" :key="link" text>
          {{ link }}
        </v-btn>
      </v-container>
    </v-app-bar>

    <v-main class="grey lighten-4">
      <v-container>
        <v-row>
          <v-col>
            <v-sheet min-height="80vh" rounded="lg">
              <v-col>
                <vue-ellipse-progress
                  :progress="(100/50)*temperature"
                  :determinate="false"
                  color="#009E45"
                  empty-color="#324c7e"
                  :size="180"
                  :thickness="5"
                  :empty-thickness="3"
                  lineMode="in 10"
                  :legend-value="temperature"
                  animation="loop 700 1000"
                  fontSize="1.5rem"
                  font-color="#009E45"
                  dash="4"
                  :loading="false"
                  
                >
                  <span slot="legend-value">°C</span>
                  <p slot="legend-caption">Temperature</p>
                </vue-ellipse-progress>


                <vue-ellipse-progress
                  class="ml-14"
                  :progress="humidity"
                  :determinate="false"
                  color="#009E45"
                  empty-color="#324c7e"
                  :size="180"
                  :thickness="5"
                  :empty-thickness="3"
                  lineMode="in 10"
                  :legend-value="humidity"
                  animation="loop 700 1000"
                  fontSize="1.5rem"
                  font-color="#009E45"
                  dash="4"
                  :loading="false"
                  
                >
                  <span slot="legend-value">%</span>
                  <p slot="legend-caption">Humidity</p>
                </vue-ellipse-progress>
              </v-col>
              <v-text-field type="number" v-model="temperature" label="temp"></v-text-field>

            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'Sensors',

  created(){
    this.startWebSocket();
  },

  data() {
    return{
      links: ["Sensor", "mi", "mu", "bu"],
      connection: null,
      temperature: 31,
      humidity: 60,
    }
  },

  methods:{
    startWebSocket()
    {
      console.log("Starting connection to WebSocket Server")
      this.connection = new WebSocket("ws://localhost:3000")
      
      this.connection.onopen = function(event)
      {
        console.log(event)
        console.log("connected to the echo websocket server...")
      }

      this.connection.onmessage = function(event)
      {
        console.log(event);
      }
    }

  }
};
</script>