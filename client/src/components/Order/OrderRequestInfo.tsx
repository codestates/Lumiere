import {
  OrderContentContainer,
  Title,
  AllContentWrap,
  LabelWrap,
} from './styled';

export const OrderRequestInfo = () => {
  return (
    <OrderContentContainer>
      <Title>배송 요청사항</Title>
      <AllContentWrap>
        <form>
          <LabelWrap>
            수령위치
            <label htmlFor="request-address">
              <input type="text" id="request-address" />
            </label>
          </LabelWrap>
          <LabelWrap>
            배송 요청 사항
            <label htmlFor="order-request">
              <input type="text" id="order-request" />
            </label>
          </LabelWrap>
        </form>
      </AllContentWrap>
    </OrderContentContainer>
  );
};
