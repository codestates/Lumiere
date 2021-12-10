import { useComma } from 'util/functions';
import {
  OrderContentContainer,
  ContentWrap,
  CountWrap,
  DescriptionWrap,
  ClickBtn,
  PayTitle,
  ClickBtnSpan,
} from './styled';

type PriceProps = {
  priceState: {
    shippingPrice: number;
    totalPrice: number;
  };
  clientPrice: number;
};

export const OrderPay = ({ priceState, clientPrice }: PriceProps) => {
  return (
    <OrderContentContainer>
      <ContentWrap>
        <PayTitle>결제 예정금액 {clientPrice}</PayTitle>
        <CountWrap>
          <DescriptionWrap>
            <dt>주문금액</dt>
            <dd>{`${useComma(priceState.shippingPrice)} 원`}</dd>
          </DescriptionWrap>
          <DescriptionWrap>
            <dt>배송비</dt>
            <dd>10,000 원</dd>
          </DescriptionWrap>
          <DescriptionWrap>
            <dt>총 결제 예정금액</dt>
            <dd>{`${useComma(priceState.totalPrice)} 원`}</dd>
          </DescriptionWrap>
        </CountWrap>
        <ClickBtn type="button">
          <ClickBtnSpan>90,000원</ClickBtnSpan>결제하기
        </ClickBtn>
      </ContentWrap>
    </OrderContentContainer>
  );
};
