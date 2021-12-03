<template>
  <v-app id="Pulu App">
    
    <nav-bar/>

    <v-main class="grey lighten-4">
      <v-container>
        <v-row>
          <v-col>
            <v-sheet min-height="80vh" rounded="lg" class="mx-10">
              <v-col>
                <router-view/>
              </v-col>
            </v-sheet>
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
  }
};
</script>