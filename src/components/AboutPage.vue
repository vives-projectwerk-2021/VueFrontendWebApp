<template>
  <div>
      <v-container>
        <v-row justify="center">
          <v-col cols="6">
            <div class="text-center">
              <p class="text-h1">About us</p>
              <p>
                We are a team of 21 students, all in our last year, studying ICT at Vives in Bruges.
                We are going to use our expertise and what we've learned over the years in this all-round group project.
              </p>
              <p class="text-h2">About the project</p>
              <p>
                Our goal is to build a 
                functioning moist sensor network with easy implementation to add
                sensors on the go and by whoever wants or needs it.
              </p>
              <p>
                We got split into 4 groups, being: DevOps,Hardware,Software and Firmware.
              </p>
            </div>
          </v-col>
        </v-row>
        <v-row align="center" id="row">
          <v-col>
            <div>
              <p id="DevOps" class="text-h2">DevOps</p>
              <p>DevOps is about removing the barriers between traditionally siloed teams, development and operations. 
                <br>
                Under a DevOps model, development and operations teams work together across the entire software application life cycle, 
                from development and test through deployment to operations.</p>
            </div>
          </v-col>
          <v-col>
            <div class="text-center">
              <v-card elevation="2" shaped>
                <v-parallax
                  id="parallax1"
                  src="../assets/DevOps.png"
                  height="350"
                ></v-parallax> <!-- All picture are under the creative common license -->
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
                  src="../assets/pcb_front_.png"
                  height="350"
                ></v-parallax>
              </v-card>
            </div>
          </v-col>
          <v-col>
            <div>
              <p id="hardware" class="text-h2">Hardware</p>
              <p id ="hardwareText">
                In team Hardware we focus on the most essential item in this project, the hardware.
                <br>
                Our job consists out of designing and assembling the print, that will be used in every complete sensor. We make this from scratch.
                <br>
                We have worked with multiple prototypes, so that at the end of the journey we get the best result for this project.
              </p>
            </div>
          </v-col>
        </v-row>

        <v-row align="center" id="row2">
          <v-col>
            <div>   
              <p id="DevOps" class="text-h2">Software</p>
              <p>
                We are a team of 21 students, whose job is to build a
                functioning moist sensor network with easy implementation to add
                sensors on the go and by whoever wants or needs it.
              </p>
            </div>
          </v-col>
          <v-col>
            <div class="text-center">
              <v-card elevation="2" shaped>
                <v-parallax
                  id="parallax1"
                  src="../assets/software_pic.jpg"
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
                  src="../assets/firmeware.png"
                  height="350"
                ></v-parallax>
              </v-card>
            </div>
          </v-col>
          <v-col>
            <div>
              <p id="hardware" class="text-h2">Firmware</p>
              <p id ="hardwareText">
                In team Hardware we focus on the most essential item in this project, the hardware.
                <br>
                Our job consists out of designing and assembling the print, that will be used in every complete sensor. We make this from scratch.
                <br>
                We have worked with multiple prototypes, so that at the end of the journey we get the best result for this project.
              </p>
            </div>
          </v-col>
        </v-row>
      </v-container>
    <!-- </v-card> -->
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
#DevOps {
  margin-top: -10%;
}
#hardware {
  margin-top: -5%;
  margin-left: 3%;
}
#hardwareText {
  margin-left: 3%;
  margin-right: 41%;
}
</style>