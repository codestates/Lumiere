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

const CartSoldOutModal = ({ clickModalHandler }: Props) => {
  return (
    <ModalBackdrop onClick={clickModalHandler}>
      <ModalWrap onClick={(e) => e.stopPropagation()}>
        <ContentWrap>
          <GuideImgBox>
            <img src="/images/login_guide.png" alt="품절상품 안내 이미지" />
          </GuideImgBox>
          <p>품절상품 삭제 혹은 구입하실 상품을 선택해 주세요</p>
        </ContentWrap>
        <ButtonBox>
          <SelectButton onClick={clickModalHandler}>닫기 </SelectButton>
        </ButtonBox>
      </ModalWrap>
    </ModalBackdrop>
  );
};
export default CartSoldOutModal;
