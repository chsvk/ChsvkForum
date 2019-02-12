import Vue from 'vue'
import Router from 'vue-router'
import Hello from './components/Hello'
import NotFound from './components/NotFound'
import Forum from '@/components/ForumDisplay'
import CategoryListItem from '@/components/CategoryPage'
import Register from '@/components/Registration'
import Login from '@/components/Login'

// Threads

import ThreadDisplay from './components/ThreadDisplay'
import ThreadCreate from './components/ThreadCreate'
import PageThreadEdit from './components/ThreadEditorPage'
import Profile from '@/components/Profile'

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
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
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
      path: '/thread/create/:forumId',
      name: 'ThreadCreate',
      component: ThreadCreate,
      props: true
    },
    {
      path: '/thread/:id',
      name: 'ThreadDisplay',
      component: ThreadDisplay,
      props: true
    },
    {
      path: '/thread/:id/edit',
      name: 'ThreadEditorPage',
      component: PageThreadEdit,
      props: true
    },
    {
      path: '*',
      name: 'notfound',
      component: NotFound
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      props: true
    },
    {
      path: '/profile/edit',
      name: 'profileEdit',
      component: Profile,
      props: {edit: true}
    }
  ]
})
