import axios from "axios";

const service = axios.create({
  baseURL: "http://xingxiu.nanmu.cool",
});

// 添加请求拦截器
service.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    //自动添加token到请求头
    // const token = localStorage.getItem("token");
    // if (token) {
    //   config.headers.token = token;
    // }
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
service.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    // return response.data.data;
    return response.data;
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    // let msg = error.response.data.msg;
    // if (msg == "非法token，请先登录！") {
    //   const { setUserInfo } = useUserStore();
    //   setUserInfo({});
    //   localStorage.removeItem("token");
    //   setTimeout(() => {
    //     location.reload();
    //   }, 1000);
    // }
    // ElNotification({
    //   //   title: err.response.data.errorCode,
    //   message: msg || "登录失败",
    //   type: "error",
    //   duration: 3000,
    // });
    return Promise.reject(error);
  }
);

export default service;
