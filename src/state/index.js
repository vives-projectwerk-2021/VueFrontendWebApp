import Vuex from "vuex"
import Vue from "vue"

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        ws: undefined,
        wsReadyState: undefined,
        liveDeviceValues: [],
        sensorsComponentsUpdate: 1, /*  annoying solution to update component if device already exists,
                                        but nothing else seems to work 😒 */
        hasReceivedData: false
    },

    getters: {},

    mutations: {
        updateDeviceValues: (state, message) => {
            let doesEntityExist = false
            let entityPosition = 0

            for(let i=0; i<state.liveDeviceValues.length; i++) {
                if(state.liveDeviceValues.length > 0 && state.liveDeviceValues[i].device_id == message.data.device_id){
                    doesEntityExist = true
                    entityPosition = i
                }
            }

            if(doesEntityExist) {
                state.liveDeviceValues[entityPosition] = message.data
            } else {
                state.liveDeviceValues.push(message.data)
            }
            state.sensorsComponentsUpdate ^= 1
            state.hasReceivedData = true
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
            let isValidConnection = false
            try {
                wsConnection =  new WebSocket(Vue.prototype.$VUE_APP_WS)
                wsConnection.addEventListener('message', (message) => {
                    message = JSON.parse(message.data)
                    console.log(message)
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
        }
    }
})
