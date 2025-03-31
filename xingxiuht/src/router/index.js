import { createRouter, createWebHashHistory } from "vue-router";
import LOGIN from "@/pages/login.vue";
import NotFound from "@/pages/404.vue";
import Index from "@/pages/index.vue";

let children = [
  {
    path: "/",
    name: "/",
    component: () => import("@/pages/index/index.vue"),
    meta: {
      title: "首页",
    },
  },
  {
    path: "jingang",
    name: "jingang",
    component: () => import("@/pages/jingang/index.vue"),
    meta: {
      title: "金刚位设置",
    },
  },
  {
    path: "article",
    name: "article",
    component: () => import("@/pages/article/list.vue"),
    meta: {
      title: "文章列表",
    },
  },
  {
    path: "addarticle",
    name: "addarticle",
    component: () => import("@/pages/article/editArticle.vue"),
    meta: {
      title: "添加文章",
    },
  },
  {
    path: "labelList",
    name: "labelList",
    component: () => import("@/pages/classLabel/LabelList.vue"),
    meta: {
      title: "标签列表",
    },
  },
  {
    path: "classList",
    name: "classList",
    component: () => import("@/pages/classLabel/classList.vue"),
    meta: {
      title: "标签列表",
    },
  },
];

const routes = [
  {
    path: "/",
    name: "index",
    component: Index,
    children,
  },
  {
    path: "/login",
    component: LOGIN,
    meta: {
      title: "登录",
    },
  },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
