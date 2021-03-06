import Vue from 'vue'
import Router from 'vue-router'
import HomePageComponent from '@/components/HomePageComponent'
import Game from '@/components/Game/Game'
import SpellBuilder from '@/components/SpellBuilder/SpellBuilder'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomePageComponent
    },
    {
      path: '/SpellBuilder/',
      name: 'SpellBuilder',
      component: SpellBuilder
    },
    {
      path: '/game/',
      name: 'Game',
      component: Game
    }
  ]
})
