import { extend } from "umi-request";
import { message } from "antd";
import errorHandler from "./error-handler";

// const vanEnv = (document.documentElement.dataset.vanEnv || "dev") as Env;
const apiHostMap = {
  dev: "https://dm-ai-stg.huolala.work",
  stg: "https://dm-ai-stg.huolala.work",
  pre: "https://dm-ai-pre.huolala.work",
  prod: "https://dm-ai.huolala.work",
};
const atlasApiHostMap = {
  dev: "https://gateway-office-public-stg.huolala.work",
  stg: "https://gateway-office-public-stg.huolala.work",
  pre: "https://gateway-office-public-pre.huolala.work",
  prod: "https://gateway-office-public.huolala.work",
};

// export const getApiHost = () => apiHost;
// export const getAtlasApiHost = () => atlasApiHost;

const request = extend({
  timeout: 10000 * 6,
  //   credentials: "include", // 使用cookie获取请求
  // prefix: process.env.NODE_ENV === 'development' ? '/api' : apiHost,
  getResponse: false, // 是否得到源响应，结果将封装一层
  errorHandler, //  异常处理，或覆盖统一异常处理
});

/**
 * @desc 拦截器 - 请求拦截器 根据不同的环境配置不同的请求地址
 * @desc 查看详情：https://github.com/umijs/umi-request/blob/master/README_zh-CN.md#%E6%8B%A6%E6%88%AA%E5%99%A8
 */
request.interceptors.request.use((url, options) => {
  //   const isDev = process.env.NODE_ENV === "development";
  //   return {
  //     url: "http://localhost:3000" + url,
  //     options,
  //   };
  // atlas
  //   if (url.startsWith("/atlas-api")) {
  //     return {
  //       url: isDev ? url : `${atlasApiHost}${url}`,
  //       options,
  //     };
  //   }

  //   // common
  //   return {
  //     url: isDev ? `/api${url}` : `${apiHost}${url}`,
  //     options,
  //   };
  return {
    url,
    options,
  };
});

// 响应拦截器
request.interceptors.response.use(async (response, option): Promise<any> => {
  if (response.status !== 200) {
    message.error(response.statusText);
    throw Error(response.statusText);
  }

  const data = await response.clone().json();

  if (data.ret !== 0 && option.skipError !== true) {
    message.error(data?.msg || data?.message);

    if (data?.ret === 2001 || data?.ret === 20001) {
      setTimeout(() => {
        // 登录失效，重新登录
        window.location.href = data.data?.redirectUrl;
      }, 1000);
    }
    throw Error(data?.msg);
  }

  return response;
});

export default request;
