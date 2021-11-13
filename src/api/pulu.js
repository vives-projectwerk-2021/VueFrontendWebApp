import axios from 'axios';
import Vue from 'vue';

const api = axios.create({
    baseURL: Vue.prototype.$VUE_APP_BACKEND_BASE_URL || process.env.VUE_APP_BACKEND_BASE_URL
    
});

const Sensors = {
    resource: 'sensors',

    get_all_sensors(){
        console.log("Getting all sensors");
        return api.get(`/devices`);
    }
}

export { api, Sensors}