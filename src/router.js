import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass : "active",
  routes: [
    {
      path: '/',
      // name: 'index',
      component: () => import('./views/index.vue'),
      children: [
        {
          path: '',
          redirect: '/home'
        },
        {
          path: '/home',
          name: 'home',
          component: () => import('./views/Home.vue')
        },
        {
          path: '/search',
          name: 'search',
          component: () => import('./views/Search.vue')
        },
        {
          path: '/order',
          name: 'order',
          component: () => import('./views/Order.vue')
        },
        {
          path: '/me',
          name: 'me',
          component: () => import('./views/Me.vue')
        },
        {
          path: '/address',
          name: 'address',
          component: () => import('./views/Address.vue')
        },
        {
          path: '/city',
          name: 'city',
          component: () => import('./views/City.vue')
        },
        {
          path: '/shop',
          name: 'shop',
          redirect: '/goods',
          component: () => import('./views/shops/Shop.vue'),
          children:[
            {
              path: '/goods',
              name: 'goods',
              component: () => import('./views/shops/Goods.vue')
            },
            {
              path: '/comments',
              name: 'comments',
              component: () => import('./views/shops/Comments.vue')
            },
            {
              path: '/seller',
              name: 'seller',
              component: () => import('./views/shops/Seller.vue')
            }
          ]
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    }
  ]
});
// 路由守卫
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.ele_login ? true : false;
  if (to.path == '/login') {
    next();
  } else {
    // 是否在登录状态下
    isLogin ? next() : next('/login');
  }
});

export default router;
