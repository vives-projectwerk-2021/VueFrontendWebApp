import Vuex from "vuex"
import Vue from "vue"
import { Sensors } from "@/api/pulu"
import serial from "./modules/serial/index"
import websocket from "./modules/websocket/index"


Vue.use(Vuex)

export const store = new Vuex.Store({
    modules: {
        serial,
        websocket
    },
    state: {
        devicelist: [],
        devicevalues: {},
        activeDevice: "",

        snackbarText: "",
        deviceidText: "Invalid Device ID: Can only be a hexadecimal value.",
        devicenameText: "Invalid Device Name: Can only be letters, numbers, underscores or dashes.",
        deviceLatText: "Invalid Latitude! (-180 to 180)",
        deviceLongText: "Invalid Longitude! (-90 to 90)",
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
    },
    
    actions: {
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
    }
})
