<template>
  <div class="pa-5">
    <v-card class="pa-3" elevation="3">
      <MapPage />
    </v-card>

    <br />
    <v-divider></v-divider>
    <br />
    <div>
      <p class="text-h4">
        oeloe oeloe Pulu gives an overview of the current groundwater levels in Flanders.
      </p>
      <p class="text-h4">
        Our mission of this platform is to map these groundwater levels.
      </p>
    </div>

    <br />
    <v-divider dark></v-divider>
    <br />

    <v-carousel
      cycle
      height="300px"
      hide-delimiter-background
      :show-arrows="false"
      class="rounded-xl"
    >
      <v-carousel-item
        v-for="(slide, i) in slides"
        :key="i"
        :src="slide.src"
        gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
      >
        <v-row class="title fill-height" align="center" justify="center">
          <div style="color: white" class="pa-2 w-50 text-no-wrap rounded-lg">
            <h2>{{ slide.title }}</h2>
          </div>
        </v-row>
      </v-carousel-item>
    </v-carousel>
    <br />
    <v-divider></v-divider>
    <br />
    <v-container fluid>
      <v-row dense justify="center">
        <v-col cols="6" sm="4" v-for="card in cards" :key="card.id">
          <v-card dark color="green darken-3" height="180 " class="ma-1 pa-1">
            <h2
              class="mt-4 font-weight-regular hidden-xs-only"
              style="text-align: center"
            >
              {{ card.title }}
            </h2>
            <h4
              class="mt-4 font-weight-regular hidden-sm-and-up"
              style="text-align: center"
            >
              {{ card.title }}
            </h4>
            <p
              class="mt-5 font-weight-black"
              :style="{ 'font-size': '50px' }"
              style="text-align: center"
            >
              {{ card.subtitle }}
            </p>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import MapPage from "@/components/MapPage.vue";

export default {
  name: "Home",

  components: {
    MapPage,
  },

  data() {
    return {
      activeColor: "white",
      activeColor2: "#edf2f7",
      activeColor3: "#f5f5f5",
      slides: [
        {
          src: require("../img/image_one.jpg"),
          title: "Easy installation",
        },
        {
          src: require("../img/image_two.jpg"),
          title: "Smart Self-Sufficient",
        },
        {
          src: require("../img/image_three.jpg"),
          title: "Open Wireless",
        },
        {
          src: require("../img/image_four.jpg"),
          title: "Soil Moisture Sensor",
        },
        {
          src: require("../img/image_five.jpg"),
          title: "Created by Vives students",
        },
      ],
      cards: [
        {
          id: 0,
          title: "Active sensors",
          subtitle: "loading",
        },
        {
          id: 1,
          title: "Countries",
          subtitle: "1",
        },
        {
          id: 3,
          title: "Project developers",
          subtitle: "0",
        },
      ],
    };
  },
  watch: {
    "$store.state.devicelist": {
      handler: function (nv) {
        if (nv) {
          this.cards[0].subtitle = nv.length;

          this.getCountries(nv);
        }
      },
      immediate: true, // provides initial (not changed yet) state
    },
    "$store.state.members": {
      handler: function (amount) {
        if (amount) {
          this.cards[2].subtitle = amount.members;

          console.log(amount.members);
        }
      },
    },
  },
  methods: {
    async getMembers() {
      this.$store.dispatch("getMembers");
    },
    getCountries(arr) {
      let countries = [];

      arr.forEach((sensor) => {
        let country = sensor.location.place_name.split(", ");
        country = country[country.length - 1];

        if (countries.indexOf(country) < 0) {
          countries.push(country);
        }
      });

      console.log(countries);

      this.cards[1].subtitle = countries.length;
    },
  },
  created() {
    this.getMembers();
  },
};
</script>

<style scoped>
p.text-h4 {
  font-size: 2rem !important;
  font-weight: lighter;
  line-height: 2rem;
  text-align: center;
}
</style>