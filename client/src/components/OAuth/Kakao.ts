const CLIENT_ID = 'e3511c5fc4507afd80266f273662a203';

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}/kakao`;
