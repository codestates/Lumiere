import { useState } from 'react';
import instance from 'util/axios';
import { VerifyPasswordContainer } from './styled';

interface Props {
  pwdMatch: boolean;
  setPwdMatch: React.Dispatch<React.SetStateAction<boolean>>;
  setOldPwd: React.Dispatch<React.SetStateAction<string>>;
}

const VerifyPassword = ({ pwdMatch, setPwdMatch, setOldPwd }: Props) => {
  const [inputVerifyPwd, setInputVerifyPwd] = useState('');
  const [pwdConfirmMessage, setPwdConfirmMessage] = useState('');

  const verifyPwdHandler = () => {
    if (inputVerifyPwd === '') {
      setPwdConfirmMessage('필수 입력 사항입니다');
    } else {
      instance
        .post('/users/profile', { password: inputVerifyPwd })
        .then(() => {
          setOldPwd(inputVerifyPwd);
          setInputVerifyPwd('');
          setPwdMatch(true);
        })
        .catch(() => {
          setPwdConfirmMessage('비밀번호를 다시 확인 해주세요');
          setPwdMatch(false);
        });
    }
  };

  const checkPasswordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputVerifyPwd(event.target.value);
  };

  const checkPasswordOnBlurHandler = () => {
    if (inputVerifyPwd === '') {
      setPwdConfirmMessage('필수 입력 사항입니다');
    }
  };

  const checkPasswordEnterHandler = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Enter') {
      verifyPwdHandler();
    }
  };

  return (
    <VerifyPasswordContainer>
      <div>
        <h3>비밀번호 확인</h3>
      </div>
      <div>
        <input
          type="password"
          placeholder="password"
          onChange={checkPasswordHandler}
          onBlur={checkPasswordOnBlurHandler}
          onKeyUp={checkPasswordEnterHandler}
        />
        {pwdMatch ? (
          <span>
            <br />
          </span>
        ) : (
          <span>{pwdConfirmMessage}</span>
        )}
      </div>
      <div>
        <button type="submit" onClick={verifyPwdHandler}>
          확인
        </button>
      </div>
    </VerifyPasswordContainer>
  );
};
export default VerifyPassword;
