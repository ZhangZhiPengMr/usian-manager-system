import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/login',  // 重定向:重新指向其它path,会改变网址
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login"),
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
