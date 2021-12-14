<template>
  <v-app id="Pulu App">
    <nav-bar />

    <v-main :class="color1">
      <v-container>
        <v-row>
          <v-col>
            <router-view/>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <FooTer/>
  </v-app>
</template>

<script>
import NavBar from '@/components/NavBar';
import FooTer from '@/components/FooTer'

export default {
  components: {
    NavBar,
    FooTer
  },
  data() {
    return {
      color1: this.$store.state.color1
    }
  }
};
</script>