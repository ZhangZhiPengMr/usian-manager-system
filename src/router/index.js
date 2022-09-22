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
        component: () => import("../views/home")
      },
      {
        path: "/staff",
        name: 'staff',
        component: () => import("../views/staff")
      },
      {
        path: "/goods",
        name: 'goods',
        component: () => import("../views/goods")
      },
      {
        path: "/member",
        name: 'member',
        component: () => import("../views/member")
      },
      {
        path: "/supplier",
        name: 'supplier',
        component: () => import("../views/supplier")
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
