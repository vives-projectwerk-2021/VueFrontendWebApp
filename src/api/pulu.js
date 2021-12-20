import axios from 'axios';
import {config} from '@/config.js';

const api = axios.create({
    baseURL: config.VUE_APP_BACKEND_BASE_URL
});

const Sensors = {
    resource: 'sensors',

    get_all_sensors(){
        return api.get(`/${this.resource}`);
    },


    get_sensor_by_id(id, time){
        return api.get(`/${this.resource}/${id}${time}`)
        
    },
    
    add_sensor(json){
        return api.post(`/${this.resource}`, json);
    },


    get_members(){
        return api.get(`/members`)
    },

    delete_sensor(id) {
        return api.delete(`/${this.resource}/${id}`)
    }
}

const TTN = {
    resource: 'ttn-device-manager',

    registerDevice(json){
        return api.post(`/${this.resource}`, json);
    },

    removeDevice(id) {
        return api.delete(`/${this.resource}/${id}`)
    }
}

export { api, Sensors, TTN}
