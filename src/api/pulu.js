import axios from 'axios';
import {config} from '@/config.js';

const api = axios.create({
    baseURL: config.VUE_APP_BACKEND_BASE_URL
});

const Sensors = {
    resource: 'sensors',

    get_all_sensors(){
        console.log("Getting all sensors");
        return api.get(`/${this.resource}`);
    },


    get_sensor_by_id(id){
        console.log("Getting sensor with id: " + id );
        return api.get(`/${this.resource}/${id}`)
    },
    
    add_sensor(json){
        console.log("Post new sensor");
        return api.post(`/${this.resource}`, json);
    },


    get_members(){
        console.log("Getting members");
        return api.get(`/members`)

    delete_sensor(id) {
        console.log("Delete sensor with id:" + id);
        return api.delete(`/${this.resource}/${id}`)
    }
}

const TTN = {
    resource: 'ttn-device-manager',

    registerDevice(json){
        return api.post(`/${this.resource}`, json);

    }
}

export { api, Sensors, TTN}