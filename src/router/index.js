import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About' 
import Sensors from '@/views/Sensors'
import AddSensor from '@/views/AddSensor'
import SensorPub from '@/views/SensorPub'
import Sensor from '@/views/Sensor'


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
    component: About,
    meta: { title: 'About' },
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
  },
  {
    path: '/sensorPub',
    name: 'SensorPub',
    component: SensorPub
  },
  {
    path: '/sensors/:deviceId',
    name: 'Sensor',
    component: Sensor
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.afterEach((to) => {
  Vue.nextTick(() => {
    document.title = to.meta.title ? `${to.meta.title} - Pulu` : 'Pulu';
  })
})

export default router
