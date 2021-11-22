<template>
  <div>
    <v-carousel cycle height="300px" hide-delimiter-background  :show-arrows="false" class="rounded-xl">
      <v-carousel-item
        v-for="(slide, i) in slides"
        :key="i"
        :src="slide.src"
      >
        <v-row class="title fill-height" align="center" justify="center">
          <div :style="{ background: activeColor }" class="pa-3 text-no-wrap rounded-lg">
            <h3>Pulu: Smart Self-Sufficient Open Wireless Soil Moisture Sensor</h3>
          </div>
        </v-row>
      </v-carousel-item>
    </v-carousel>
    <br>
    <div>
      <v-sheet align="center" border="">
        <h3 class="mx-16">
          The Pulu moisture sensor can be used to measure the moisture in the ground. This is very usefull for farmers who want to know the exact value of moisture at different depths. The Pulu sensor is also very user friendly. By scanning a QR code on the sensor you can easily register it on our app. After that you can see the dashboard of your sensor with time lapse of the sensor data.
        </h3>
      </v-sheet>
    </div>
    <br>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',

  data() {
    return {
      activeColor: 'white',
      slides: [
        {
          src: require('../img/image_one.jpg')
        },
        {
          src: require('../img/image_two.jpg')
        },
        {
          src: require('../img/image_three.jpg')
        },
        {
          src: require('../img/image_four.jpg')
        },
        {
          src: require('../img/image_five.jpg')
        }
      ]
    }
  }

}
</script>
