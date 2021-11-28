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
        snackbarText: "",
        activeDevice: "",
        serialPort: undefined
    },

    getters: {

        devicevalues(state) {
            return state.devicevalues;
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
        setSerialPort(state, port) {
            state.serialPort = port
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
        },
        deviceListener(store, device) {
            this.commit('setDevice', device)
        },
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
    }
})
