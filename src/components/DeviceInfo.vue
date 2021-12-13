<template>
    <div>
        <v-container fluid>
            <v-row>
                 <v-col cols="6" v-for="device in devicelist" :key="device.id">
                        <v-card class="red lighten-5" elevation="5">
                            <v-card-title class="blue-grey lighten-4"><router-link style="text-decoration:none" color="black" :to="{ name: 'Sensor', params: {deviceId: device.deviceid} }">{{device.devicename}}</router-link></v-card-title>
                            <v-spacer></v-spacer>
                            <v-card-text>device id: {{ device.deviceid }} </v-card-text>
                            <v-card-text v-if="device.location.place_name">Location: {{ device.location.place_name }}</v-card-text>
                            <v-card-text v-else>Location: [{{ device.location.lat }}, {{ device.location.long }}]</v-card-text>

                            <v-card-actions>
                            <v-spacer/>
                            <delete-sensor-button :sensorid="device.deviceid"/>
                            </v-card-actions>
                        </v-card>
                 </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>

import { mapState} from 'vuex';
import DeleteSensorButton from '@/components/DeleteSensorButton.vue'

export default {
    name: "DeviceInfo",
    components: {
        DeleteSensorButton
    },
    created(){
        this.$store.dispatch('getAllSensors');
    },

    computed:{
        ...mapState([
            'devicelist'
        ]),
    }
}
</script>
