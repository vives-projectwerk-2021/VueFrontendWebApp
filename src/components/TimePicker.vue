<template>
    <v-row class="d-flex align-center">

        <v-col
            cols="12"
            sm="1"
            md="1">
            From:

        </v-col>

        <v-col
            cols="12"
            sm="3"
            md="2">
                <date-select v-bind:FromOrTo="'from'"/>

        </v-col>

        <v-col
            cols="12"
            sm="1"
            md="2">
                <time-select v-bind:FromOrTo="'from'"/>
        
        </v-col>

        <v-col
            cols="12"
            sm="1"
            md="1">
            To:

        </v-col>

        <v-col
            cols="12"
            sm="3"
            md="2">


                <date-select v-bind:FromOrTo="'to'"/>

        </v-col>

        <v-col
            cols="12"
            sm="3"
            md="2">
                <time-select v-bind:FromOrTo="'to'"/>
        
        </v-col>
    </v-row>

</template>

<script>
import DateSelect from '@/components/DateSelect.vue'
import TimeSelect from '@/components/TimeSelect.vue'

export default {
  components: { DateSelect, TimeSelect },
    name:"TimePicker",

    data(){
        return{
            firstdate: null,
            seconddate: null
        }
    }
}
</script>