/**
 * Sensor.vue: Components on home-page that display real-time values from all devices.
 */

<template>
  <div>
    <h2>device: {{liveValues.device_id}}</h2> 
      <div class="d-flex flex-wrap">
        <moisture-card  v-for="(moisture, index) in liveValues.sensors.moisture" :key="moisture.key" 
          class="ma-1"
          :percentage="moisture.value"
          :level="index">
        </moisture-card>
        
        <temperature-card v-for="(temp, index) in liveValues.sensors.temperature" :key="temp.key" 
          class="ma-1"
          :temperature="temp.value"
          :level="index">
        </temperature-card>
      </div>
  </div>
</template>


<script>
import MoistureCard from '@/components/MoistureCard'
import TemperatureCard from '@/components/TemperatureCard'

export default {
  name: 'Sensor',
  props: ['liveValues'],
  components: {
    MoistureCard,
    TemperatureCard
  },
}
</script>
