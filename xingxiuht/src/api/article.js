import axios from "@/axios.js";

// 上传图片
export function upimg(data) {
  return axios.post("/img/upimg", data);
}

//发布文章
export function addArticle(data) {
  return axios.post("/article/createArticle", data);
}
//获取文章列表
export function getArticleList(data) {
  return axios.get("/article/getArticleList", { params: data });
}
//删除文章
export function delArticle(articleId) {
  return axios.get("/article/deleteArticle", { params: { articleId } });
}
// 获取文章详情
export function getArticleDetail(articleId) {
  return axios.get("/article/getArticleDetail", { params: { articleId } });
}
//更新文章
export function updateArticle(data) {
  return axios.post("/article/updateArticle", data);
}
