import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import MyComponent from '@/components/MyComponent'

import SpellBuilder from '@/components/SpellBuilder/SpellBuilder'
import NodeComponent from '@/components/SpellBuilder/NodeComponent'


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
      name: 'Testing',
      component: MyComponent
    },
    {
    	path:'/SpellBuilder/',
    	name:'SpellBuilder',
    	component: SpellBuilder
    }
  ]
})
