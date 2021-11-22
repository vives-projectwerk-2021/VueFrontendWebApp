<template>
  <v-btn @click="connectToSerial">Auto detect</v-btn>
</template>

<script>
export default {
  name: 'SerialConnect',
  data(){
    return {
      serialPort: undefined,
      device_id: ""
    }
  },
  methods: {
    connectToSerial() {
      navigator.serial.requestPort()
      .then(async (port) => {   // Open serial port
        this.serialPort = port
        await this.serialPort.open({ baudRate: 115200 });
      })
      .then(async () => {       // Write "aWQ=" to serial port
        const encoder = new TextEncoder();
        const writer = this.serialPort.writable.getWriter();
        await writer.write(encoder.encode("aWQ="));
        writer.releaseLock();
      })
      .then( async () => {      // Read and decode the response
        const encodedId = await this.read()
        const buffer = Buffer.from(encodedId, 'base64')
        this.device_id = buffer.toString('hex');
        console.log("Device-id: " + this.device_id)
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
      return text
    },
  }
}
</script>
