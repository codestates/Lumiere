/* eslint-disable */
import React, { useState, useReducer, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useRecoilState } from 'recoil';
import { IsDisableBtnState } from 'States/IsDisableBtnState';
import instance from 'util/axios';
import SignUpPrivacy from './SignUpPrivacy';
import { emailValidate } from 'util/validate';
import { VscPass, VscError } from 'react-icons/vsc';
import { errMessageState, errMessageReducer } from './reducer';
import {
  SignUpContentWrap,
  SignUpBtnWrap,
  SignUpInpuForm,
  SignUpErrMessage,
  SignUpErrImg,
  SigunUpInputFormInput,
} from './styled';

type SignupInfo = {
  name: string;
  email: string;
  password: string;
  passwordCheck: string;
};

const SignUpContent = () => {
  // Error Message reducer
  const [state, dispatch] = useReducer(errMessageReducer, errMessageState);
  // Value State
  const [signupInputInfo, setSignupInputInfo] = useState<SignupInfo>({
    name: '',
    email: '',
    password: '',
    passwordCheck: '',
  });

  // 로그인에 필요한 모든 상태 확인
  const [validateAllCheck, setValidateAllCheck] = useState(false);
  // privacy 모든 상태
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [privacyErrState, setPrivacyErrState] = useState(false);
  const [isDisableBtn, setIsDisableBtn] = useRecoilState(IsDisableBtnState);

  const history = useNavigate();

  useEffect(() => {
    if (
      state.passwordValidata &&
      state.emailValidata &&
      state.nameValidata &&
      state.passwordCheckValidata &&
      isAllChecked
    ) {
      setValidateAllCheck(true);
    } else {
      setValidateAllCheck(false);
    }
  }, [
    state.emailValidata,
    state.nameValidata,
    state.passwordCheckValidata,
    state.passwordValidata,
    isAllChecked,
  ]);

  useEffect(() => {
    if (checkedItems.length === 2) {
      setIsAllChecked(true);
    }

    if (checkedItems.length !== 2) {
      setIsAllChecked(false);
    }
  }, [checkedItems, isAllChecked]);

  // InputValue
  const signupInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === 'signup-name') {
      setSignupInputInfo({ ...signupInputInfo, name: e.target.value });
    }

    if (e.target.id === 'signup-email') {
      setSignupInputInfo({ ...signupInputInfo, email: e.target.value });
    }

    if (e.target.id === 'signup-password') {
      setSignupInputInfo({ ...signupInputInfo, password: e.target.value });
    }

    if (e.target.id === 'signup-passwordCheck') {
      setSignupInputInfo({ ...signupInputInfo, passwordCheck: e.target.value });
    }
  };

  const setErrMessageName = () =>
    dispatch({ type: 'NAME', name: signupInputInfo.name });
  const setErrMessageEmail = () => {
    if (emailValidate(signupInputInfo.email)) {
      instance
        .post('users/email', { email: signupInputInfo.email })
        .then(() => {
          dispatch({
            type: 'EMAIL',
            email: signupInputInfo.email,
            overlap: 200,
          });
        })
        .catch(() => {
          dispatch({
            type: 'EMAIL',
            email: signupInputInfo.email,
            overlap: 401,
          });
        });
    } else {
      dispatch({ type: 'EMAIL', email: signupInputInfo.email });
    }
  };
  const setErrMessagePassword = () =>
    dispatch({ type: 'PASSWORD', password: signupInputInfo.password });
  const setErrMessagePasswordCheck = () =>
    dispatch({
      type: 'PASSWORDCHECK',
      passwordCheck: signupInputInfo.passwordCheck,
      password: signupInputInfo.password,
    });

  // Signup Handler Axios
  const signupHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isDisableBtn) {
      setIsDisableBtn(false);
      return;
    } else {
      setIsDisableBtn(true);
    }
    if (!validateAllCheck) {
      setIsDisableBtn(false);
      setErrMessageName();
      setErrMessageEmail();
      setErrMessagePassword();
      setErrMessagePasswordCheck();
      setPrivacyErrState(true);
      setSignupInputInfo({
        ...signupInputInfo,
        password: '',
        passwordCheck: '',
      });
    } else {
      instance
        .post('users', {
          email: signupInputInfo.email,
          password: signupInputInfo.password,
          name: signupInputInfo.name,
        })
        .then(() => {
          history('/signin');
        })
        .catch(() => {
          setIsDisableBtn(false);
        });
    }
  };

  return (
    <SignUpContentWrap>
      <SignUpInpuForm onSubmit={signupHandler} noValidate>
        <label htmlFor="signup-name">
          이름
          <SignUpErrImg>
            {!state.nameErrMessage &&
            !state.nameValidata ? null : state.nameErrMessage &&
              !state.nameValidata ? (
              <VscError />
            ) : (
              <VscPass className={'pass'} />
            )}
          </SignUpErrImg>
          <SigunUpInputFormInput
            type="text"
            id="signup-name"
            placeholder="성함을 입력해주세요"
            value={signupInputInfo.name}
            onChange={signupInputChange}
            onBlur={setErrMessageName}
            err={state.nameErrMessage}
            errboolean={state.nameValidata}
          />
        </label>
        <SignUpErrMessage err={state.nameErrMessage}>
          {state.nameErrMessage}.
        </SignUpErrMessage>
        <label htmlFor="signup-email">
          이메일
          <SignUpErrImg>
            {!state.emailErrMessage &&
            !state.emailValidata ? null : state.emailErrMessage &&
              !state.emailValidata ? (
              <VscError />
            ) : (
              <VscPass className={'pass'} />
            )}
          </SignUpErrImg>
          <SigunUpInputFormInput
            type="email"
            id="signup-email"
            placeholder="이메일을 입력해주세요"
            value={signupInputInfo.email}
            onChange={signupInputChange}
            onBlur={setErrMessageEmail}
            err={state.emailErrMessage}
            errboolean={state.emailValidata}
          />
        </label>
        <SignUpErrMessage err={state.emailErrMessage}>
          {state.emailErrMessage}.
        </SignUpErrMessage>
        <label htmlFor="signup-password">
          비밀번호
          <SignUpErrImg>
            {!state.passwordErrMessage &&
            !state.passwordValidata ? null : state.passwordErrMessage &&
              !state.passwordValidata ? (
              <VscError />
            ) : (
              <VscPass className={'pass'} />
            )}
          </SignUpErrImg>
          <SigunUpInputFormInput
            type="password"
            id="signup-password"
            placeholder="8~20자의 영문&숫자 조합만 사용 가능합니다"
            value={signupInputInfo.password}
            onChange={signupInputChange}
            onBlur={setErrMessagePassword}
            err={state.passwordErrMessage}
            errboolean={state.passwordValidata}
          />
        </label>
        <SignUpErrMessage err={state.passwordErrMessage}>
          {state.passwordErrMessage}.
        </SignUpErrMessage>
        <label htmlFor="signup-passwordCheck">
          비밀번호 확인
          <SignUpErrImg>
            {!state.passwordCheckMessage &&
            !state.passwordCheckValidata ? null : state.passwordCheckMessage &&
              !state.passwordCheckValidata ? (
              <VscError />
            ) : (
              <VscPass className={'pass'} />
            )}
          </SignUpErrImg>
          <SigunUpInputFormInput
            type="password"
            id="signup-passwordCheck"
            placeholder="비밀번호 확인"
            value={signupInputInfo.passwordCheck}
            onChange={signupInputChange}
            onBlur={setErrMessagePasswordCheck}
            err={state.passwordCheckMessage}
            errboolean={state.passwordCheckValidata}
          />
        </label>
        <SignUpErrMessage err={state.passwordCheckMessage}>
          {state.passwordCheckMessage}.
        </SignUpErrMessage>
        <SignUpPrivacy
          isAllChecked={isAllChecked}
          setIsAllChecked={setIsAllChecked}
          checkedItems={checkedItems}
          setCheckedItems={setCheckedItems}
          privacyErrState={privacyErrState}
        />
        <SignUpBtnWrap>
          <button type="submit">회원가입</button>
        </SignUpBtnWrap>
      </SignUpInpuForm>
    </SignUpContentWrap>
  );
};

export default SignUpContent;
