<template>
  <div>
    <v-container>
      <v-row justify="center">
        <v-col cols="10" md="7">
          <div class="text-center">
            <p class="text-h1">About us</p>
            <p>
              We are a team of 21 students, all in our last year, studying ICT
              at Vives in Bruges. We are going to use our expertise and what
              we've learned over the years in this all-round group project.
            </p>
            <p class="text-h2">About the project</p>
            <p>
              Our goal is to build a functioning moist sensor network with easy
              implementation to add sensors on the go and by whoever wants or
              needs it.
            </p>
            <p>
              We got split into 4 groups, being: DevOps,Hardware,Software and
              Firmware.
            </p>
          </div>
        </v-col>
      </v-row>
      <v-row justify="center" class="flex-wrap">
        <v-col cols="10" md="4">
          <div>
            <p id="DevOps" class="text-h2">DevOps</p>
            <p>
              DevOps is about removing the barriers between traditionally siloed
              teams, development and operations.
              Under a DevOps model, development and operations teams work
              together across the entire software application life cycle, from
              development and test through deployment to operations.
            </p>
          </div>
        </v-col>
        <v-col cols="8" md="3">
          <div class="text-center">
            <v-card elevation="2" shaped>
              <v-parallax
                id="parallax1"
                src="../assets/DevOps.png"
                height="350"
              ></v-parallax>
              <!-- All picture are under the creative common license -->
            </v-card>
          </div>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col order-sm="1" order-md="3" cols="10" md="4">
          <div>
            <p id="hardware" class="text-h2">Hardware</p>
            <p id="hardwareText">
              In team Hardware we focus on the most essential item in this
              project, the hardware.
              Our job consists out of designing and assembling the print, that
              will be used in every complete sensor. We make this from scratch.
              We have worked with multiple prototypes, so that at the end of the
              journey we get the best result for this project.
            </p>
          </div>
        </v-col>
        <v-col order="2" cols="8" md="3">
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
      </v-row>

      <v-row justify="center">
        <v-col cols="10" md="4">
          <div>
            <p id="DevOps" class="text-h2">Software</p>
            <p>
              In team Software we take care of the back- and front-end.
              The backend is formating the data and sending it to the right position, which could be a database or the frontend for example.
              We also make sure that all databases are configured as they should be.
              Getting the data from the firmware is also our job so we have a ttn listener that receives incoming messanges.
            </p>
          </div>
        </v-col>
        <v-col cols="8" md="3">
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

      <v-row justify="center" cols="8">
        <v-col order-sm="1" order-md="3" cols="10" md="4">
          <div>
            <p id="hardware" class="text-h2">Firmware</p>
            <p id="hardwareText">
              In team Firmware we make the connection between the hardware and
              backend.
              For that we make use of the LoRaWAN protocol.
              The main goal of us is to get the data values from the sensors in
              the field to the backend. 
              Then we can use these sensor values in the dashboard of the
              application.
            </p>
          </div>
        </v-col>
        <v-col order="2" cols="8" md="3">
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
      </v-row>
      <div class="pt-14 text-center">
        <a href="https://www.paypal.com/donate/?hosted_button_id=P5DB7PHDYZWNU">
        <img src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif">
      </a>
      </div>

    </v-container>
  </div>
</template>

<script>
export default {
  name: "AboutPage",
};
</script>


<style>

</style>