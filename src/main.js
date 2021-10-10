import Vue from 'vue'
import Vuex from "vuex"
import App from './App.vue'
import { store } from "./state/index.js"
import vuetify from './plugins/vuetify'
import VueEllipseProgress from 'vue-ellipse-progress'

Vue.config.productionTip = false

Vue.use(VueEllipseProgress)
Vue.use(Vuex)

new Vue({
  vuetify,
  render: h => h(App),
  store: store
}).$mount('#app')
