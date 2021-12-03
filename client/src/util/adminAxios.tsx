import axios from 'axios';

const baseURL = 'https://lumiereserver.online/api';

// Set config defaults when creating the instance
const adminInstance = axios.create({
  baseURL,
});

//  axios 요청을 할때 중간에서 가로챔
adminInstance.interceptors.request.use(
  function setConfig(parameter) {
    const config = parameter;
    const userInfo = localStorage.getItem('lumierUserInfo');

    config.headers = {
      'Content-Type': 'application/json',
    };

    if (userInfo) {
      config.headers.Authorization =
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYTQzOGYwOGY3MmUwNmFmZWQzYTMxOSIsImlhdCI6MTYzODE4NTI4MCwiZXhwIjoxNjQwNzc3MjgwfQ.CcQEwOdWP2S4YZdSsqOSbObc0HltV4-PNVd0kv-4bnQ';
    }

    // Do something before request is sent
    return config;
  },
  function getError(error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

export default adminInstance;
