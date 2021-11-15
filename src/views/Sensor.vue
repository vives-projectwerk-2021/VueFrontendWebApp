<template>
  <div>
    <div v-for="field in Object.keys(devicevalues)" :key="field">
      {{field}}: {{ devicevalues[field] }}
    </div>
  </div>
</template>

<script>

import { mapState} from 'vuex';


export default {
    name: "Sensor",

    created(){
      this.$store.dispatch("getSensorById",this.$route.params.deviceId)
    },

    computed:{
        ...mapState([
            'devicevalues'
        ]),
    }
}
</script>
