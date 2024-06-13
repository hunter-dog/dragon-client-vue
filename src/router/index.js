import { createRouter, createWebHistory } from 'vue-router'
import YongsayView from '@/views/YongsayView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: YongsayView
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('@/views/Test.vue')
    },
    {
      path: '/yongsay/submit',
      name: 'yongsay-submit',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/YongsayFormView.vue')
    },
    {
      path: '/yongniverse',
      name: 'yongniverse',
      component: () => import('@/views/YongniverseView.vue')
    },
    {
      path: '/yongsay/contest',
      name: 'yongsay-world-cup',
      component: () => import('@/views/YongsayContestView.vue')
    },
    {
      path: '/yongeic',
      name: 'yongeic',
      component: () => import('@/views/YongeicView.vue')
    },
    {
      path: '/yongeic/generation',
      name: 'yongeic-generation-form',
      component: () => import('@/views/YongeicGenerationFormView.vue')
    },
    {
      path: '/yongeic/:id/take',
      name: 'yongeic-taking',
      component: () => import('@/views/YongeicTakeView.vue')
    },
    {
      path: '/yongeic/:id/statistic',
      name: 'yongeic-statistic',
      component: () => import('@/views/YongeicStatisticView.vue')
    },
    {
      path: '/board',
      name: 'board for guest',
      component: () => import('@/views/BoardView.vue')
    }
  ]
})

export default router
