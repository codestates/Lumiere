import { SignUpPrivacyWrap } from './styled';

const SignUpPrivacy = () => {
  return (
    <SignUpPrivacyWrap>
      <div>
        <label htmlFor="all-Check">
          <input type="checkbox" id="all-Check" />
          전체동의
        </label>
        <label htmlFor="personal-information-Check">
          <input type="checkbox" id="personal-information-Check" />
          개인정보처리방침에 동의
          <button type="button">[자세히 보기]</button>
        </label>
        <label htmlFor="Terms-of-Use-Check">
          <input type="checkbox" id="Terms-of-Use-Check" />
          이용약관에 동의
          <button type="button">[자세히 보기]</button>
        </label>
      </div>
    </SignUpPrivacyWrap>
  );
};

export default SignUpPrivacy;
