<template>
  <v-card width="296" height="200">
    <v-container>
      <p>🌡️ Temperature {{level}}</p>
      <div class="text-h1">{{temperature}}°C</div>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: 'TemperatureCard',
  props: ['temperature', 'level']
}
</script>