<template>
  <div>
    <v-card color="#B4BF5E">
      <v-row justify="center">
        <v-col cols="3">
          <div class="text-center">
            <h1>About the pulu project</h1>
            <p>We are a team of 21 students, making our project a reality.</p>
          </div>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="3" md="6"  offset-md="-3">
          <div class="text-center">
            <h1 class="pa-2">The jurney to our final product</h1>
            <p>test</p>
          </div>
        </v-col>
        <v-col cols="3" md="3">
          <v-card>
            <v-parallax
              src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
            ></v-parallax>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "AboutPage",
};
</script>