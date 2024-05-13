import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/formTest1'
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
