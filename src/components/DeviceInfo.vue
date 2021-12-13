<template>
    <div>
        <v-card class="mb-6" v-for="device in devicelist" :key="device.id" elevation="5" >
            <v-card-title>{{ device.devicename }}</v-card-title>
            <v-card-text>device id: {{ device.deviceid }} </v-card-text>
            <v-card-text v-if="device.location.place_name">Location: {{ device.location.place_name }}</v-card-text>
            <v-card-text v-else>Location: [{{ device.location.lat }}, {{ device.location.long }}]</v-card-text>
            <v-card-actions>
                <v-btn :to="{ name: 'Sensor', params: {deviceId: device.deviceid} }" text>
                    See data
                </v-btn>
                <v-spacer />
                <delete-sensor-button :sensorid="device.deviceid"/>
            </v-card-actions>
        </v-card>
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
