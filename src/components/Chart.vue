<script>

import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: {
    dataset: {
      type: Object,
      default: null
    },
    options: {
      type: Object,
      default: null
    }
  },
  mounted () {
    this.renderChart(this.chartdata, { responsive: true, maintainAspectRatio: false })
  },
  computed: {
    chartdata() {

      return {

        labels: this.dataset.labels,
        datasets: [
          {
            label: this.options.label,
            data: this.dataset.values,
            backgroundColor: this.options.backgroundColor,
            borderColor: this.options.borderColor,
            pointBackgroundColor: this.options.pointBackgroundColor
          }
        ]
      }
    }
  }
}

</script>