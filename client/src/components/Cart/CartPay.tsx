import { TiEquals, TiPlus } from 'react-icons/ti';
import {
  CartPayWrap,
  CartPayContentWrap,
  CartPayCountWrap,
  CartPayDescriptionWrap,
  CartPayClickBtn,
} from './styled';

export const CartPay = () => {
  return (
    <CartPayWrap>
      <CartPayContentWrap>
        <CartPayCountWrap>
          <CartPayDescriptionWrap>
            <dt>총 상품 금액</dt>
            <dd>80,000원</dd>
          </CartPayDescriptionWrap>
          <TiPlus />
          <CartPayDescriptionWrap>
            <dt>배송비</dt>
            <dd>10,000원</dd>
          </CartPayDescriptionWrap>
          <TiEquals />
          <CartPayDescriptionWrap>
            <dt>결제예정금액</dt>
            <dd>90,000원</dd>
          </CartPayDescriptionWrap>
        </CartPayCountWrap>
        <CartPayClickBtn type="button">주문하기</CartPayClickBtn>
      </CartPayContentWrap>
    </CartPayWrap>
  );
};
