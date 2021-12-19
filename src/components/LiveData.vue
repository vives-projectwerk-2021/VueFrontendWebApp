<template>
  <div>
    <div class="d-flex justify-space-between my-3">
      <h2>Live data: {{liveValues.time.substr(0,10)}} {{liveValues.time.substr(11,5)}}</h2>
      <v-btn
        @click="fold"
        elevation="0" fab plain small
      >
        <v-icon>mdi-chevron-down</v-icon>
      </v-btn>
    </div>
  
  
    <div v-if="displayContent" class="d-flex flex-wrap">
      <MoistureCard  v-for="(moisture, index) in liveValues.sensors.moisture" :key="moisture.key" 
        class="ma-1"
        :percentage="Math.round(moisture.value*100)/100"
        :level="index">
      </MoistureCard>

      <SensorValueCard v-for="(temp, index) in liveValues.sensors.temperature" :key="temp.key" 
        class="ma-1"
        sensor="🌡️ Temperature"
        :value="Math.round(temp.value*100)/100"
        unit="°C"
        :level="index">
      </SensorValueCard>

      <SensorValueCard
        class="ma-1"
        sensor="☀️ Light intensity"
        :value="Math.round(liveValues.sensors.light.value*100)/100"
        unit="Lumens">
      </SensorValueCard>
      <SensorValueCard
        class="ma-1"
        sensor="🔋 Battery level"
        :value="Math.round(liveValues.sensors.voltage.battery.value*100)/100"
        unit="%">
      </SensorValueCard>
    </div>
  </div>
</template>

<script>
import MoistureCard from '@/components/MoistureCard'
import SensorValueCard from '@/components/SensorValueCard'
export default {
  name:"LiveData",
  props: ['liveValues'],
  components: {
    MoistureCard,
    SensorValueCard
  },
  data(){
    return {
      displayContent: true
    }
  },
  methods: {
    fold(){
      this.displayContent = !this.displayContent
    }
  }

}
</script>
