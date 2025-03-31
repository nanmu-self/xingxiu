import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import { router } from "./router";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import { createPinia } from "pinia";
import App from "./App.vue";
// 全局路由守卫
import "./guards.js";
const pinia = createPinia();
const app = createApp(App);
app.use(pinia);
app.use(ElementPlus);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(router);
app.mount("#app");
