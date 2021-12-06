import SignupPrivacyModal from 'components/Modal/SignupPriavacyModal';
import SignupTermsModal from 'components/Modal/SignupTermsModal';
import React, { useState } from 'react';
import { SignUpPrivacyWrap, PrivacyMessage, PraivacyLabelWrap } from './styled';

type IsAllCheckedProps = {
  isAllChecked: boolean;
  setIsAllChecked: (check: boolean) => void;
  checkedItems: string[];
  setCheckedItems: (check: string[]) => void;
  privacyErrState: boolean;
};

const SignUpPrivacy = ({
  isAllChecked,
  setIsAllChecked,
  checkedItems,
  setCheckedItems,
  privacyErrState,
}: IsAllCheckedProps) => {
  const [clickPrivacyModal, setClickPrivacyModal] = useState(false);
  const [clickTermsModal, setClickTermsModal] = useState(false);

  const agreeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.checked) {
      setCheckedItems([...checkedItems, e.target.value]);
    }
    if (!e.currentTarget.checked && checkedItems.includes(e.target.value)) {
      setCheckedItems(checkedItems.filter((el) => el !== e.target.value));
      setIsAllChecked(false);
    }
  };

  const allAgreeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.checked) {
      setIsAllChecked(true);
      setCheckedItems(['privacy', 'terms']);
    }

    if (!e.currentTarget.checked) {
      setIsAllChecked(false);
      setCheckedItems([]);
    }
  };

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
        <PraivacyLabelWrap>
          <label htmlFor="all-Check">
            <input
              type="checkbox"
              id="all-Check"
              onChange={allAgreeHandler}
              checked={isAllChecked}
            />
          </label>
          <span>전체동의</span>
        </PraivacyLabelWrap>
        <PraivacyLabelWrap>
          <label htmlFor="personal-information-Check">
            <input
              type="checkbox"
              id="personal-information-Check"
              value="privacy"
              onChange={agreeHandler}
              checked={checkedItems.includes('privacy')}
            />
          </label>
          개인정보 처리방침에 동의 (필수)
          <button
            type="button"
            onClick={() => setClickPrivacyModal(!clickPrivacyModal)}
          >
            [자세히 보기]
          </button>
        </PraivacyLabelWrap>
        <PraivacyLabelWrap>
          <label htmlFor="Terms-of-Use-Check">
            <input
              type="checkbox"
              id="Terms-of-Use-Check"
              value="terms"
              onChange={agreeHandler}
              checked={checkedItems.includes('terms')}
            />
          </label>
          이용약관에 동의 (필수)
          <button
            type="button"
            onClick={() => setClickTermsModal(!clickTermsModal)}
          >
            [자세히 보기]
          </button>
        </PraivacyLabelWrap>
        <PrivacyMessage privacyErrState={privacyErrState}>
          개인정보 처리방침 및 이용약관을 확인 해주세요
        </PrivacyMessage>
      </div>
    </SignUpPrivacyWrap>
  );
};

export default SignUpPrivacy;
