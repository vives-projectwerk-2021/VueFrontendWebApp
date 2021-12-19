<template>
  <v-card max-width="150">
    <v-container>
      <v-row>
        <v-icon color="light-blue">mdi-water</v-icon>
        <p class="mb-0">Moisture</p>
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