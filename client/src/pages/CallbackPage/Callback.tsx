import { useEffect } from 'react';
import instance from 'util/axios';
import { useRecoilState } from 'recoil';
import { IsSigninState } from 'States/IsLoginState';

const Callback = () => {
  const [isLogin, setIsLogin] = useRecoilState(IsSigninState);
  // 인가코드
  const code = new URL(window.location.href).searchParams.get('code');

  useEffect(() => {
    if (code) {
      instance
        .get(`/users/oauth/kakao?code=${code}`)
        .then((res) => {
          console.log(res); // 토큰이 넘어올 것임
          const userInfo = res.data;
          localStorage.setItem('lumiereUserInfo', JSON.stringify(userInfo));
          setIsLogin(true);
          window.location.replace('/'); // 토큰 받았았고 로그인됐으니 화면 전환시켜줌(메인으로)
        })
        .catch((err) => {
          console.log('소셜로그인 에러', err);
          alert('로그인에 실패하였습니다.');
          window.location.replace('/signin'); // 로그인 실패하면 로그인화면으로 돌려보냄
        });
    }
  }, []);

  return <img src="/images/loading.svg" alt="Loading" />;
};

export default Callback;
