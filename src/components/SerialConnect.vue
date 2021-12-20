<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on" block dark color="green darken-1"> Auto detect </v-btn>
    </template>

    <v-card>
      <v-card-title class="text-h5 grey lighten-2">
        Detect device id
      </v-card-title>

      <v-card-text>
        Attention!
        <br />
        This feature only works if you are using a chromium browser on Windows.
        <br />
        In order to automatically detect your device, make sure your device is
        plugged-in to your computer.
        <br />
        Next, click proceed and select your device.
        <br />
        If you encounter any problems try unplugging and replugging your device.
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="getDeviceId"> Proceed </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "SerialConnect",
  data() {
    return {
      serialPort: undefined,
      dialog: false,
    };
  },
  methods: {
    async getDeviceId() {
      this.dialog = false;
      await this.$store
        .dispatch("serial/openSerialPort")
        .then(async () => {
          // Read the response
          this.serialWriter("aWQ=");
          const device_Id = await this.$store.dispatch(
            "serial/readSerialPort",
            16
          );
          this.$emit("deviceId", device_Id);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async serialWriter(str) {
      const encoder = new TextEncoder();
      const writer = this.$store.state.serial.serialPort.writable.getWriter();
      await writer.write(encoder.encode(str));
      writer.releaseLock();
    },
  },
};
</script>
