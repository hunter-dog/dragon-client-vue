import { createRouter, createWebHistory } from 'vue-router'
import YongsayView from '@/views/YongsayView.vue'
import OAuth2RedirectHandler from '@/components/utilComponent/OAuth2RedirectHandler.vue';
import store from '@/vuex/store';
import { ACCESS_TOKEN } from '@/constants/loginInfo.js';
import { apiCall } from '@/util/apiCall.js';
import { API_LIST } from '@/constants/apiList.js';


const user = store.getters.getUser;

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: YongsayView
    },    
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
      beforeEnter: (to, from, next) => {
        if (!user.isLoggedIn) {
          next();
        } else {
          next('/');
        }
      }
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('@/views/Signup.vue'),
      beforeEnter: (to, from, next) => {
        if (!user.isLoggedIn) {
          next();
        } else {
          next('/');
        }
      }
    },    
    {
      path: '/oauth2/redirect',
      name: 'OAuth2RedirectHandler',
      component: OAuth2RedirectHandler,
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
      component: () => import('@/views/YongsayContestView.vue'),
      meta: {
        roles: ['USER']
      }
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

router.beforeEach(async (to, from, next) => {
  const isValidUser = await checkUser();

  if (!to.meta.roles) {
    return next();
  }

  if (!isValidUser) {
    return next('/login');
  }

  if (to.meta.roles.includes(user.role)) {
    return next();
  }

  alert('해당 url에 대한 접근 권한이 없습니다.');
  next(false);

});

const checkUser = async () => {
  if (localStorage.getItem(ACCESS_TOKEN)) {
    const response = await apiCall(API_LIST.GET_USER_INFO);
    if (response.id) {
      store.commit('loginSuccess', response);
      return true;
    }

    localStorage.removeItem('accessToken');
    store.commit('logoutSuccess');
  }
  store.commit('logoutSuccess');
};


export default router
