<template>
  <div>
    <v-container>
      <v-row justify="center">
        <v-col cols="6">
          <div class="text-center">
            <p class="text-h1">About Pulu Sandbox</p>
            <p>
              Automatically put a pull request into a new pulu sandbox.
              Comment on the pr to display the proxy port.
              Run the commented command and visit your own pr sandbox.
              Yeah overkill, but it works.
            </p>
          </div>
        </v-col>
      </v-row>
    </v-container>
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