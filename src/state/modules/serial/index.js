const serial =  {
  namespaced: true,
  state: {
    serialPort: undefined,
  },
  mutations: {
    setSerialPort(state, port) {
      state.serialPort = port
    }
  },
  actions: {
    openSerialPort: async(store) => {
      let serialPort = undefined
      await navigator.serial.requestPort()
      .then(async (port) => {   // Open serial port
          serialPort = port
          if (!serialPort.readable){
              await serialPort.open({ baudRate: 115200 });
              store.commit('setSerialPort', serialPort)
          }
      })
    },
    async readSerialPort({state}, length) {
      let text = ""
      while (text.length <= length && state.serialPort.readable) {
        let reader = state.serialPort.readable.getReader();
        try {
          while (text.length <= length) {
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
    }
  },
}

export default serial