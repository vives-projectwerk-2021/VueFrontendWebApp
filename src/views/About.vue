<template >
  <div class="about" >
    <about-page/>
  </div>
</template>


<script>
// @ is an alias to /src

import AboutPage from '@/components/AboutPage'

export default {
  name: 'Home',

  components: {
    AboutPage
  },
}
</script>
