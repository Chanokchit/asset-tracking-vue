import Vue from 'vue'
import VueRouter from 'vue-router'
import Information from '../components/information.vue'
import Location from '../components/update-location.vue'
import Owner from '../components/update-owner.vue'
import error from '../components/error.vue'
import success from '../components/success.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Information',
    component: Information
  },
  {
    path: '/test',
    name: 'Location',
    component: Location
  },
  {
    path: '/owner',
    name: 'Owner',
    component: Owner
  },
  {
    path: '/error',
    name: 'error',
    component: error
  },
  {
    path: '/success',
    name: 'success',
    component: success
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
