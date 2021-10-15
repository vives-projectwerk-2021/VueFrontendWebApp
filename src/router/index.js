import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About' 
import Sensors from '@/views/Sensors'
import AddSensor from '@/views/AddSensor


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',    
    component: About
    
  },
  {
    path: '/addSensor',
    name: 'AddSensor',
    component: AddSensor

  },
  {
    path: '/sensors',
    name: 'Sensors',

    component: Sensors
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
