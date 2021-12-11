import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About' 
import Sensors from '@/views/Sensors'
import AddSensor from '@/views/AddSensor'
import SensorPub from '@/views/SensorPub'
import Sensor from '@/views/Sensor'
import Map from '@/views/Map'
import QRScanner from '@/views/QR-scanner'


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
    component: AddSensor,
    meta: { title: 'Add Sensor' },

  },
  {
    path: '/sensors',
    name: 'Sensors',
    component: Sensors,
    meta: { title: 'Sensor' },
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
  },
  {
    path: '/map',
    name: 'Map',
    component: Map
  },
  {
    path: '/qr-scanner',
    name: 'QR-scanner',
    component: QRScanner
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
