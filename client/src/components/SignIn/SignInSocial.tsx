import { RiKakaoTalkLine } from 'react-icons/ri';
import { SiNaver } from 'react-icons/si';
import { GrGoogle } from 'react-icons/gr';
import { KAKAO_AUTH_URL } from 'components/OAuth/Kakao';
import { GOOGLE_AUTH_URL } from 'components/OAuth/Google';
import { NAVER_AUTH_URL } from 'components/OAuth/Naver';
import { SignInSocialWrap } from './styled';

const SignInSocial = () => {
  return (
    <SignInSocialWrap>
      <li>
        <a href={KAKAO_AUTH_URL}>
          <RiKakaoTalkLine />
        </a>
      </li>
      <li>
        <a href={NAVER_AUTH_URL}>
          <SiNaver />
        </a>
      </li>
      <li>
        <a href={GOOGLE_AUTH_URL}>
          <GrGoogle />
        </a>
      </li>
    </SignInSocialWrap>
  );
};

export default SignInSocial;
