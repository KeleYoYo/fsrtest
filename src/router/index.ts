import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
        name: 'default',
        redirect: '/login'
    },
      {
          path: '/login',
          name: 'login',
          component: () => import("@/views/login.vue")
      },
      {
          path: '/home',
          name: 'home',
          component: () => import("@/views/home.vue")
      },
      {
          path: '/article',
          name: 'article',
          component: () => import("@/views/article.vue")
      },
      {
          path: '/article',
          name: 'article',
          component: () => import("@/views/article.vue")
      },
      {
          path: '/writePanel',
          name: 'writePanel',
          component: () => import("@/views/writePanel.vue")
      },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/tableTest1',
      name: 'tableTest1',
      component: () => import('@/views/tableTest/Table1.vue')
    },
    {
      path: '/formTest1',
      name: 'formTest1',
      component: () => import('@/views/formTest/FormTest1.vue')
    }
  ]
})

export default router
