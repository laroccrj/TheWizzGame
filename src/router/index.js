import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import HomePageComponent from '@/components/HomePageComponent'

import SpellBuilder from '@/components/SpellBuilder/SpellBuilder'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/hello/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
    	path: '/',
      name: 'Home',
      component: HomePageComponent
    },
    {
    	path:'/SpellBuilder/',
    	name:'SpellBuilder',
    	component: SpellBuilder
    }
  ]
})
