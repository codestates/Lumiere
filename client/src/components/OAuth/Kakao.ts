const CLIENT_ID = 'e3511c5fc4507afd80266f273662a203';
const REDIRECT_URI = 'http://localhost:3000/oauth/kakao';

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
