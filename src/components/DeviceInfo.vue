<template>
    <div >
        <v-card class="my-6" v-for="device in devicelist" :key="device.id" elevation="5" >
            <v-card-title>{{ device.devicename }}</v-card-title>
            <v-card-text>firstname: {{ device.firstname }} </v-card-text>
            <v-card-text>lastname: {{ device.lastname }}</v-card-text>
            <v-card-text>Location: {{ device.location }}</v-card-text>
            <v-card-actions>
                <v-btn :to="{ name: 'Sensor', params: {deviceId: device.deviceid} }" text>
                    See data
                </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>

import { mapState} from 'vuex';


export default {
    name: "DeviceInfo",


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
