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
    },


    get_sensor_by_id(id){
        console.log("Getting sensor with id: " + id );
        return api.get(`/devices/${id}`)
    },
    
    add_sensor(json){
        console.log("Post new sensor");
        return api.post(`/devices`, json);
    }
}

export { api, Sensors}