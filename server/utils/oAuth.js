/* eslint-disable no-return-await */
/* eslint-disable max-classes-per-file */
import axios from 'axios';
import qs from 'qs';

class Kakao {
  constructor(code) {
    this.url = 'https://kauth.kakao.com/oauth/token';
    this.client_id = process.env.KAKAO_CLIENT_ID;
    this.redirect_uri = `${process.env.REDIRECT_URI}/kakao`;
    this.code = code; // 인가 코드 혹은 갱신 토큰

    // userInfo
    this.userInfo_url = 'https://kapi.kakao.com/v2/user/me';
  }
}

class Google {
  constructor(code) {
    this.url = 'https://oauth2.googleapis.com/token';
    this.client_id = process.env.GOOGLE_CLIENT_ID;
    this.client_secret = process.env.GOOGLE_CLIENT_SECRET;
    this.redirect_uri = `${process.env.REDIRECT_URI}/google`;
    this.code = code;
    this.scope =
      'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid';

    // userInfo
    this.userInfo_url = 'https://www.googleapis.com/oauth2/v3/tokeninfo';
  }
}

class Naver {
  constructor(code) {
    this.url = 'https://nid.naver.com/oauth2.0/token';
    this.client_id = process.env.NAVER_CLIENT_ID;
    this.client_secret = process.env.NAVER_CLIENT_SECRET;
    this.redirect_uri = `${process.env.REDIRECT_URI}/naver`;
    this.code = code;
    this.state = process.env.NAVER_STATE;

    // userInfo
    this.userInfo_url = 'https://openapi.naver.com/v1/nid/me';
  }
}

const getOption = (corp, code) => {
  switch (corp) {
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

const config = {
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
  },
};

// 토큰 얻기
const getAccessToken = async (options, grantType) => {
  if (options.scope) {
    // 구글
    const res = await axios.post(
      options.url,
      qs.stringify({
        grant_type: grantType,
        client_id: options.client_id,
        client_secret: options.client_secret,
        redirect_uri: options.redirect_uri,
        code: options.code,
        scope: options.scope,
      }),
      config,
    );
    return res.data;
  }
  if (options.state) {
    const res = await axios.post(
      // 네이버
      options.url,
      qs.stringify({
        grant_type: grantType,
        client_id: options.client_id,
        client_secret: options.client_secret,
        redirect_uri: options.redirect_uri,
        code: options.code,
        state: options.state,
      }),
      config,
    );
    return res.data;
  }
  const res = await axios.post(
    // 카카오
    options.url,
    qs.stringify({
      grant_type: grantType,
      client_id: options.client_id,
      redirect_uri: options.redirect_uri,
      code: options.code,
    }),
    config,
  );
  return res.data;
};

// 유저 정보 얻기
const getUserInfo = async (corp, url, token) => {
  if (corp === 'google') {
    const res = await axios.get(`${url}?id_token=${token.id_token}`);
    return res.data;
  }
  const res = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token.access_token}`,
    },
  });
  return res.data;
};

// 토큰 갱신
const updateAccessToken = async (options, grantType) => {
  const res = await axios.post(
    options.url,
    qs.stringify({
      grant_type: grantType,
      client_id: options.client_id,
      client_secret: options.client_secret,
      refresh_token: options.code,
    }),
    config,
  );
  return res.data;
};

// 연결 끊기
const revokeAccess = async (corp, token) => {
  switch (corp) {
    case 'google':
      return await axios.post(
        `https://oauth2.googleapis.com/revoke?token=${token}`,
      );
    case 'naver':
      return await axios.post(
        `https://nid.naver.com/oauth2.0/token?grant_type=delete&client_id=${process.env.NAVER_CLIENT_ID}&client_secret=${process.env.NAVER_CLIENT_SECRET}&access_token=${token}&service_provider=NAVER`,
      );
    case 'kakao':
      return await axios.get('https://kapi.kakao.com/v1/user/unlink', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    default:
      return null;
  }
};

export {
  getUserInfo,
  getAccessToken,
  updateAccessToken,
  getOption,
  revokeAccess,
};
