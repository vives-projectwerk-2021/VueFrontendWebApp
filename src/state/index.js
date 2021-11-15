import Vuex from "vuex"
import Vue from "vue"
import { Sensors } from "@/api/pulu"

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        ws: undefined,
        wsReadyState: undefined,
        liveDeviceValues: [],
        sensorsComponentsUpdate: 1, /*  annoying solution to update component if device already exists,
                                        but nothing else seems to work 😒 */
        hasReceivedData: false,
        devicelist: [],
        devicevalues: {},
        snackbarText: "",
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
                state.liveDeviceValues.splice(entityPosition, 1)
            }
            state.liveDeviceValues.unshift(message.data)

            state.sensorsComponentsUpdate ^= 1
            state.hasReceivedData = true
        },

        connectToWs: (state, connection) => {
            state.ws = connection
            state.wsReadyState = connection.readyState
        },

        changeDevices(state,payload) {
            state.devicelist = payload.devicelist;
        },

        changeDeviceInfo(state,payload){
            state.devicevalues = payload.devicevalues
          
        },
        addSensor(state, payload) {
            state.snackbarText = payload
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
        },

        getAllSensors({commit} ){
            Sensors.get_all_sensors()
            .then((response) => {
                console.log(response);

                commit('changeDevices', {
                    devicelist: response.data
                })
                this.devicelist = response.data
            })
            .catch((error) => console.log(error));
        },

        getSensorById({commit}, id){
            Sensors.get_sensor_by_id(id)
            .then((response) => {

                commit('changeDeviceInfo', {
                    devicevalues: response.data
                })
                this.devicevalues = response.data
                console.log(this.devicevalues)
            })
            .catch((error) => console.log(error));
          
          },
        
        addSensor(store, payload) {
            console.log(payload);
            Sensors.add_sensor(payload)
            .then((response) => {
                console.log(response);
                if (response.data == "Already exists") {
                  this.commit('addSensor', `The device with deviceid: ${payload.deviceid} already exists`)
                } else {
                  this.commit('addSensor', `The device: ${payload.devicename} have been created!`)
                }
              })
            .catch((err) => {
                console.log(err);
              });
        }

    }
})
