import axios from 'axios';

const api = axios.create({
    baseURL: `${process.env.VUE_APP_BACKEND_BASE_URL}`
    
});

const Sensors = {
    resource: 'sensors',

    get_all_sensors(){
        console.log("Getting all sensors");
        return api.get(`/devices`);
    }
}

export { api, Sensors}