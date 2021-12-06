import axios from 'axios';
import {config} from '@/config.js';

const api = axios.create({
  baseURL: 'https://api.mapbox.com'
});

const Map = {
  resource: 'geocoding/v5/mapbox.places',

  reverse_geolocation(lat, long){
    return api.get(`/${this.resource}/${long}, ${lat}.json?access_token=${config.VUE_APP_MAPBOX_TOKEN}`);
  }
}

export { Map }