<template>
  <v-card width="296" height="200">
    <v-container>
      <v-row>
        <v-icon :color="color">{{icon}}</v-icon>
        <p>{{sensor}} {{level}}</p>
      </v-row>
      <div class="d-flex flex-wrap">
        <p class="text-h1 mb-0">{{value}}</p>
        <p class="text-h4 align-self-end pb-1 mb-0">{{unit}}</p>
      </div>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: 'SensorValueCard',
  props: ['sensor', 'value', 'unit', 'level', 'icon', 'color']
}
</script>
