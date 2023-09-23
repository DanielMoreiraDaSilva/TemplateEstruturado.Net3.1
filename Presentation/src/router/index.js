import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/login.vue')
  },
  {
    path: '/modulos',
    name: 'modulos',
    component: () => import('../views/modulos.vue')
  },
  {
    path: '/modulos/pagina',
    name: 'home',
    component: () => import('../views/pagina-um.vue')
  },
  {
    path: '/modulos/hub',
    name: 'hub',
    component: () => import('../views/hub.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
