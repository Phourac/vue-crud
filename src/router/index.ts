import { createRouter, createWebHistory } from "vue-router";
import ListView from "../views/ListView.vue";

import FormView from "@/views/FormView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: ListView,
    },
    {
      path: "/form",
      name: "form",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import("../views/AboutView.vue"),
      component: FormView,
    },
  ],
});

export default router;
