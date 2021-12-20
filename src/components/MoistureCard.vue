<template>
  <v-card outlined flat>
    <v-container style="text-align: center;">
      <v-row justify="center">
        <v-icon color="light-blue">mdi-water</v-icon>
        <v-card-title class="mb-0">Moisture</v-card-title>
      </v-row>
      <p class="mb-0">{{ level }}</p>
      <div class="mx-auto d-flex justify-center" v-if="percentage">
        <Progress
          :transitionDuration="0"
          :radius="50"
          :strokeWidth="10"
          :value="percentage"
        >
        </Progress>
      </div>
    </v-container>
  </v-card>
</template>

<script>
import Progress from "easy-circular-progress";
export default {
  name: "MoistureCard",
  props: ["percentage", "level"],
  components: {
    Progress,
  },
};
</script>

<style>
</style>