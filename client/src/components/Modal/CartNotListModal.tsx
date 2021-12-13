import { useNavigate } from 'react-router-dom';
import {
  ModalBackdrop,
  ModalWrap,
  ContentWrap,
  GuideImgBox,
  ButtonBox,
  SelectButton,
} from './styled';

type Props = {
  clickModalHandler: () => void;
};

const CartNotListModal = ({ clickModalHandler }: Props) => {
  const history = useNavigate();

  const backMovingHanlder = () => {
    history('/');
  };

  return (
    <ModalBackdrop onClick={clickModalHandler}>
      <ModalWrap onClick={(e) => e.stopPropagation()}>
        <ContentWrap>
          <GuideImgBox>
            <img src="/images/login_guide.png" alt="로그인 안내 이미지" />
          </GuideImgBox>
          <p>아트 쇼핑백이 비어있습니다</p>
        </ContentWrap>
        <ButtonBox>
          <SelectButton onClick={backMovingHanlder}>메인으로 가기</SelectButton>
        </ButtonBox>
      </ModalWrap>
    </ModalBackdrop>
  );
};
export default CartNotListModal;
