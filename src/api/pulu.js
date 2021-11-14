import axios from 'axios';
import {config} from '@/config.js';

const api = axios.create({
    baseURL: config.VUE_APP_BACKEND_BASE_URL
});

const Sensors = {
    resource: 'sensors',

    get_all_sensors(){
        console.log("Getting all sensors");
        return api.get(`/devices`);
    }
}

export { api, Sensors}