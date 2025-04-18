import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";

const routes = [
  { path: "/", component: Home },
  {
    path: "/project/:name",
    component: () => import("../pages/ProjectDetail.vue"),
    props: true,
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
