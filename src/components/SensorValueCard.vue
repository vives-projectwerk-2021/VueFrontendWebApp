<template>
  <v-card outlined flat>
    <v-container>
      <v-row justify="center">
        <v-icon :color="color">{{icon}}</v-icon>
        <v-card-title>{{sensor}} {{level}}</v-card-title>
      </v-row>
      <v-card-text style="text-align: center;" class="pa-1">
        <span class="text-h1 hidden-sm-and-up">{{value}}</span>
        <span class="text-h4 hidden-xs-only">{{value}} </span>
        
        <span class="text-h4 hidden-sm-and-up">{{unit}}</span>
        <span class="text-h5 hidden-xs-only">{{unit}} </span>
      </v-card-text>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: 'SensorValueCard',
  props: ['sensor', 'value', 'unit', 'level', 'icon', 'color']
}
</script>
