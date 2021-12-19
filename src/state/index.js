import Vuex from "vuex"
import Vue from "vue"
import { Sensors } from "@/api/pulu"

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        ws: undefined,
        wsReadyState: undefined,
        liveDeviceValues: {},
        devicelist: [],
        devicevalues: {},
        activeDevice: "",

        snackbarText: "",
        deviceidText: "Invalid Device ID: Can only be a hexadecimal value.",
        devicenameText: "Invalid Device Name: Can only be letters, numbers, underscores or dashes.",
        deviceLatText: "Invalid Latitude! (-180 to 180)",
        deviceLongText: "Invalid Longitude! (-90 to 90)",
        timeStamp: "?start=hour",

        latlng: undefined,
    },

    getters: {

        devicevalues(state) {
            return state.devicevalues;
        },

        devicelist(state)
        {
            return state.devicelist
        }
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

        changeDevices(state,payload) {
            state.devicelist = payload.devicelist;
        },

        changeDeviceInfo(state,payload){
            state.devicevalues = payload.devicevalues
          
        },
        addSensor(state, payload) {
            state.snackbarText = payload
        },
        setDevice(state, device) {
            state.activeDevice = device
        },
        setLatLng(state, payload) {
            state.latlng = payload
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
            return Sensors.get_all_sensors()
            .then((response) => {
                 console.log(response);

                commit('changeDevices', {
                    devicelist: response.data
                })
                this.devicelist = response.data
                

            })
            .catch((error) => console.log(error));
        },

        getSensorById({commit}, [id, timeStamp]){
            this.timeStamp = timeStamp
            Sensors.get_sensor_by_id(id, timeStamp)
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
        },
        deviceListener(store, device) {
            this.commit('setDevice', device)
        },
        updatelatlng(store, payload) {
            this.commit('setLatLng', payload)
        }

    }
})
