/**
 * Sensor.vue: Components on home-page that display real-time values from all devices.
 */

<template>
  <div>
    <h2>Device: {{liveValues.device_id}}</h2> 
      <div class="d-flex flex-wrap">
        <moisture-card  v-for="(moisture, index) in liveValues.sensors.moisture" :key="moisture.key" 
          class="ma-1"
          :percentage="moisture.value"
          :level="index">
        </moisture-card>

        <SensorValueCard v-for="(temp, index) in liveValues.sensors.temperature" :key="temp.key" 
          class="ma-1"
          sensor="🌡️ Temperature"
          :value="temp.value"
          unit="°C"
          :level="index">
        </SensorValueCard>

        <SensorValueCard
          class="ma-1"
          sensor="☀️ Light intensity"
          :value="liveValues.sensors.light.value"
          unit="Lumens">
        </SensorValueCard>
      </div>
  </div>
</template>


<script>
import MoistureCard from '@/components/MoistureCard'
import SensorValueCard from '@/components/SensorValueCard'
export default {
  name: 'Sensor',
  props: ['liveValues'],
  components: {
    MoistureCard,
    SensorValueCard
  },
}
</script>