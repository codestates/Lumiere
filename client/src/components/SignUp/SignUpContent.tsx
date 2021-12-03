/* eslint-disable */
import { VscPass, VscError } from 'react-icons/vsc';
import SignUpPrivacy from './SignUpPrivacy';
import {
  SignUpContentWrap,
  SignUpBtnWrap,
  SignUpInpuForm,
  SignUpErrMessage,
  SignUpErrImg,
} from './styled';

const SignUpContent = () => {
  return (
    <SignUpContentWrap>
      <SignUpInpuForm noValidate>
        <label htmlFor="signup-name">
          이름
          <SignUpErrImg>
            <VscPass />
          </SignUpErrImg>
          <input
            type="text"
            id="signup-name"
            placeholder="성함을 입력해주세요"
          />
        </label>
        <SignUpErrMessage>제대로 입력해</SignUpErrMessage>
        <label htmlFor="signin-email">
          이메일
          <SignUpErrImg>
            <VscError />
          </SignUpErrImg>
          <input
            type="email"
            id="signin-email"
            placeholder="비밀번호를 입력해주세요"
          />
        </label>
        <SignUpErrMessage>제대로 입력해</SignUpErrMessage>
        <label htmlFor="signup-password">
          비밀번호
          <SignUpErrImg>
            <VscPass />
          </SignUpErrImg>
          <input
            type="password"
            id="signup-password"
            placeholder="8~20자의 영문&숫자 조합만 사용 가능합니다"
          />
        </label>
        <SignUpErrMessage>제대로 입력해</SignUpErrMessage>
        <label htmlFor="signup-passwordCheck">
          비밀번호 확인
          <SignUpErrImg>
            <VscError />
          </SignUpErrImg>
          <input
            type="password"
            id="signup-passwordCheck"
            placeholder="비밀번호 확인"
          />
        </label>
        <SignUpErrMessage>제대로 입력해</SignUpErrMessage>
        <SignUpPrivacy />
        <SignUpBtnWrap>
          <button type="submit">회원가입</button>
        </SignUpBtnWrap>
      </SignUpInpuForm>
    </SignUpContentWrap>
  );
};

export default SignUpContent;
