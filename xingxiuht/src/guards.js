import { router } from "./router";
import { ElLoading } from "element-plus";
let loadingInstance = null;
// 全局前置守卫
router.beforeEach((to, from, next) => {
  loadingInstance = ElLoading.service();
  next();
});
// 全局后置守卫
router.afterEach((to, from) => {
  //   ElLoading.service({ fullscreen: false });
  loadingInstance.close();
  //   修该页面标题
  document.title = to.meta.title;
});
