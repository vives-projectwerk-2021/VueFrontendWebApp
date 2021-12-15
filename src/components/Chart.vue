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
  mounted() {
    this.render(this.chartdata)
  },
  watch: {
    chartdata(value){
        this.render(value)
    }

  },
  computed: {
    chartdata() {
      let labelIndex = -1
      let datasets = this.dataset.values.map((values)=>{
        labelIndex +=1
        return {
          label: this.dataset.label[labelIndex],
          data: values,
          backgroundColor: "transparent",
          borderColor: `#${Math.floor(Math.random()*16777215).toString(16)}`,
          pointBackgroundColor: "transparent"
        }
      })
      return { labels: this.dataset.labels, datasets: datasets }
    },
  },
  methods: {
        render(value){
      this.renderChart(value, { responsive: true, maintainAspectRatio: false })
    }
  },
}

</script>