import axios from 'axios';

const baseURL = 'https://lumiereserver.online/api';
// const baseURL = 'http://localhost:5000/api';

// Set config defaults when creating the instance
const instance = axios.create({
  baseURL,
});

//  axios 요청을 할때 중간에서 가로챔
instance.interceptors.request.use(
  function setConfig(parameter) {
    const config = parameter;
    const userInfo = localStorage.getItem('lumiereUserInfo');

    config.headers = {
      'Content-Type': 'application/json',
    };

    if (userInfo) {
      config.headers.Authorization = `Bearer ${JSON.parse(userInfo).token}`;
    }

    // Do something before request is sent
    return config;
  },
  function getError(error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

export default instance;
