<template>
    <div>
        <div class="text-center ma-2">
            <h2>Current Camera: {{ camera }}</h2>
            <v-snackbar
                v-model="snackbar"
                v-if="noFrontCamera || noRearCamera"
            >
                <p v-if="noFrontCamera">
                    You don't seem to have a front camera on your device
                </p>

                <p v-if="noRearCamera">
                    You don't seem to have a rear camera on your device
                </p>

                <template v-slot:action="{ attrs }">
                    <v-btn
                        color="pink"
                        text
                        v-bind="attrs"
                        @click="snackbar = false"
                    >
                    Close
                    </v-btn>
                </template>
            </v-snackbar>
        </div>
        <div class="d-flex justify-center mb-2">
            <v-btn @click="switchCamera">Switch camera</v-btn>
        </div>
        <div class="d-flex justify-center">
            <v-card height="400" width="400" class="pa-3" elevation="3">
                <qrcode-stream :camera="camera" @decode="onDecode" @init="onInit"></qrcode-stream>
            </v-card>
        </div>
    </div>
</template>

<script>

import { QrcodeStream } from 'vue-qrcode-reader';

    export default {
        name: 'QRScanner',

        data() {
            return {
                camera: 'front',
                result: '',
                error: '',
                noRearCamera: false,
                noFrontCamera: false,
                snackbar: false
            }
        },

        components: { 
            QrcodeStream
        },

        methods: {
            onDecode (result) {
                this.result = result;
                window.location.href = this.result;
            },

            switchCamera () {
                switch (this.camera) {
                    case 'front':
                        this.camera = 'rear'
                    break
                    case 'rear':
                        this.camera = 'front'
                    break
                }
            },

            async onInit (promise) {
                try {
                    await promise
                } catch (error) {
                    const triedFrontCamera = this.camera === 'front'
                    const triedRearCamera = this.camera === 'rear'

                    const cameraMissingError = error.name === 'OverconstrainedError'

                    if (triedRearCamera && cameraMissingError) {
                        this.noRearCamera = true
                        this.snackbar = true
                    }

                    if (triedFrontCamera && cameraMissingError) {
                        this.noFrontCamera = true
                        this.snackbar = true
                    }
                    if (error.name === 'NotAllowedError') {
                        this.error = "ERROR: you need to grant camera access permission"
                    } else if (error.name === 'NotFoundError') {
                        this.error = "ERROR: no camera on this device"
                    } else if (error.name === 'NotSupportedError') {
                        this.error = "ERROR: secure context required (HTTPS, localhost)"
                    } else if (error.name === 'NotReadableError') {
                        this.error = "ERROR: is the camera already in use?"
                    } else if (error.name === 'OverconstrainedError') {
                        this.error = "ERROR: installed cameras are not suitable"
                    } else if (error.name === 'StreamApiNotSupportedError') {
                        this.error = "ERROR: Stream API is not supported in this browser"
                    } else if (error.name === 'InsecureContextError') {
                        this.error = 'ERROR: Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.';
                    } else {
                        this.error = `ERROR: Camera error (${error.name})`;
                    }
                console.error(error)
                }
            }
        }
    }
</script>

<style scoped>
.qrcode-stream__pause-frame {
    position: fixed;
    right: 0;
    bottom: 0;
    min-width: 60%;
    min-height: 60%;
    width: 100;
    height: 100;
    
}
</style>