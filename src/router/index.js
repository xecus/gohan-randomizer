import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '@/components/Home.vue'

import MeshiRandomizer from '@/components/MeshiRandomizer.vue'
import MeshiManager from '@/components/MeshiManager.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/meshiRandomizer',
    name: 'meshiRandomizer',
    component: MeshiRandomizer
  },
  {
    path: '/meshiManager',
    name: 'meshiManager',
    component: MeshiManager
  }
]

const router = new VueRouter({
  routes
})

export default router
