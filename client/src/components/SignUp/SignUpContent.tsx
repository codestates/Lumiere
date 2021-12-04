/* eslint-disable */
import { emailValidate } from 'util/validate';
import instance from 'util/axios';
import React, { useState, useReducer } from 'react';
import { errMessageState, errMessageReducer } from './reducer';
import { VscPass, VscError } from 'react-icons/vsc';
import SignUpPrivacy from './SignUpPrivacy';
import {
  SignUpContentWrap,
  SignUpBtnWrap,
  SignUpInpuForm,
  SignUpErrMessage,
  SignUpErrImg,
} from './styled';

type SignupInfo = {
  name: string;
  email: string;
  password: string;
  passwordCheck: string;
};

const SignUpContent = () => {
  //Error Message reducer
  const [state, dispatch] = useReducer(errMessageReducer, errMessageState);
  //Value State
  const [signupInputInfo, setSignupInputInfo] = useState<SignupInfo>({
    name: '',
    email: '',
    password: '',
    passwordCheck: '',
  });

  //InputValue
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
        .then((res) => {
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

  //Signup Handler Axios
  const signupHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(123);
  };

  return (
    <SignUpContentWrap>
      <SignUpInpuForm onSubmit={signupHandler} noValidate>
        <label htmlFor="signup-name">
          이름
          <SignUpErrImg>
            <VscPass />
          </SignUpErrImg>
          <input
            type="text"
            id="signup-name"
            placeholder="성함을 입력해주세요"
            value={signupInputInfo.name}
            onChange={signupInputChange}
            onBlur={setErrMessageName}
          />
        </label>
        <SignUpErrMessage>{state.nameErrMessage}.</SignUpErrMessage>
        <label htmlFor="signup-email">
          이메일
          <SignUpErrImg>
            <VscError />
          </SignUpErrImg>
          <input
            type="email"
            id="signup-email"
            placeholder="이메일을 입력해주세요"
            value={signupInputInfo.email}
            onChange={signupInputChange}
            onBlur={setErrMessageEmail}
          />
        </label>
        <SignUpErrMessage>{state.emailErrMessage}.</SignUpErrMessage>
        <label htmlFor="signup-password">
          비밀번호
          <SignUpErrImg>
            <VscPass />
          </SignUpErrImg>
          <input
            type="password"
            id="signup-password"
            placeholder="8~20자의 영문&숫자 조합만 사용 가능합니다"
            value={signupInputInfo.password}
            onChange={signupInputChange}
            onBlur={setErrMessagePassword}
          />
        </label>
        <SignUpErrMessage>{state.passwordErrMessage}.</SignUpErrMessage>
        <label htmlFor="signup-passwordCheck">
          비밀번호 확인
          <SignUpErrImg>
            <VscError />
          </SignUpErrImg>
          <input
            type="password"
            id="signup-passwordCheck"
            placeholder="비밀번호 확인"
            value={signupInputInfo.passwordCheck}
            onChange={signupInputChange}
            onBlur={setErrMessagePasswordCheck}
          />
        </label>
        <SignUpErrMessage>{state.passwordCheckMessage}.</SignUpErrMessage>
        <SignUpPrivacy />
        <SignUpBtnWrap>
          <button type="submit">회원가입</button>
        </SignUpBtnWrap>
      </SignUpInpuForm>
    </SignUpContentWrap>
  );
};

export default SignUpContent;
