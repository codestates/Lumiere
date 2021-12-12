/* eslint-disable max-classes-per-file */
import axios from 'axios';
import qs from 'qs';

class Kakao {
  constructor(code) {
    this.url = 'https://kauth.kakao.com/oauth/token';
    this.client_id = 'e3511c5fc4507afd80266f273662a203';
    this.redirect_uri = 'http://localhost:3000/oauth/kakao';
    this.code = code;

    // userInfo
    this.userInfo_url = 'https://kapi.kakao.com/v2/user/me';
  }
}

class Google {
  constructor(code) {
    this.url = 'https://oauth2.googleapis.com/token';
    this.client_id = process.env.GOOGLE_CLIENT_ID;
    this.client_secret = process.env.GOOGLE_CLIENT_SECRET;
    this.redirect_uri = 'http://localhost:5000/users/oauth/google';
    this.code = code;

    // userInfo
    this.userInfo_url = 'https://www.googleapis.com/oauth2/v1/tokeninfo';
  }
}

class Naver {
  constructor(code) {
    this.url = 'https://nid.naver.com/oauth2.0/token';
    this.client_id = process.env.NAVER_CLIENT_ID;
    this.client_secret = process.env.NAVER_CLIENT_SECRET;
    this.redirect_uri = 'http://localhost:5000/users/oauth/naver';
    this.code = code;

    // userInfo
    this.userInfo_url = 'https://openapi.naver.com/v1/nid/me';
  }
}

const getOption = (corporation, code) => {
  switch (corporation) {
    case 'google':
      return new Google(code);
    case 'kakao':
      return new Kakao(code);
    case 'naver':
      return new Naver(code);
    default:
      return null;
  }
};

// 토큰 얻기
const getAccessToken = async (options) => {
  let a;
  try {
    await axios
      .post(
        'https://kauth.kakao.com/oauth/token',
        qs.stringify({
          grant_type: 'authorization_code',
          client_id: 'e3511c5fc4507afd80266f273662a203',
          redirectUri: 'http://localhost:3000/oauth/kakao',
          code: options.code,
        }),
        {
          headers: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
          withCredentials: true,
        },
      )
      .then((res) => {
        a = res;
      });
  } catch (e) {
    // console.error(e);
  }
  return a;
};

// 유저 정보 얻기
const getUserInfo = async (url, accessToken) => {
  let a;
  try {
    await axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        a = res;
      });
  } catch (e) {
    // console.error(e);
  }
  return a;
};

export { getUserInfo, getAccessToken, getOption };
