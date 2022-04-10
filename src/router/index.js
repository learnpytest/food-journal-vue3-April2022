import {
  createRouter,
  createWebHashHistory
} from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [{
    path: "/signup",
    name: "sign-up",
    // component: () => import( /* webpackChunkName: "sign-up" */ '../views/SignUp.vue')
    component: () => import("../views/SignUp.vue"),
  },
  {
    path: "/signin",
    name: "sign-in",
    component: () => import("../views/SignIn.vue"),
  },
  {
    path: "/journals/create",
    name: "create-journal",
    component: () => import("../views/HomeView.vue"),
  },
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;