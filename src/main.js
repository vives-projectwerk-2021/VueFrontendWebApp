import Vue from 'vue'
import Vuex from "vuex"
import App from './App.vue'
import router from './router'
import { store } from "./state/index.js"
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false
Vue.use(Vuex)

Vue.prototype.$VUE_APP_WS = (process.env.NODE_ENV == "production") ? ((window.location.protocol === "https:") ? "wss://" : "ws://") + window.location.host + "/websocket/" : process.env.VUE_APP_WS
Vue.prototype.$VUE_APP_BACKEND_BASE_URL = (process.env.NODE_ENV == "production") ? "https://localhost/api" : process.env.VUE_APP_BACKEND_BASE_URL

new Vue({
  router,
  vuetify,
  store: store,
  render: h => h(App),
  
}).$mount('#app')
