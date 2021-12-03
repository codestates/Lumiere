import { useNavigate } from 'react-router';
import { SignUpTitleWrap, SignUpSub, MoveSignInBtn } from './styled';

const SignUpTitle = () => {
  const history = useNavigate();
  const moveSignInHandler = () => {
    history('/signin');
  };

  return (
    <SignUpTitleWrap>
      <SignUpSub>회원가입</SignUpSub>
      <span>
        이미 회원이신가요?
        <MoveSignInBtn type="button" onClick={moveSignInHandler}>
          로그인하기
        </MoveSignInBtn>
      </span>
    </SignUpTitleWrap>
  );
};

export default SignUpTitle;
