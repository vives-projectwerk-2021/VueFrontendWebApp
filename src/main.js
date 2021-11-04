import Vue from 'vue'
import Vuex from "vuex"
import App from './App.vue'
import router from './router'
import { store } from "./state/index.js"
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false
Vue.use(Vuex)

new Vue({
  router,
  vuetify,
  store: store,
  render: h => h(App),
  
}).$mount('#app')
