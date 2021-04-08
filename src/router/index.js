import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Logout from "../views/Logout.vue";
import Calendar from "../views/Calendar.vue";
import ExperienceIndex from "../views/ExperienceIndex.vue";
import ListIndex from "../views/ListIndex.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/test",
    name: "Test",
    // route level code-splitting
    // this generates a separate chunk (Test.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/Test.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/logout",
    name: "Logout",
    component: Logout,
  },
   {
    path: "/calendar",
    name: "Calendar",
    component: Calendar,
  },
  {
    path: "/experiences",
    name: "experience-index",
    component: ExperienceIndex,
  },
  {
    path: "/lists",
    name: "list-index",
    component: ListIndex,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
