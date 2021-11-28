<template>
    <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn 
          v-bind="attrs"
          v-on="on"
          >
          Auto detect
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Detect device id
        </v-card-title>

        <v-card-text>
          Attention! 
          <br/>
          This feature only works if you are using a chromium browser on Windows.
          <br/>
          In order to automatically detect your device, make sure your device is plugged-in to your computer.
          <br/>
          Next, click proceed and select your device.
          <br/>
          If you encounter any problems try unplugging and replugging your device.

        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="getDeviceId"
          >
            Proceed
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'SerialConnect',
  data(){
    return {
      serialPort: undefined,
      dialog: false
    }
  },
  methods: {
    getDeviceId() {
      this.dialog = false
      navigator.serial.requestPort()
      .then(async (port) => {   // Open serial port
        this.serialPort = port
        if (!this.serialPort.readable){
          await this.serialPort.open({ baudRate: 115200 });
        }
      })
      .then( async () => {      // Read the response
        this.serialWriter("aWQ=")
        const device_Id = await this.read()
        console.log("Device-id: " + device_Id)
        this.$emit('deviceId', device_Id)
      })
      .catch((error) => {
        console.log(error)
      });
    },
    async read() {
      let text = ""
      while (text.length <= 16 && this.serialPort.readable) {
        let reader = this.serialPort.readable.getReader();
        try {
          while (text.length <= 16) {
            let { value, done } = await reader.read();
            if (done) {
              break;
            }
            const part = new TextDecoder().decode(value)
            text += part
          }
        } catch (error) {
          console.log(error)
        } finally {
          reader.releaseLock();
        }
      }

      const buffer = Buffer.from(text, 'base64')
      const deviceId = buffer.toString('hex');
      return deviceId
    },
    async serialWriter(str) {
      const encoder = new TextEncoder();
      const writer = this.serialPort.writable.getWriter();
      await writer.write(encoder.encode(str));
      writer.releaseLock();
    }
  }
}
</script>
