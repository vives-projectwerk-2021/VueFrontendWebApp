<template>
    <div>
                <vue-ellipse-progress
                  :progress="(100/50)*deviceValues.temperature"
                  :determinate="false"
                  color="#009E45"
                  empty-color="#324c7e"
                  :size="180"
                  :thickness="5"
                  :empty-thickness="3"
                  lineMode="in 10"
                  :legend-value="deviceValues.temperature"
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
                  :progress="deviceValues.humidity"
                  :determinate="false"
                  color="#009E45"
                  empty-color="#324c7e"
                  :size="180"
                  :thickness="5"
                  :empty-thickness="3"
                  lineMode="in 10"
                  :legend-value="deviceValues.humidity"
                  animation="loop 700 1000"
                  fontSize="1.5rem"
                  font-color="#009E45"
                  dash="4"
                  :loading="false"
                  
                >
                  <span slot="legend-value">%</span>
                  <p slot="legend-caption">Humidity</p>
                </vue-ellipse-progress>
    </div>
</template>

                
      

<script>
export default {
    name: 'Sensor',

    data(){
        return{

        }
    },
    computed: {
    deviceValues() {
      return this.$store.state.deviceValues
    }
  }

}
</script>
