import { useNavigate } from 'react-router';
import { SignInTitleWrap, SignInSub, MoveSignUpBtn } from './styled';

const SignInTitle = () => {
  const history = useNavigate();
  const moveSignUpHandler = () => {
    history('/signup');
  };

  return (
    <SignInTitleWrap>
      <SignInSub>로그인</SignInSub>
      <span>
        아직 회원이 아니신가요?
        <MoveSignUpBtn type="button" onClick={moveSignUpHandler}>
          회원가입 하기
        </MoveSignUpBtn>
      </span>
    </SignInTitleWrap>
  );
};

export default SignInTitle;
