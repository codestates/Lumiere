import { VscPass } from 'react-icons/vsc';
import { CartMenuWrap, AllSelectBtnWrap, SelectBtnWrap } from './styled';

export const CartMenu = () => {
  return (
    <CartMenuWrap>
      <AllSelectBtnWrap>
        <button type="button">
          <div>
            <VscPass />
          </div>
          전체선택
        </button>
      </AllSelectBtnWrap>
      <SelectBtnWrap>
        <button type="button">품절상품삭제</button>
        <button type="button">선택상품삭제</button>
      </SelectBtnWrap>
    </CartMenuWrap>
  );
};
