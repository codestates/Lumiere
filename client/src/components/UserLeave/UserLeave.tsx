import { useState } from 'react';
import instance from 'util/axios';
import { useRecoilState } from 'recoil';
import { IsSigninState } from 'States/IsLoginState';
import { IsDisableBtnState } from 'States/IsDisableBtnState';
import { UserLeaveContainer } from './styled';

const confirmText = '내용을 확인했습니다';

const UserLeave = () => {
  const [isLogin, setIsLogin] = useRecoilState(IsSigninState);
  const [inputConfirmText, setInputConfirmText] = useState('');
  const [validConfirmMessage, setValidConfirmMessage] = useState('');
  const [confirmTextMatch, setConfirmTextMatch] = useState(false);
  const [isDisableBtn, setIsDisableBtn] = useRecoilState(IsDisableBtnState);

  const userLeaveHandler = () => {
    if (isDisableBtn) {
      return;
    }

    if (inputConfirmText === '') {
      setValidConfirmMessage('문구를 입력해주세요');
    } else if (inputConfirmText && confirmTextMatch) {
      setIsDisableBtn(true);
      // axios요청
      instance
        .delete('/users/profile', { params: { userId: inputConfirmText } })
        .then(() => {
          alert('탈퇴되었습니다. 저희 Lumiere를 이용해주셔서 감사합니다.');
          setInputConfirmText('');
          setValidConfirmMessage('');
          setConfirmTextMatch(false);
          localStorage.removeItem('cartItems');
          localStorage.removeItem('lumiereUserInfo');
          setIsLogin(false);
          window.location.replace('/');
        })
        .catch(() => {
          window.location.assign('/error');
        });
    }
  };

  const confirmTextOnBlurHandler = () => {
    // 탈퇴문구 입력 Input OnBlur
    if (inputConfirmText === '') {
      setConfirmTextMatch(false);
      setValidConfirmMessage('문구를 입력해주세요');
    } else if (inputConfirmText !== confirmText) {
      setConfirmTextMatch(false);
      setValidConfirmMessage('문구를 정확히 입력해주세요');
    } else {
      setConfirmTextMatch(true);
      setValidConfirmMessage('일치합니다');
    }
  };

  const confirmTextInputHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setInputConfirmText(event.target.value);
  };

  return (
    <UserLeaveContainer>
      <div>
        <h3>회원 탈퇴</h3>
        <span>정말 탈퇴를 원하신다면 아래의 문구를 정확히 입력해주세요</span>
      </div>
      <div>
        <span>{confirmText}</span>
        <input
          type="text"
          placeholder={confirmText}
          value={inputConfirmText}
          onChange={confirmTextInputHandler}
          onBlur={confirmTextOnBlurHandler}
          className={confirmTextMatch ? 'valid_pass' : ''}
        />
        {validConfirmMessage ? (
          <span>{validConfirmMessage}</span>
        ) : (
          <span>
            <br />
          </span>
        )}
      </div>
      <div>
        <button type="submit" onClick={userLeaveHandler}>
          확인
        </button>
      </div>
    </UserLeaveContainer>
  );
};
export default UserLeave;
