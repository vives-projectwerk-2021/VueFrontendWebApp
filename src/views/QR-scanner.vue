<template >
  <div>
    <QRScanner/>
  </div>
</template>


<script>
// @ is an alias to /src

import QRScanner from '@/components/QRScanner'

export default {
  name: 'QR-Scanner',

  components: {
    QRScanner
  },
}
</script>