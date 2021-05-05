import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Logout from "../views/Logout.vue";
import Calendar from "../views/Calendar.vue";
import ExperienceIndex from "../views/ExperienceIndex.vue";
import TestListIndex from "../views/TestListIndex.vue";
import DayShow from "../views/DayShow.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/day-show",
    name: "DayShow",
    component: DayShow,
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
    path: "/new-test",
    name: "TestTags",
    // route level code-splitting
    // this generates a separate chunk (Test.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/TestTags.vue"),
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
    component: TestListIndex,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

export default router;
