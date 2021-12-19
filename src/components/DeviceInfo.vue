<template>
    <div>
        <v-container fluid>
            <v-row class="green darken-3">
                <v-col>
                    <p class="text-h2 text-center white--text">Your Devices</p>
                </v-col>
            </v-row>
            <v-row class="text-h4 green darken-3">
                <v-col>
                    <p class="text-center white--text">On this page you can consult your devices in more detail</p>
                </v-col>
            </v-row>
            <v-row>
                 <v-col class="green darken-3" cols="6" v-for="device in devicelist" :key="device.id">
                        <v-card class="rounded-lg" v-if="device.location.lat && device.location.long" color="#545452" elevation="5">
                            <v-card-title  color="#434342"><router-link  class="white--text" :to="{ name: 'Sensor', params: {deviceId: device.deviceid} }">{{device.devicename}}</router-link></v-card-title>
                            <v-spacer></v-spacer>
                            <v-row class="white--text text-h3">
                                <v-col>
                                    <v-card-text class="text-h6">Device ID: {{ device.deviceid }} </v-card-text>
                                    <v-card-text class="text-h6" v-if="device.location.place_name">Location: {{ device.location.place_name }}</v-card-text>
                                    <v-card-text class="text-h6" v-else>Location: [{{ device.location.lat }}, {{ device.location.long }}]</v-card-text>

                                    <v-card-text class="text-h6">Last Moisture Level: 20% </v-card-text>
                                    <v-card-text class="text-h6">Last Temperature Value: 18.5°C </v-card-text>
                                </v-col>
                            </v-row>
                            <v-card-text>
                            
                                <map-lat-long v-if="device.location.lat && device.location.long" 
                                v-bind:lat="device.location.lat" 
                                v-bind:long="device.location.long" 
                                v-bind:device="device.deviceid"
                                />

                            </v-card-text>
                                
                            <v-card-actions>
                            <v-spacer/>
                            <delete-sensor-button class="grey darken-4 rounded-xl" :sensorid="device.deviceid"/>
                            </v-card-actions>
                        </v-card>
                 </v-col>
            </v-row>
        </v-container>
        <v-btn
          elevation="2"
          color="green"
          :to="{ name: 'AddSensor' }"
          fab
          dark
          large
          absolute
          bottom
          right
        ><v-icon>mdi-plus</v-icon></v-btn>
    </div>
</template>

<script>

import { mapState} from 'vuex';
import DeleteSensorButton from '@/components/DeleteSensorButton.vue'
import MapLatLong from '@/components/MapLatLong.vue';

export default {
    name: "DeviceInfo",
    components: {
        DeleteSensorButton,
        MapLatLong
    },
    created(){
        this.$store.dispatch('getAllSensors');
    },

  computed: {
    ...mapState(["devicelist"]),
  },
};
</script>
