import React, { useState } from 'react';
import instance from 'util/axios';
import { emailValidate, passwordValidate } from 'util/validate';
import { IsSigninState } from 'States/IsLoginState';
import { useSetRecoilState } from 'recoil';
import { SignInContentWrap, SignInBtnWrap, SignInErrMessage } from './styled';
import SignInSocial from './SignInSocial';

type SigninInput = {
  email: string;
  password: string;
};

const SignInContent = () => {
  const [signinInputInfo, setSigninInputInfo] = useState<SigninInput>({
    email: '',
    password: '',
  });
  const [errMessage, setErrMessage] = useState('nothing');

  const signinStateHandler = useSetRecoilState(IsSigninState);

  const inputValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === 'email') {
      setSigninInputInfo({ ...signinInputInfo, email: e.target.value });
    } else if (e.target.type === 'password') {
      setSigninInputInfo({ ...signinInputInfo, password: e.target.value });
    }
  };

  const signinHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      emailValidate(signinInputInfo.email) &&
      passwordValidate(signinInputInfo.password)
    ) {
      // axios 요청
      instance
        .post('/users/login', { ...signinInputInfo })
        .then((res) => {
          const userInfo = res.data;
          userInfo.social = false;
          localStorage.setItem('lumiereUserInfo', JSON.stringify(userInfo));
          signinStateHandler(true);
          window.history.go(-1);
        })
        .catch(() => {
          setErrMessage(`*아이디와 비밀번호를 정확히 입력해 주세요`);
          setSigninInputInfo({ ...signinInputInfo, password: '' });
          signinStateHandler(false);
        });
    } else {
      setErrMessage(`*아이디와 비밀번호를 정확히 입력해 주세요`);
      setSigninInputInfo({ ...signinInputInfo, password: '' });
    }
  };

  return (
    <SignInContentWrap>
      <form onSubmit={signinHandler} noValidate>
        <label htmlFor="signin-email">
          이메일
          <input
            type="email"
            id="signin-email"
            placeholder="이메일을 입력해주세요"
            value={signinInputInfo.email}
            onChange={inputValueHandler}
          />
        </label>
        <label htmlFor="signin-password">
          비밀번호
          <input
            type="password"
            id="signin-password"
            placeholder="비밀번호를 입력해주세요"
            value={signinInputInfo.password}
            onChange={inputValueHandler}
          />
        </label>
        <SignInSocial />
        <SignInBtnWrap>
          <SignInErrMessage err={errMessage}>{errMessage}.</SignInErrMessage>
          <button type="submit">로그인</button>
        </SignInBtnWrap>
      </form>
    </SignInContentWrap>
  );
};

export default SignInContent;
