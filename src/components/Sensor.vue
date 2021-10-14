<template>
    <div v-if="hasReceivedValues">
      <h1>{{deviceValues.device_id}}</h1>
                <vue-ellipse-progress
                  :progress="(100/50)*deviceValues.sensors.temperature.air.value"
                  :determinate="false"
                  color="#009E45"
                  empty-color="#324c7e"
                  :size="180"
                  :thickness="5"
                  :empty-thickness="3"
                  lineMode="in 10"
                  :legend-value="deviceValues.sensors.temperature.air.value"
                  animation="loop 700 1000"
                  fontSize="1.5rem"
                  font-color="#009E45"
                  dash="4"
                  :loading="false"
                >
                  <span slot="legend-value">°C</span>
                  <p slot="legend-caption">Air temperature</p>
                </vue-ellipse-progress>


                <vue-ellipse-progress
                  class="ml-14"
                  :progress="deviceValues.sensors.moisture.level1.value"
                  :determinate="false"
                  color="#009E45"
                  empty-color="#324c7e"
                  :size="180"
                  :thickness="5"
                  :empty-thickness="3"
                  lineMode="in 10"
                  :legend-value="deviceValues.sensors.moisture.level1.value"
                  animation="loop 700 1000"
                  fontSize="1.5rem"
                  font-color="#009E45"
                  dash="4"
                  :loading="false"
                >
                  <span slot="legend-value">%</span>
                  <p slot="legend-caption">Moisture level1</p>
                </vue-ellipse-progress> 

                <!-- <vue-ellipse-progress
                  class="ml-14"
                  :progress="deviceValues.sensors.battery.value"
                  :determinate="false"
                  color="#009E45"
                  empty-color="#324c7e"
                  :size="180"
                  :thickness="5"
                  :empty-thickness="3"
                  lineMode="in 10"
                  :legend-value="deviceValues.sensors.battery.value"
                  animation="loop 700 1000"
                  fontSize="1.5rem"
                  font-color="#009E45"
                  dash="4"
                  :loading="false"
                >
                  <span slot="legend-value">%</span>
                  <p slot="legend-caption">Battery level</p>
                </vue-ellipse-progress>  -->
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
        console.log(this.$store.state.deviceValues.sensors.temperature.air.value)
        return this.$store.state.deviceValues
      },
      hasReceivedValues(){
        return this.$store.state.hasReceivedData
      }
  }

}
</script>
