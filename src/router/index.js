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
    component: () => import("../views/LoginView.vue"),
  },
  {
    path: "/home",
    name: "home",
    component: () => import("../views/HomeView.vue"),
    children: [
      {
        path: "/about",
        name: "about",
        component: () => import("../views/AboutView.vue"),
      },
      {
        path: "/member",
        name: "member",
        component: () => import("../views/MemberView.vue"),
      },
      {
        path: "/supplier",
        name: "supplier",
        component: () => import("../views/SupplierView.vue"),
      },
      {
        path: "/goods",
        name: "goods",
        component: () => import("../views/goods.vue"),
      },
      {
        path: "/staff",
        name: "staff",
        component: () => import("../views/staff.vue"),
      },
    ]
  },
];

const router = new VueRouter({
  routes,
});

export default router;
