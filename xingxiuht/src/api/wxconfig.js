import axios from "@/axios.js";

// 更新设置配置
export function saveConfig(data) {
  return axios.post("/wxconfig/saveConfig", data);
}

// 获取配置
export function getConfig() {
  return axios.get("/wxconfig/getConfig");
}
