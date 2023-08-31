import axios from 'axios';

const KEY_API =
  '1755ddda12372cf6db0b40695b5a3985d65172d6cdfc817156edd0eddf89c4d842073f92511b8b14';

axios.defaults.baseURL = 'https://api.qiqi.vn/';

// Add a request interceptor
axios.interceptors.request.use(
  function (config: any) {
    // Do something before request is sent
    config.headers.token = KEY_API;
    config.headers.host = 'api.qiqi.vn';
    config.headers['user-agent'] = 'okhttp/3.12.1';
    console.log('REQUEST', {
      baseUrl: config.baseURL,
      url: config.url,
      method: config.method,
      data: config.data || config.params,
      dataStr: JSON.stringify(config.data),
    });
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    console.log('RESPONSE', {
      data: response.data,
      status: response.status,
      url: response.config.url,
      body: response.config.data,
    });
    return response.data;
  },
  function (error) {
    console.log('ERROR', error || 'CANCEL REQUEST');
    console.log(error?.response);

    return error?.response?.data || 'Cancel';
  },
);
