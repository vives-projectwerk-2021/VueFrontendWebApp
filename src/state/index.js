import Vuex from "vuex"
import Vue from "vue"

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        ws: undefined,
        wsReadyState: undefined,
        deviceValues: {
          "device_id": String,
          "time": String,
          "sensors": {
            "battery": {
                "value": Number
            },
            "light": {
                "value": Number
            },
            "moisture": {
                "level1": {"value": Number},
                "level2": {"value": Number},
                "level3": {"value": Number},
                "level4": {"value": Number},
                "level5": {"value": Number},
                "level6": {"value": Number},
                "level7": {"value": Number},
                "level8": {"value": Number},
            },
            "temperature": {
                "air": {"value": Number},
                "ground": {"value": Number}
            }
          }
        },
        hasReceivedData: false
    },

    getters: {},

    mutations: {
        updateDeviceValues: (state, data) => {
            state.hasReceivedData = true
            state.deviceValues = data.data
        },
        connectToWs: (state, connection) => {
            state.ws = connection
            state.wsReadyState = connection.readyState
        }
    },
    
    actions: {
        parseMessage: (store, message) => {
            if(message.message == "sensor-data"){
                store.commit('updateDeviceValues', message)
            }
        },
        tryWsConnection: (store) => {
            let wsConnection = undefined
            try {
                wsConnection =  new WebSocket(process.env.VUE_APP_WS)
                setTimeout(() => {
                    if (wsConnection.readyState === 1) {
                        store.commit('connectToWs', wsConnection)
                        wsConnection.addEventListener('message', (message) => {
                            console.log(message.data)
                            store.dispatch('parseMessage', JSON.parse(message.data))
                        })
                    } else {
                        console.log("wait for connection...")
                    }
                }, 5)
            } catch (err){
                console.log("Can't connect to WebSocket")
            }
        }
    }
})