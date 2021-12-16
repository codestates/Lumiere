import { useState, useEffect } from 'react';
import instance from 'util/axios';
import { passwordValidate } from 'util/validate';
import { ChangePasswordContainer } from './styled';

interface Props {
  oldPwd: string;
}

const ChangePassword = ({ oldPwd }: Props) => {
  const [inputNewPwd, setInputNewPwd] = useState('');
  const [inputNewPwdCheck, setInputNewPwdCheck] = useState('');
  const [editValidateState, setEditValidateState] = useState({
    password: false,
    passwordCheck: false,
  });
  const [pwdConfirmMessage, setPwdConfirmMessage] = useState('');
  const [pwdCheckConfirmMessage, setPwdCheckConfirmMessage] = useState('');
  const [pwdValidText, setPwdValidText] = useState('');
  const [pwdCheckValidText, setPwdCheckValidText] = useState('');
  const [pwdCheckMatch, setPwdCheckMatch] = useState(false);
  const [isSpanColor, setIsSpanColor] = useState({
    password: false,
    passwordCheck: false,
  });

  useEffect(() => {
    if (editValidateState.password && editValidateState.passwordCheck) {
      setPwdCheckMatch(true);
    } else {
      setPwdCheckMatch(false);
    }
  }, [editValidateState]);

  useEffect(() => {
    // 비밀번호
    if (!editValidateState.password && pwdValidText === 'same') {
      setPwdConfirmMessage('기존과 동일한 비밀번호 입니다');
    } else if (editValidateState.password && pwdValidText === 'ok') {
      setPwdConfirmMessage('사용 가능한 비밀번호 입니다');
    } else if (!editValidateState.password && pwdValidText === 'nothing') {
      setPwdConfirmMessage('변경하실 비밀번호를 적어주세요');
    } else if (!editValidateState.password && pwdValidText === 'invalidate') {
      setPwdConfirmMessage('8~20자의 영문&숫자 조합만 사용 가능합니다');
    }

    // 비밀번호 확인
    if (editValidateState.passwordCheck && pwdCheckValidText === 'ok') {
      setPwdCheckConfirmMessage('비밀번호 일치');
    } else if (
      !editValidateState.passwordCheck &&
      pwdCheckValidText === 'nothing'
    ) {
      setPwdCheckConfirmMessage('비밀번호 변경 시 필수 입력 사항입니다');
    } else if (
      !editValidateState.passwordCheck &&
      pwdCheckValidText === 'invalidate'
    ) {
      setPwdCheckConfirmMessage('비밀번호가 일치하지 않습니다');
    }
  }, [pwdValidText, pwdCheckValidText]);

  const pwdEditHandler = () => {
    if (inputNewPwd === '') {
      setPwdCheckValidText('nothing');
    } else if (
      editValidateState.password &&
      editValidateState.passwordCheck &&
      pwdCheckMatch
    ) {
      // axios요청
      instance
        .patch('/users/profile', { password: inputNewPwd })
        .then((res) => {
          alert('비밀번호가 변경되었습니다');
          setInputNewPwd('');
          setInputNewPwdCheck('');
        })
        .catch((err) => {
          window.location.assign('/error');
        });
      setPwdCheckMatch(false);
    }
  };

  const newPwdOnBlurHandler = () => {
    // password OnBlur
    if (inputNewPwd === oldPwd) {
      setEditValidateState({ ...editValidateState, password: false });
      setIsSpanColor({ ...isSpanColor, password: false });
      setPwdValidText('same');
    } else if (inputNewPwd === '') {
      setEditValidateState({ ...editValidateState, password: false });
      setIsSpanColor({ ...isSpanColor, password: false });
      setPwdValidText('nothing');
    } else if (!passwordValidate(inputNewPwd)) {
      setEditValidateState({ ...editValidateState, password: false });
      setIsSpanColor({ ...isSpanColor, password: false });
      setPwdValidText('invalidate');
    } else if (passwordValidate(inputNewPwd)) {
      setEditValidateState({ ...editValidateState, password: true });
      setIsSpanColor({ ...isSpanColor, password: true });
      setPwdValidText('ok');
    }
    setPwdCheckMatch(false);
  };

  const newPwdCheckOnBlurHandler = () => {
    // password Check OnBlur
    if (inputNewPwdCheck === '') {
      setEditValidateState({ ...editValidateState, passwordCheck: false });
      setIsSpanColor({ ...isSpanColor, passwordCheck: false });
      setPwdCheckValidText('nothing');
      setPwdCheckMatch(true);
    } else if (inputNewPwdCheck !== '' && inputNewPwd !== inputNewPwdCheck) {
      setEditValidateState({ ...editValidateState, passwordCheck: false });
      setIsSpanColor({ ...isSpanColor, passwordCheck: false });
      setPwdCheckValidText('invalidate');
      setPwdCheckMatch(true);
    } else if (inputNewPwdCheck !== '' && inputNewPwd === inputNewPwdCheck) {
      setEditValidateState({ ...editValidateState, passwordCheck: true });
      setIsSpanColor({ ...isSpanColor, passwordCheck: true });
      setPwdCheckValidText('ok');
      setPwdCheckMatch(true);
    }
  };

  const newPwdInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputNewPwd(event.target.value);
  };

  const newPwdCheckInputHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setInputNewPwdCheck(event.target.value);
  };

  return (
    <ChangePasswordContainer>
      <div>
        <h3>비밀번호 변경</h3>
        <span>변경하실 비밀번호를 입력해주세요</span>
      </div>
      <div>
        <input
          type="password"
          placeholder="New Password"
          value={inputNewPwd}
          onChange={newPwdInputHandler}
          onBlur={newPwdOnBlurHandler}
          className={isSpanColor.password ? 'valid_pass' : ''}
        />
        {pwdConfirmMessage ? (
          <span>{pwdConfirmMessage}</span>
        ) : (
          <span>
            <br />
          </span>
        )}
        <input
          type="password"
          placeholder="Password Check"
          value={inputNewPwdCheck}
          onChange={newPwdCheckInputHandler}
          onBlur={newPwdCheckOnBlurHandler}
          className={isSpanColor.passwordCheck ? 'valid_pass' : ''}
        />
        {pwdCheckConfirmMessage ? (
          <span>{pwdCheckConfirmMessage}</span>
        ) : (
          <span>
            <br />
          </span>
        )}
      </div>
      <div>
        <button type="submit" onClick={pwdEditHandler}>
          수정
        </button>
      </div>
    </ChangePasswordContainer>
  );
};
export default ChangePassword;
