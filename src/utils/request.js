import axios from "axios";
import NProgress from "nprogress";
import {
  getToken
} from "../utils/auth.js";

const instance = axios.create({
  timeout: 5000, //网络请求超时时间
  baseURL: "http://106.14.70.106:8800",
  // baseURL: "http://localhost:8800",
});

// // Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    //     // Do something before request is sent
    NProgress.start();
    config.headers.authorization = "bearer " + getToken();
    return config;
  },
  function (error) {
    //     // Do something with request error

    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    NProgress.done();
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.dir(error);
    if (error.response.status == 401) {
      alert("您还没有登录！");
      window.location.href = "#/login";
    }
    return Promise.reject(error);
  }
);

// export const get = (url) => instance.get(url)

export function get(url, params) {
  // 当设置了baseURL之后，实际请求地址为baseURL+url
  return instance.get(url, {
    params,
  });
}

export function post(url, data, config) {
  return instance.post(url, data, config);
}

export function put(url, data) {
  return instance.put(url, data);
}

export function del(url) {
  return instance.delete(url);
}