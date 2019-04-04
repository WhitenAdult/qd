import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRoutes = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/dashboard',
  //   name: 'Dashboard',
  //   hidden: true,
  //   children: [{
  //     path: 'dashboard',
  //     component: () => import('@/views/dashboard/index'),
  //   }]
  // },

  {
    path: '/personalInfo',
    component: Layout,
    name: 'personalInfo',
    hidden: true,
    children: [{
      path: '',
      component: () => import('@/views/usersMg/personalInfo'),
    }]
  },

  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'dashboard',
        name: 'Home',
        component: () => import('@/views/dashboard/index'),
        meta: { 
          title: '首页', 
          icon: 'form' }
      }
    ]
  },

  {
    path: '/actsMg',
    component: Layout,
    children: [
      {
        path: 'actsMg',
        name: 'actsMg',
        component: () => import('@/views/actsMg/actsMg'),
        meta: { title: '活动管理', icon: 'acts' }
      },
      {
        path: 'actsInfo/:actsID',
        name: 'actsInfo',
        component: () => import('@/views/actsMg/actsInfo'),
        meta: { title: '活动详情', icon: 'acts' },
        props: true,
        hidden: true
      }
    ]
  },

  {
    path: '/asssMg',
    component: Layout,
    redirect: '/asssMg/myAsss',
    name: 'asssMg',
    meta: { title: '社团管理', icon: 'asss' },
    children: [
      {
        path: 'myAsss',
        name: 'myAsss',
        component: () => import('@/views/asssMg/myAsss'),
        meta: { title: '我的社团', icon: 'asss' }
      },
      {
        path: 'asssMg',
        name: 'asssMg',
        component: () => import('@/views/asssMg/asssMg'),
        meta: { title: '社团列表', icon: 'asss' }
      }
    ]
  },

  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: 'Nested',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: { title: 'Menu1' },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: { title: 'Menu1-1' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: { title: 'Menu1-2' },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: { title: 'Menu1-2-1' }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: { title: 'Menu1-2-2' }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: { title: 'Menu1-3' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       meta: { title: 'menu2' }
  //     }
  //   ]
  // },

  // { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

export const asyncRoutes = [
  {
    path: '/usersMg',
    component: Layout,
    meta: { roles: ['admin'] },
    children: [
      {
        path: 'usersMg',
        name: 'usersMg',
        component: () => import('@/views/usersMg/usersMg'),
        meta: { title: '用户管理', icon: 'user', roles: ['admin'] }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
];
