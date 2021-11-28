import axios from 'axios';

const api = axios.create({
  baseURL: process.env.VUE_APP_TTN_DEVICE_MANAGER_BASE_URL
});

const TTN = {    
  registerDevice(json){
    console.log("Post new sensor");
    return api.post("/devices", json);
  }
}

export { api, TTN }