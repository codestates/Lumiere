import { Link } from 'react-router-dom';
import { IoMdClose } from 'react-icons/io';
import {
  ModalBackdrop,
  ModalWrap,
  CloseBtn,
  ContentWrap,
  GuideImgBox,
  ButtonBox,
  PrimaryButton,
} from './styled';

type Props = {
  clickModalHandler: () => void;
};

const LoginGuideModal = ({ clickModalHandler }: Props) => {
  return (
    <ModalBackdrop onClick={clickModalHandler}>
      <ModalWrap onClick={(e) => e.stopPropagation()}>
        <CloseBtn onClick={clickModalHandler}>
          <IoMdClose />
        </CloseBtn>
        <ContentWrap>
          <GuideImgBox>
            <img src="/images/login_guide.png" alt="로그인 안내 이미지" />
          </GuideImgBox>
          <p>해당 서비스는 로그인이 필요합니다.</p>
        </ContentWrap>
        <ButtonBox>
          <PrimaryButton>
            <Link to="/signin" onClick={clickModalHandler}>
              로그인하기
            </Link>
          </PrimaryButton>
        </ButtonBox>
      </ModalWrap>
    </ModalBackdrop>
  );
};
export default LoginGuideModal;
