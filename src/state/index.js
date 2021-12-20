import Vuex from "vuex"
import Vue from "vue"
import router from '../router'
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
        deviceiddevice: "",
        latestDeviceValue: {},

        members:22,

        snackbarText: "",
        deviceidText: "Invalid Device ID: Can only be a hexadecimal value.",
        deviceLatText: "Invalid Latitude! (-180 to 180)",
        deviceLongText: "Invalid Longitude! (-90 to 90)",

        latlng: undefined,

        backgroundColor: "grey darken-3",
        navBarColor: "green darken-3",
        footerColor: "grey darken-4",
        accentColorA: "green darken-3"
    },

    getters: {

        devicevalues(state) {
            return state.devicevalues;
        },

        devicelist(state) {
            return state.devicelist
        },
        latestDeviceValue(state) {
            return state.latestDeviceValue
        }
    },

    mutations: {
        changeDevices(state,payload) {
            state.devicelist = payload.devicelist;
        },

        changeDeviceInfo(state,payload){
            state.devicevalues = payload.devicevalues;
            state.latestDeviceValue = payload.devicevalues.values.splice(-1)[0]
        },
        addSensor(state, payload) {
            state.snackbarText = payload
        },
        setDevice(state, device) {
            state.activeDevice = device
        },
        setLatLng(state, payload) {
            state.latlng = payload
        },
        changeMembers(state,payload){
            state.members=payload
        },
        changedeviceiddevice(state, payload) {
            state.deviceiddevice = payload;
        },
    },
    
    actions: {
        getMembers({commit}){
            return Sensors.get_members()
            .then((response)=>{
                

                commit('changeMembers',{
                    members:response.data
                })
                this.members=response.data
            }).catch((error)=>console.log(error))
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

        getSensorById({commit}, id){
            Sensors.get_sensor_by_id(id)
            .then((response) => {

                commit('changeDeviceInfo', {
                    devicevalues: response.data
                })
                this.devicevalues = response.data
            })
            .catch((error) => console.log(error));
          
        },
        
        addSensor(store, payload) {
            Sensors.add_sensor(payload)
            .then((response) => {
                if (response.data == "Already exists") {
                  this.commit('addSensor', `The device with deviceid: ${payload.deviceid} already exists`)
                } else {
                  this.commit('addSensor', `The device: ${payload.devicename} have been created!`)
                  router.push(`/sensors/${payload.deviceid}`)
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
