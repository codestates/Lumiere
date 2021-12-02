import { RiKakaoTalkLine } from 'react-icons/ri';
import { SiNaver } from 'react-icons/si';
import { GrGoogle } from 'react-icons/gr';
import { SignInSocialWrap } from './styled';

const SignInSocial = () => {
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
    </SignInSocialWrap>
  );
};

export default SignInSocial;
