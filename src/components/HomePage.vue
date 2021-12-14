<template>
  <div>
    <br />

    <MapPage />

    <br />
    <v-divider dark></v-divider>
    <br />
    <div>
      <v-sheet align="center" :color="this.$store.state.backgroundColor" dark>
        <p class="text-h4">
          Pulu gives an overview of the current groundwater levels in Flanders.
        </p>
        <p class="text-h4">
          Our mission of this platform is to map these groundwater levels.
        </p>
      </v-sheet>
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
      <v-carousel-item v-for="(slide, i) in slides" :key="i" :src="slide.src">
        <v-row class="title fill-height" align="center" justify="center">
          <div
            :style="{ background: activeColor }"
            class="pa-2 w-50 text-no-wrap rounded-lg"
          >
            <h5>{{ slide.title }}</h5>
          </div>
        </v-row>
      </v-carousel-item>
    </v-carousel>
    <br />
    <v-divider></v-divider>
    <br />
    <v-row class="d-flex justify-space-around pb-5">
      <v-card
        dark
        :color="this.$store.state.accentColorA"
        v-for="card in cards"
        :key="card.id"
        width="250px"
        height="200px"
      >
        <h2 class="mt-4 font-weight-regular" style="text-align: center">
          {{ card.title }}
        </h2>
        <p
          class="mt-5 font-weight-black"
          :style="{ 'font-size': '50px' }"
          style="text-align: center"
        >
          {{ card.subtitle }}
        </p>
      </v-card>
    </v-row>
  </div>
</template>

<script>
// @ is an alias to /src
import MapPage from "@/components/MapPage.vue"

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
          subtitle: "0"
        }
      ]
      
    }
  },
  watch: {
    "$store.state.devicelist": {
      handler: function (nv) {
        if (nv) {
          this.cards[0].subtitle = nv.length;

          this.getCountries(nv);
        }
      },
      immediate: true // provides initial (not changed yet) state
    },
    "$store.state.members":{
      handler:function(amount){
        if(amount){
          this.cards[2].subtitle=amount.members

          console.log(amount.members)
        }
        
      }
    }
  },
  methods:{
    async getMembers(){
      this.$store.dispatch('getMembers');
      
      
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
