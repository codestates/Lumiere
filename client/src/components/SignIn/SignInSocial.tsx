import { useEffect } from 'react';
import { RiKakaoTalkLine } from 'react-icons/ri';
import { SiNaver } from 'react-icons/si';
import { GrGoogle } from 'react-icons/gr';
import { SignInSocialWrap } from './styled';

declare global {
  interface Window {
    naver: any;
  }
}
const { naver } = window;

const SignInSocial = () => {
  const Naver = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: 'WJlQ9VXvCz6GnB59o4uy',
      callbakcUrl: 'http://localhost:3000',
      callbackHandle: true,
      loginButton: {
        color: 'black',
        type: 1,
        height: 90,
      },
    });
    naverLogin.init();
  };
  useEffect(() => {
    Naver();
  }, []);
  return (
    <SignInSocialWrap>
      <li>
        <RiKakaoTalkLine />
      </li>
      <li>
        <SiNaver />
      </li>
      <li>
        <GrGoogle />
      </li>
      <div role="button" tabIndex={0} id="naverIdLogin">
        test
      </div>
    </SignInSocialWrap>
  );
};

export default SignInSocial;
