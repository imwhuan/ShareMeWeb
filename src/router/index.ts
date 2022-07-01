import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Index from "../views/IndexPage.vue";
import LoginPage from "../views/share/LoginPage.vue";
import Result403 from "@/views/share/Result403.vue";
import NotFound from "@/views/share/NotFound.vue";
import About from "@/views/share/About.vue";
import { CheckUserLogined } from "@/plugins/UseLocalDB";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Index",
    component: Index,
    meta: {
      share: true,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: LoginPage,
    meta: {
      share: true,
    },
  },
  {
    path: "/about",
    component: About,
    meta: {
      share: true,
    },
  },
  {
    path: "/home",
    name: "Home",
    redirect: "/home/index",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../layout/BasicLayout.vue"),
    children: [
      {
        path: "index",
        name: "Home-Index",
        component: () => import(/* webpackChunkName: "about" */ "../views/home/Index.vue"),
      },
      {
        path: "about",
        name: "About",
        component: About,
        meta: {
          share: true,
        },
      },
      {
        path: "/editorindex",
        name: "editorindex",
        component: () => import(/* webpackChunkName: "editor" */ "../views/editor/Index.vue"),
      },
      {
        path: "/live",
        name: "live",
        component: () => import(/* webpackChunkName: "live" */ "../views/live/Layout.vue"),
        children: [
          {
            path: "/index",
            name: "liveindex",
            component: () => import(/* webpackChunkName: "live" */ "../views/live/Index.vue"),
            meta: {
              auth: true,
            },
          },
          {
            path: "/index",
            name: "myliveindex",
            component: () => import(/* webpackChunkName: "live" */ "../views/live/MyIndex.vue"),
            meta: {
              auth: true,
            },
          },
          {
            path: "/liveadminindex",
            name: "liveadminindex",
            component: () =>
              import(/* webpackChunkName: "live" */ "../views/live/adamin/AnchorApprovePage.vue"),
            meta: {
              auth: true,
            },
          },
          {
            path: "/tobeanchorguide",
            name: "tobeanchorguide",
            component: () =>
              import(/* webpackChunkName: "live" */ "../views/live/TobeAnchorGuide.vue"),
          },
          {
            path: "/anchorapplypage",
            name: "anchorapplypage",
            component: () =>
              import(/* webpackChunkName: "live" */ "../views/live/AnchorApplyPage.vue"),
          },
          {
            path: "/liveroomlistpage",
            name: "liveroomlistpage",
            component: () =>
              import(/* webpackChunkName: "live" */ "../views/live/LiveRoomListPage.vue"),
          },
          {
            path: "/getinliveroom/:id",
            name: "getinliveroom",
            props: true,
            meta: {
              auth: true,
            },
            component: () =>
              import(/* webpackChunkName: "live" */ "../views/live/GetInLiveRoom.vue"),
          },
        ],
      },
      {
        path: "/userinfo",
        name: "userinfo",
        component: () => import(/* webpackChunkName: "user" */ "../views/user/UserInfoCenter.vue"),
        meta: {
          auth: true,
        },
      },
    ],
  },
  {
    path: "/bingdundun",
    name: "Bingdundun",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/threed/bingdundun/BingDD.vue"),
  },
  {
    path: "/forbid",
    name: "forbid",
    component: Result403,
    meta: {
      share: true,
    },
  },
  {
    path: "/:pathMatch(.*)",
    name: "notfound",
    component: NotFound,
    meta: {
      share: true,
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  // if(to.matched.some(r=>r.meta.share)){
  //   next()
  // }
  // else{
  //   if(CheckUserLogined()){
  //     next()
  //   }else{
  //     next({name:'Login'})
  //   }
  // }
  if (to.matched.some((r) => r.meta.auth)) {
    if (CheckUserLogined()) {
      next();
    } else {
      next({ name: "forbid" });
    }
  } else {
    next();
  }
});

export default router;
