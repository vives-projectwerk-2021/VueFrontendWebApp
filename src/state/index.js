import Vuex from "vuex"
import Vue from "vue"

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        ws: new WebSocket(`ws://${window.location.hostname}:3000`),
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
                "air": {value: Number},
                "ground": {value: Number}
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
        }
    },
    actions: {
        parseMessage: (store, message) => {
            if(message.message == "sensor-data"){
                store.commit('updateDeviceValues', message)
            }
        }
    },
    plugins: [
        (store) => {
            store.state.ws.addEventListener('message', (message) => {
                console.log(message.data)
                store.dispatch('parseMessage', JSON.parse(message.data))
            })
        }
    ]
})