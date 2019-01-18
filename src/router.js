import Vue from 'vue'
import Router from 'vue-router'
import Hello from './components/Hello'
import NotFound from './components/NotFound'
import Forum from '@/components/ForumDisplay'
import CategoryListItem from '@/components/CategoryPage'
// Threads

import ThreadDisplay from './components/ThreadDisplay'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Hello
    },
    {
      path: '/category/:categoryId',
      name: 'Category',
      component: CategoryListItem,
      props: true
    },
    {
      path: '/forums/:id',
      name: 'Forums',
      component: Forum,
      props: true
    },
    {
      path: '/thread/:id',
      name: 'ThreadDisplay',
      component: ThreadDisplay,
      props: true
    },
    {
      path: '*',
      name: 'notfound',
      component: NotFound
    }
  ]
})
