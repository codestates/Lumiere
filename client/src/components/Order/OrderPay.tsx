import {
  OrderContentContainer,
  ContentWrap,
  CountWrap,
  DescriptionWrap,
  ClickBtn,
  PayTitle,
  ClickBtnSpan,
} from './styled';

export const OrderPay = () => {
  return (
    <OrderContentContainer>
      <ContentWrap>
        <PayTitle>결제 예정금액</PayTitle>
        <CountWrap>
          <DescriptionWrap>
            <dt>주문금액</dt>
            <dd>80,000원</dd>
          </DescriptionWrap>
          <DescriptionWrap>
            <dt>배송비</dt>
            <dd>10,000원</dd>
          </DescriptionWrap>
          <DescriptionWrap>
            <dt>총 결제 예정금액</dt>
            <dd>90,000원</dd>
          </DescriptionWrap>
        </CountWrap>
        <ClickBtn type="button">
          <ClickBtnSpan>90,000원</ClickBtnSpan>결제하기
        </ClickBtn>
      </ContentWrap>
    </OrderContentContainer>
  );
};
