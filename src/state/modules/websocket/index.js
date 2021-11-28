import Vue from "vue"

const websocket =  {
  namespaced: true,
  state: {
    ws: undefined,
    wsReadyState: undefined,
    liveDeviceValues: {},
  },
  mutations: {
    updateDeviceValues: (state, message) => {
      if (message.data && message.data.device_id == state.activeDevice) {
        state.liveDeviceValues = message.data
      }
    },
    connectToWs: (state, connection) => {
      state.ws = connection
      state.wsReadyState = connection.readyState
    },
  },
  actions: {
    parseMessage: (store, message) => {
      if(message.message == "sensor-data"){
        store.commit('updateDeviceValues', message)
      }
    },
    tryWsConnection: (store) => {
      let wsConnection = undefined
      let isValidConnection = false
      try {
        wsConnection =  new WebSocket(Vue.prototype.$VUE_APP_WS)
        wsConnection.addEventListener('message', (message) => {
          message = JSON.parse(message.data)
          if(isValidConnection){
            store.dispatch('parseMessage', message)
          } else if (message.message == "welcome") {
            isValidConnection = true
            store.commit('connectToWs', wsConnection)
          }
        })
      } catch (err){
        console.log(`Can't connect to WebSocket ${Vue.prototype.$VUE_APP_WS}`)
      }
    },
  },
}

export default websocket