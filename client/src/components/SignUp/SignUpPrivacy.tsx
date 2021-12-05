import SignupPrivacyModal from 'components/Modal/SignupPriavacyModal';
import SignupTermsModal from 'components/Modal/SignupTermsModal';
import React, { useState } from 'react';
import { SignUpPrivacyWrap } from './styled';

const SignUpPrivacy = () => {
  const [clickPrivacyModal, setClickPrivacyModal] = useState(false);
  const [clickTermsModal, setClickTermsModal] = useState(false);

  const clickModalHandler = () => {
    if (clickPrivacyModal) {
      setClickPrivacyModal(false);
    }
    if (clickTermsModal) {
      setClickTermsModal(false);
    }
  };

  return (
    <SignUpPrivacyWrap>
      {clickPrivacyModal && (
        <SignupPrivacyModal clickModalHandler={clickModalHandler} />
      )}
      {clickTermsModal && (
        <SignupTermsModal clickModalHandler={clickModalHandler} />
      )}
      <div>
        <label htmlFor="all-Check">
          <input type="checkbox" id="all-Check" />
          전체동의
        </label>
        <label htmlFor="personal-information-Check">
          <input type="checkbox" id="personal-information-Check" />
          개인정보 처리방침에 동의 (필수)
          <button
            type="button"
            onClick={() => setClickPrivacyModal(!clickPrivacyModal)}
          >
            [자세히 보기]
          </button>
        </label>
        <label htmlFor="Terms-of-Use-Check">
          <input type="checkbox" id="Terms-of-Use-Check" />
          이용약관에 동의 (필수)
          <button
            type="button"
            onClick={() => setClickTermsModal(!clickTermsModal)}
          >
            [자세히 보기]
          </button>
        </label>
      </div>
    </SignUpPrivacyWrap>
  );
};

export default SignUpPrivacy;
