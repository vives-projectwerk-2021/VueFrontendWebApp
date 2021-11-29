<template>
  <div>
    <h1>Home</h1>
    <time-picker/>
  </div>
    
</template>

<script>
import TimePicker from '../components/TimePicker.vue'
// @ is an alias to /src

export default {
  components: { TimePicker },
  name: 'Home',
}
</script>
