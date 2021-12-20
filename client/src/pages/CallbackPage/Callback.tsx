import { useEffect } from 'react';
import instance from 'util/axios';
import { useRecoilState } from 'recoil';
import { IsSigninState } from 'States/IsLoginState';
import { CallbackContainer } from './styled';

const Callback = () => {
  const [isLogin, setIsLogin] = useRecoilState(IsSigninState);
  // 인가코드
  const code = new URL(window.location.href).searchParams.get('code');
  const codeHandler = (code: string | null) => {
    if (window.location.href.split('oauth/')[1].split('?')[0] === 'kakao')
      return `/users/kakao?code=${code}`;
    return `/users/${window.location.href.split('oauth/')[1]}?code=${code}`;
  };
  useEffect(() => {
    instance
      .get(codeHandler(code))
      .then((res) => {
        const userInfo = res.data;
        if (window.location.href.split('oauth/')[1].split('?')[0]) {
          userInfo.social = true;
        }
        localStorage.setItem('lumiereUserInfo', JSON.stringify(userInfo));
        setIsLogin(true);
        // window.history.go(-2); // 토큰 받았았고 로그인됐으니 화면 전환시켜줌(메인으로)
      })
      .catch((err) => {
        alert('로그인에 실패하였습니다.');
        window.location.replace('/signin'); // 로그인 실패하면 로그인화면으로 돌려보냄
      });
  }, []);

  return (
    <CallbackContainer>
      <img src="/images/loading.svg" alt="Loading" />
    </CallbackContainer>
  );
};

export default Callback;
