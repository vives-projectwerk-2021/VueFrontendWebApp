<template>
  <div>
    <!-- <v-card color="#B1B1AC">
      <v-row justify="center">
        <v-col cols="3">
          <div class="text-center">
            <h1>About the pulu project</h1>
            <p>
              We are a team of 21 students, whose job is to build a functioning
              moist sensor network with easy implementation to add sensors on
              the go and by whoever wants or needs it.
            </p>
          </div>
        </v-col>
      </v-row>
      <v-row justify="space-around">
        <v-col cols="4" md="3">
          <div class="text-center">
            <h1 class="pa-2">The journey to our final product</h1>
            <p>test</p>
          </div>
        </v-col>
        <v-col cols="4" md="3">
          <v-card>
            <v-parallax
              src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
              height="300"
            ></v-parallax>
          </v-card>
        </v-col>
      </v-row>
      start of the 3rd row
      <v-row justify="space-around" id="second_row_table">
        <v-col cols="8" md="3" >
          <div >
            <v-card>
            <v-parallax
              src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
              height="300"
            ></v-parallax>
          </v-card>
          </div>
          
        </v-col>
        <v-col cols="4" md="4">
          <div class="text-center">
            <h1 class="pa-2">The journey to our final product</h1>
            <p>test</p>
          </div>
        </v-col>
      </v-row>
    </v-card> -->
    <v-card color="white">
      <v-container>
        <v-row justify="center">
          <v-col cols="6">
            <div class="text-center">
              <h1>About the pulu project</h1>
              <p>
                We are a team of 21 students, whose job is to build a
                functioning moist sensor network with easy implementation to add
                sensors on the go and by whoever wants or needs it.
              </p>
            </div>
          </v-col>
        </v-row>
        <v-row align="center" id="row">
          <v-col>
            <div>
              <h1 id="journey">The journey to our final product</h1>
              <p>test</p>
            </div>
          </v-col>
          <v-col>
            <div class="text-center">
              <v-card elevation="2" shaped>
                <v-parallax
                  id="parallax1"
                  src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
                  height="350"
                ></v-parallax>
              </v-card>
            </div>
          </v-col>
        </v-row>

        <v-row align="center">
          <v-col>
            <div class="text-center">
              <v-card elevation="2" shaped>
                <v-parallax
                  id="parallax2"
                  src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
                  height="350"
                ></v-parallax>
              </v-card>
            </div>
          </v-col>
          <v-col>
            <div>
              <h1 id="journey2">The journey to our final product</h1>
              <p>test</p>
            </div>
          </v-col>
        </v-row>

        <v-row align="center" id="row2">
          <v-col>
            <div>
              <h1 id="journey">The journey to our final product</h1>
              <p> We are a team of 21 students, whose job is to build a
                functioning moist sensor network with easy implementation to add
                sensors on the go and by whoever wants or needs it.</p>
            </div>
          </v-col>
          <v-col>
            <div class="text-center">
              <v-card elevation="2" shaped>
                <v-parallax
                  id="parallax1"
                  src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
                  height="350"
                ></v-parallax>
              </v-card>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "AboutPage",
};
</script>


<style>
#second_row_table {
  margin-top: 10%;
}
#parallax1 {
  width: 100%;
  /* display: block;
  margin: 0 auto; */
  float: left;
}
#parallax2 {
  width: 59%;
  /* display: block;
  margin: 0 auto; */
  float: right;
}
#row {
  margin-left: 20%;
  margin-right: 20%;
  margin-top: 5%;
}
#row2 {
  margin-left: 20%;
  margin-right: 20%;
}
#journey {
  margin-top: -10%;
}
#journey2 {
  margin-top: -10%;
}
</style>