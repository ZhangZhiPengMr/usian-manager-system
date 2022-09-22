import Vue from "vue";
import VueRouter from "vue-router";
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/homepage',  // 重定向:重新指向其它path,会改变网址
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login"),
  },
  {
    path: "/homepage",
    name: "homepage",
    component: () => import("../homepage"),
    children: [
      {
        path: "/home",
        name: 'home',
        component: () => import("../views/home"),
        meta: { title: '首页' }
      },
      {
        path: "/staff",
        name: 'staff',
        component: () => import("../views/staff"),
        meta: { title: '员工管理' }
      },
      {
        path: "/goods",
        name: 'goods',
        component: () => import("../views/goods"),
        meta: { title: '商品管理' }
      },
      {
        path: "/member",
        name: 'member',
        component: () => import("../views/member"),
        meta: { title: '会员管理' }
      },
      {
        path: "/supplier",
        name: 'supplier',
        component: () => import("../views/supplier"),
        meta: { title: '供应商管理' }
      },
    ]
  },
];

const router = new VueRouter({
  routes,
});
// 挂载路由守卫
// router.beforeEach((to, from, next) => {
//   // to and from are both route objects. must call `next`.
//   if (to.path === '/login') return next()
//   const tokenStr = window.sessionStorage.getItem('token')
//   if (!tokenStr) return next('/login')
//   next()
// })

export default router;
