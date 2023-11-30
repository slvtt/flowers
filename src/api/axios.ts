import axios from "axios";
import { AxiosRequestHeaders } from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { getAuthTokens, removeAuthTokens } from "src/utils/helpers/authHelper";
import { getLocationOrigin } from "src/utils/helpers/getLocationHelper";
import { errorHandler } from "src/api/errorHandler";

//set your postfix
const apiInstance = axios.create({
  baseURL: process.env.API_URL + "/api",
});

const retryInstance = axios.create({
  baseURL: process.env.API_URL,
});

retryInstance.interceptors.request.use((config) => {
  // url is /api/api/etc..
  if (!config.headers) config.headers = {} as AxiosRequestHeaders;

  config.headers["Authorization"] = `Bearer ${getAuthTokens().access_token}`;

  return Promise.resolve(config);
});

const failedRequest = (failReq: any) => {
  removeAuthTokens();
  //set your auth/login page
  window.location.href = `${getLocationOrigin(true)}/auth`;

  return Promise.reject();
  // const refreshToken = getAuthTokens().refresh_token;
  //
  // if (refreshToken)
  //   return refreshMiddleware
  //     .refreshRequest(refreshToken)
  //     .then(() => {
  //       const access_token = getAuthTokens().access_token;
  //       if (access_token) {
  //         apiInstance.defaults.headers[
  //           "Authorization"
  //         ] = `Bearer ${access_token}`;
  //
  //         failReq.response.config.headers[
  //           "Authorization"
  //         ] = `Bearer ${access_token}`;
  //
  //         return Promise.resolve();
  //       }
  //
  //       return Promise.reject();
  //     })
  //     .catch(() => {
  //
  //       Promise.reject(failReq);
  //       window.location.href = "";
  //       // this.appHistory && this.appHistory.push(AUTH);
  //     });
  // else {
  //   return Promise.reject(failReq);
  // }
};

createAuthRefreshInterceptor(apiInstance, failedRequest, {
  statusCodes: [401, 403],
  retryInstance,
});

const isTokenRequest = (requestUrl?: string) => {
  if (!requestUrl) {
    return true;
  }
  //set your nonJwtUrls
  const nonJwtUrls = ["/auth/phone", "/auth/admin/code"];

  return !nonJwtUrls.find((url) => url === requestUrl);
};

apiInstance.interceptors.request.use(
    (config) => {
      const originalRequest = config;
      const { access_token } = getAuthTokens();

      if (access_token && isTokenRequest(originalRequest.url)) {
        if (!originalRequest.headers)
          originalRequest.headers = {} as AxiosRequestHeaders;

        originalRequest.headers["Authorization"] = `Bearer ${access_token}`;
      }

      return Promise.resolve(originalRequest);
    },
    (err) => Promise.reject(err)
);

// not required
apiInstance.interceptors.response.use(
    (response) => response,
    (err) => {
      errorHandler(err);
    }
);

export default apiInstance;
