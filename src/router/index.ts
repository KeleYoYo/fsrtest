import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
        name: 'default',
        redirect: '/center'
    },
      {
          path: '/center',
          name: 'center',
          component: () => import("@/views/center.vue"),
          children: [
              {
                  path: 'info',
                  name: 'info',
                  component: () => import("@/views/info.vue")
              },
              {
                  path: 'partings',
                  name: 'partings',
                  component: () => import("@/views/partings.vue")
              },
          ]
      },

      {
          path: '/admin',
          name: 'admin',
          component: () => import("@/views/admin/admin.vue"),
          children: [
              {
                  path: 'pendingQuestion',
                  name: 'pendingQuestion',
                  component: () => import("@/views/admin/studentPainting/pendingQuestion.vue")
              },
              {
                  path: 'pendingComment',
                  name: 'pendingComment',
                  component: () => import("@/views/admin/studentPainting/pendingComment.vue")
              },
              {
                  path: 'paintingList',
                  name: 'paintingList',
                  component: () => import("@/views/admin/studentPainting/paintingList.vue")
              },

              {
                  path: 'treeQuestion',
                  name: 'treeQuestion',
                  component: () => import("@/views/admin/questionMange/treeQuestion.vue")
              },
              {
                  path: 'personQuestion',
                  name: 'personQuestion',
                  component: () => import("@/views/admin/questionMange/personQuestion.vue")
              },
              {
                  path: 'roomQuestion',
                  name: 'roomQuestion',
                  component: () => import("@/views/admin/questionMange/roomQuestion.vue")
              },
              {
                  path: 'userList',
                  name: 'userList',
                  component: () => import("@/views/admin/userList.vue")
              },
          ]
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
