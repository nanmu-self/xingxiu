import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
// https://vite.dev/config/
export default defineConfig({
  base: "/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  }, // 配置代理，处理跨域
  server: {
    host: "0.0.0.0",
  },
  plugins: [vue()],
});
