import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [{
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/sort",
    name: "Sort",
    component: () => import("../views/Sort.vue"),
  },
  {
    path: "/hotlist",
    name: "HotList",
    component: () => import("../views/HotList.vue"),
  },
  {
    path: "/informations",
    name: "Informations",
    component: () => import("../views/Informations.vue"),
    // meta: {
    //   hideNav: true,
    // },
  },
  {
    path: "/mediabox",
    name: "MediaBox",
    component: () => import("../views/MediaBox.vue"),
    // meta: {
    //   hideNav: true,
    // },
  },
  {
    path: "/user",
    name: "User",
    component: () => import("../views/User.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
    meta: {
      hideNav: true,
    },
  },
  {
    path: "/reg",
    name: "Reg",
    component: () => import("../views/Reg.vue"),
    meta: {
      hideNav: true,
    },
  },
  {
    path: "/search",
    name: "Search",
    component: () => import("../views/Search.vue"),
    meta: {
      hideNav: true,
    },
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.needLogin) {
    //判断是否登录
    if (isLogined()) {
      next();
    } else {
      next({
        name: "Login",
      });
    }
  } else {
    next();
  }
});


export default router;