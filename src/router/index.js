import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Dino from '@/components/Dino'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/dino',
      name: 'Dino',
      component: Dino
    }
  ]
})
