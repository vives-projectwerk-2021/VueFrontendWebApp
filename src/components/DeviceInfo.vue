<template>
    <div >
        <v-card class="my-6" v-for="device in devices" :key="device.id" elevation="5" >
            <v-card-title>{{ device.name }}</v-card-title>
            <v-card-text>firstname: {{ device.firstname }}</v-card-text>
            <v-card-text>lastname: {{ device.lastname }}</v-card-text>
            <v-card-text>Location: {{ device.location }}</v-card-text>
            <v-card-actions>
                <v-btn text>
                See data
                </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>

import axios from "axios";

export default {
    name: "DeviceInfo",
    data() {
        return {
            devices: null
        }
    },
    methods: {
        getSensors() {
            var self = this;
            axios.get(`${process.env.VUE_APP_BACKEND_BASE_URL}/devices`)
            .then((response) => {
                
                self.devices = response.data;
            })
            .catch((error) => {
                console.log(error);
            })
        
        }
    },
    created: function(){
        this.getSensors();
    },
}
</script>
