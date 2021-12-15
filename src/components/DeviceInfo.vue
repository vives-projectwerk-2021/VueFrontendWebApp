<template>
    <div>
        <v-container fluid>
            <v-row>
                 <v-col cols="6" v-for="device in devicelist" :key="device.id">
                        <v-card v-if="device.location.lat && device.location.long" color="#545452" elevation="5">
                            <v-card-title color="#434342"><router-link style="text-decoration:none" color="black" :to="{ name: 'Sensor', params: {deviceId: device.deviceid} }">{{device.devicename}}</router-link></v-card-title>
                            <v-spacer></v-spacer>
                            <v-card-text >device id: {{ device.deviceid }} </v-card-text>
                            <v-card-text v-if="device.location.place_name">Location: {{ device.location.place_name }}</v-card-text>
                            <v-card-text v-else>Location: [{{ device.location.lat }}, {{ device.location.long }}]</v-card-text>
                            <v-card-text>
                                <map-lat-long v-if="device.location.lat && device.location.long" 
                                v-bind:lat="device.location.lat" 
                                v-bind:long="device.location.long" 
                                v-bind:device="device.deviceid"
                                />

                            </v-card-text>
                                
                            <v-card-actions>
                            <v-spacer/>
                            <delete-sensor-button :sensorid="device.deviceid"/>
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
