import Vue from 'vue'
import Vuex from "vuex"
import App from './App.vue'
import router from './router'
import { store } from "./state/index.js"
import vuetify from './plugins/vuetify'
import VueEllipseProgress from 'vue-ellipse-progress'

Vue.config.productionTip = false

Vue.use(VueEllipseProgress)
Vue.use(Vuex)

new Vue({
  router,
  vuetify,
  store: store,
  render: h => h(App),
  
}).$mount('#app')
