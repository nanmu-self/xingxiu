import axios from "@/axios.js";

// 添加金刚或热门
export function add(data) {
  return axios.post("/jgrm/addjg", data);
}
