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
      let colors = ['green', 'black','red','blue']
      let datasets = this.dataset.values.map((values)=>{
        labelIndex +=1
        return {
          label: this.dataset.label[labelIndex],
          data: values,
          backgroundColor: "transparent",
          borderColor: colors[labelIndex],
          pointBackgroundColor: "transparent",
          
        }
      })
      return { labels: this.dataset.labels, datasets: datasets }
    },
  },
  methods: {
        render(value){
      this.renderChart(value, { responsive: true, maintainAspectRatio: false,})
    }
  },
}

</script>