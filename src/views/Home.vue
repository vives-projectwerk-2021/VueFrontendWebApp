<template>
  <div>
    <br>

    <MapPage/>

    <br>
    <v-divider></v-divider>
    <br>
    <div>
      <v-sheet align="center" border="">
        <p class="text-h4">
          Pulu gives an overview of the current groundwater levels in Flanders.
        </p>
        <p class="text-h4">
          Our mission of this platform is to map these groundwater levels.
        </p>
      </v-sheet>
    </div>

    <br>
    <v-divider></v-divider>
    <br>

    <v-carousel cycle height="300px" hide-delimiter-background  :show-arrows="false" class="rounded-xl">
      <v-carousel-item
        v-for="(slide, i) in slides"
        :key="i"
        :src="slide.src"
      >
        <v-row class="title fill-height" align="center" justify="center">
          <div :style="{ background: activeColor }" class="pa-2 w-50 text-no-wrap rounded-lg">
            <h5>{{slide.title}}</h5>
          </div>
        </v-row>
      </v-carousel-item>
    </v-carousel>
    <br>
    
    <v-footer
      dark
      padless
      
    >
      <v-card
        flat
        tile
        class="indigo lighten-1 white--text text-center"
        color="darkgrey"
        width="100%"
      >
        <v-card-text>
          <v-btn
            v-for="icon in icons"
            :key="icon"
            class="mx-4 white--text"
            icon
            dark
          >
            <v-icon size="24px">
              {{ icon }}
            </v-icon>
          </v-btn>
        </v-card-text>

        <v-card-text class="white--text pt-0">
          vives.be
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} — <strong>Pulu</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </div>
</template>

<script>
// @ is an alias to /src
import MapPage from "@/components/MapPage.vue"

export default {
  name: 'Home',

  components: {
    MapPage
    //Footer upcomming!!
  },

  data() {
    return {
      activeColor: 'white',
      logo_vives: require('@/img/logo_vives.png'),
      slides: [
        {
          src: require('../img/image_one.jpg'),
          title: "Easy installation"
        },
        {
          src: require('../img/image_two.jpg'),
          title: "Smart Self-Sufficient"
        },
        {
          src: require('../img/image_three.jpg'),
          title: "Open Wireless"
        },
        {
          src: require('../img/image_four.jpg'),
          title: "Soil Moisture Sensor"
        },
        {
          src: require('../img/image_five.jpg'),
          title: "Created by Vives students"
        }
      ],
      icons: [
        'mdi-github',
        'mdi-email',
        'mdi-facebook',
        'mdi-twitter'
      ]
    }
  }

}
</script>
