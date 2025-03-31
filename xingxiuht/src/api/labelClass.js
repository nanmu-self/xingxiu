import axios from "@/axios.js";

// 通用请求函数
function request(method, url, data) {
  switch (method) {
    case "get":
      return axios.get(url, { params: data });
    case "post":
      return axios.post(url, data);
    case "put":
      return axios.put(url, data);
    case "delete":
      return axios.delete(url, { params: data });
    default:
      throw new Error("Unsupported method");
  }
}

// 通用添加函数
function addData(url, data) {
  return request("post", url, data);
}

// 通用获取数据函数
function getData(url, params) {
  return request("get", url, params);
}

// 通用更新数据函数
function updateData(url, data) {
  return request("post", url, data);
}

// 通用删除数据函数
function deleteData(url, id) {
  return request("delete", url, { id });
}

// 导出具体操作函数
export function addLabel(data) {
  return addData("/labelClass/addLabel", data);
}

export function getLabel(queryData) {
  return getData("/labelClass/getLabel", queryData);
}

export function updateLabel(data) {
  return updateData("/labelClass/upLabel", data);
}

export function delLabel(id) {
  return deleteData("/labelClass/delLabel", id);
}

export function addClass(data) {
  return addData("/labelClass/addClass", data);
}

export function getClass(queryData) {
  return getData("/labelClass/getClass", queryData);
}

export function updateClass(data) {
  return updateData("/labelClass/upClass", data);
}

export function delClass(id) {
  return deleteData("/labelClass/delClass", id);
}
