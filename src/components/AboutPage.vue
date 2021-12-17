<template>
  <v-sheet>

  
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="9" >
          <p class="text-h2">About us</p>
          <v-divider class="mb-6"></v-divider>
           <v-card elevation="2" shaped>
          <v-img
            src="../assets/rsz_img_20211206_174236.jpg"
            height="350"
          ></v-img>
            </v-card>

        </v-col>

        <v-col cols="12" md="9">
          
          
          <p class="text-h5 pb-15 text-justify" dark>
            We are a team of 21 students, all in our last year, studying ICT-Electronics at
            Vives in Bruges. We used our expertise and what we have
            learned over the years in this all-round group project.
          </p>
          <p class="text-h2 text-right pt-15">About the project</p>
          <v-divider class="mb-2"></v-divider>
          <div class="text-center pb-2 pt-5">
            <v-card elevation="2" shaped>
              <v-img
                src="../assets/20211213_154907.jpg"
                height="350"
              ></v-img>
              <!-- All picture are under the creative common license -->
            </v-card>
          </div>
          <p class="text-h5 pb-15 text-justify" >
            We build an application, some prototypes and the firmware going with it. So everything that would be needed to scale this project up.
            The idea is that everyone who needs a soil moisture sensor can use our opensource schematics to make their own hardware.
            Then add a device to our user-friendly website, and you should be good to go. Data flows from your device directly to our site where you can see
            all data that comes from your device. Even placed in interactive graphs and everything!
          </p>
          
        </v-col>
        <v-col cols="8" md="4"> </v-col>
      </v-row>

      <v-row justify="center" class="flex-wrap">
        <v-col cols="12" md="9">
          <p id="DevOps" class="text-h3 mt-12 mb-0 mb-n4">DevOps</p>
        </v-col>
        <v-col cols="12" md="9">
          <v-divider></v-divider>
        </v-col>

        <v-col cols="10" md="5">
          <div>
            <p class="text-h5 text-justify">
              DevOps is about removing the barriers between traditionally siloed
              teams, development and operations. Under a DevOps model,
              development and operations teams work together across the entire
              software application life cycle, from development and test through
              deployment to operations.
            </p>
          </div>
        </v-col>
        <v-col cols="8" md="4">
          <div class="text-center">
            <v-card elevation="2" shaped>
              <v-parallax
                id="parallax1"
                src="../assets/rsz_20211206_164148.jpg"
                height="350"
              ></v-parallax>
              <!-- All picture are under the creative common license -->
            </v-card>
          </div>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col cols="8" md="2">
        </v-col>
        <v-col cols="10" md="7">
          <p id="DevOps" class="text-h3 mt-12 mb-0 mb-n4 text-right">Hardware</p>
        </v-col>

        <v-col cols="12" md="9">
          <v-divider></v-divider>
        </v-col>

        <v-col order-sm="1" order-md="3" cols="10" md="5">
          <div>
            <p id="hardwareText" class="text-h5 text-justify">
              In team Hardware we focus on the most essential item in this
              project, the hardware. Our job consists out of designing and
              assembling the print, that will be used in every complete sensor.
              We make this from scratch. We have worked with multiple
              prototypes, so that at the end of the journey we get the best
              result for this project.
            </p>
          </div>
        </v-col>
        <v-col order="2" cols="8" md="4">
          <div class="text-center">
            <v-card elevation="2" shaped>
              <v-parallax
                id="parallax2"
                src="../assets/rsz_20211206_164347.jpg"
                height="350"
              ></v-parallax>
            </v-card>
          </div>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col cols="12" md="9">
          <p class="text-h3 mt-12 mb-n4 mb-0">Software</p>
        </v-col>
        <v-col cols="12" md="9">
          <v-divider></v-divider>
        </v-col>

        <v-col cols="10" md="5">
          <div>
            <p class="text-h5 text-justify">
              In team Software we take care of the back- and front-end. The
              backend is formating the data and sending it to the right
              position, which could be a database or the frontend for example.
              We also make sure that all databases are configured as they should
              be. Getting the data from the firmware is also our job so we have
              a ttn listener that receives incoming messanges.
            </p>
          </div>
        </v-col>
        <v-col cols="8" md="4">
          <div class="text-center">
            <v-card elevation="2" shaped>
              <v-parallax
                id="parallax1"
                src="../assets/rsz_20211206_171448.jpg"
                height="350"
              ></v-parallax>
            </v-card>
          </div>
        </v-col>
      </v-row>

      <v-row justify="center" cols="8">
        <v-col cols="8" md="2">
        </v-col>
        <v-col cols="12" md="7">
          <p id="DevOps" class="text-h3 mt-12 mb-n4 text-right" >Firmware</p>
        </v-col>
        <v-col cols="12" md="9">
          <v-divider></v-divider>
        </v-col>

        <v-col order-sm="1" order-md="3" cols="10" md="5">
          <div>
            <p id="hardwareText" class="text-h5 text-justify">
              In team Firmware we make the connection between the hardware and
              backend. For that we make use of the LoRaWAN protocol. The main
              goal of us is to get the data values from the sensors in the field
              to the backend. Then we can use these sensor values in the
              dashboard of the application.
            </p>
          </div>
        </v-col>
        <v-col order="2" cols="8" md="4">
          <div class="text-center">
            <v-card elevation="2" shaped>
              <v-parallax
                id="parallax2"
                src="../assets/rsz_20211206_172737.jpg"
                height="350"
              ></v-parallax>
            </v-card>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script>
export default {
  name: "AboutPage",
};
</script>


<style>
</style>
