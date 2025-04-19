import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";

const routes = [
  { path: "/", redirect: "/projects/facebook" },
  {
    path: "/projects/:username",
    component: Home,
    props: true,
  },
  {
    path: "/tasks/:username/:repoName",
    component: () => import("../pages/ProjectDetail.vue"),
    props: true,
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
