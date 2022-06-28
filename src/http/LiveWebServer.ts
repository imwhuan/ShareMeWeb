import axios from "axios";
import { notification } from "ant-design-vue";
import { GetUserToken } from "@/plugins/UseLocalDB";
import { ShareMeDataModel } from "./ShareMeServerModel";

const BaseUrl = process.env.VUE_APP_SERVER_LIVE;

const ShareMeServer = axios.create({
  baseURL: BaseUrl,
  timeout: 10000,
  // 'transformRequest' 允许在向服务器发送前，修改请求数据
  // transformRequest: [function (data) {
  //     // 对 data 做序列化处理
  //     return qs.stringify(data);
  // }],
});

ShareMeServer.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8";

//------------------请求拦截-------------------//
//------------在发送请求之前做些什么------------//
ShareMeServer.interceptors.request.use(
  (config) => {
    if (GetUserToken()) {
      if (config.headers) {
        config.headers.Authorization = "Bearer " + GetUserToken();
      }
    }
    console.log("准备请求");
    // 放行
    return config;
  },
  (err) => {
    console.log("请求错误", err);
    notification.error({ message: "请求错误", description: err });
    return err;
  }
);

//------------------响应拦截-------------------//
//-------------对响应数据做点什么-------------//
ShareMeServer.interceptors.response.use(
  (res) => {
    //例：后端数据处理错误，并返回错误原因；前端获取错误原因并展示
    console.log("请求完成", res);
    return res;
  },
  (err) => {
    if (err.response) {
      console.error("请求结果错误", err.response.data);
      notification.error({
        message: "请求返回错误",
        description: err.response.data.message ?? "无错误信息",
      });
      return Promise.reject(err.response.data);
      // const statuscode = err.response.status;
      // const errmsg = err.response.data.message;
      // if (statuscode == 401) {
      //   notification.error({ message: "401-错误请重试", description: errmsg });
      // } else if (statuscode == 500) {
      //   notification.error({ message: "500-错误请重试", description: errmsg });
      // } else {
      //   notification.error({ message: statuscode + "-错误请重试", description: errmsg });
      // }
      // return Promise.reject(err.response.data);
    } else {
      notification.error({
        message: "请求返回错误",
        description: "请求返回空",
      });
      const errData: ShareMeDataModel<any> = {
        statusCode: 500,
        success: false,
        data: null,
        message: "未知系统错误",
        tag: "",
      };
      return Promise.reject(errData);
    }
  }
);

export default ShareMeServer;
