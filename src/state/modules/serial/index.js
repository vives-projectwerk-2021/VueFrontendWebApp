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
  },
}

export default serial