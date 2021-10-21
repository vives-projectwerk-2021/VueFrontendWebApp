/**
 * Sensor.vue: Components on home-page that display real-time values from all devices.
 */

<template>
  <div>
    <h2>device: {{liveValues.device_id}}</h2>
    <vue-ellipse-progress
      :progress="(100/50)*liveValues.sensors.temperature.air.value"
      :determinate="false"
      color="#009E45"
      empty-color="#324c7e"
      :size="180"
      :thickness="5"
      :empty-thickness="3"
      lineMode="in 10"
      :legend-value="liveValues.sensors.temperature.air.value"
      animation="loop 0 0"
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
      :progress="liveValues.sensors.moisture.level1.value"
      :determinate="false"
      color="#009E45"
      empty-color="#324c7e"
      :size="180"
      :thickness="5"
      :empty-thickness="3"
      lineMode="in 10"
      :legend-value="liveValues.sensors.moisture.level1.value"
      animation="loop 0 0"
      fontSize="1.5rem"
      font-color="#009E45"
      dash="4"
      :loading="false"
    >
      <span slot="legend-value">%</span>
      <p slot="legend-caption">Moisture level1</p>
    </vue-ellipse-progress>
  </div>
</template>


<script>
export default {
  name: 'Sensor',
  props: ['liveValues'],
}
</script>
