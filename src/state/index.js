import Vuex from "vuex"
import Vue from "vue"

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        ws: new WebSocket(`ws://${window.location.hostname}:3000`),
        deviceValues: {
          "temperature": 0,
          "humidity": 0,
          "sensor1": 0
        },
    },
    getters: {},
    mutations: {
        updateDeviceValues: (state, data) => {
            state.deviceValues = data
        }
    },
    actions: {
        parseMessage: (store, message) => {
            store.commit('updateDeviceValues', message)
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