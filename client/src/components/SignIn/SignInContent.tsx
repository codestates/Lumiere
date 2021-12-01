import { SignInContentWrap, SignInBtnWrap } from './styled';
import SignInSocial from './SignInSocail';

const SignInContent = () => {
  return (
    <SignInContentWrap>
      <form>
        <label htmlFor="signin-email">
          이메일
          <input
            type="email"
            id="signin-email"
            placeholder="이메일을 입력해주세요"
          />
        </label>
        <label htmlFor="signin-password">
          비밀번호
          <input
            type="password"
            id="signin-password"
            placeholder="비밀번호를 입력해주세요"
          />
        </label>
        <SignInSocial />
        <SignInBtnWrap>
          <span>아이디와 비밀번호를 다시 한번 확인해주세요</span>
          <button type="submit">로그인</button>
        </SignInBtnWrap>
      </form>
    </SignInContentWrap>
  );
};

export default SignInContent;
