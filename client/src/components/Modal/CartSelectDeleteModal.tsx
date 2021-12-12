import { IoMdClose } from 'react-icons/io';
import {
  ModalBackdrop,
  ModalWrap,
  CloseBtn,
  ContentWrap,
  ButtonBox,
  SelectButton,
} from './styled';

type Props = {
  clickModalHandler: () => void;
  selectDeleteHandler: () => void;
};

const CartSelectDeleteModal = ({
  clickModalHandler,
  selectDeleteHandler,
}: Props) => {
  return (
    <ModalBackdrop onClick={clickModalHandler}>
      <ModalWrap onClick={(e) => e.stopPropagation()}>
        <CloseBtn onClick={clickModalHandler}>
          <IoMdClose />
        </CloseBtn>
        <ContentWrap>
          <p>아트 쇼핑백에서 삭제 하시겠습니까?</p>
        </ContentWrap>
        <ButtonBox>
          <SelectButton onClick={selectDeleteHandler}>삭제</SelectButton>
          <SelectButton onClick={clickModalHandler}>취소</SelectButton>
        </ButtonBox>
      </ModalWrap>
    </ModalBackdrop>
  );
};
export default CartSelectDeleteModal;
