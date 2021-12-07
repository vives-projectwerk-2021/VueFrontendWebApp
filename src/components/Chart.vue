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
      let labelIndex = -1
      let datasets = this.dataset.values.map((values)=>{
        labelIndex +=1
        return {
          label: this.dataset.label[labelIndex],
          data: values,
          backgroundColor: this.options.backgroundColor,
          borderColor: this.options.borderColor,
          pointBackgroundColor: this.options.pointBackgroundColor
        }
      })
      return { labels: this.dataset.labels, datasets: datasets }
    },
  }
}

</script>