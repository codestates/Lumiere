import {
  OrderContentContainer,
  Title,
  AllContentWrap,
  LabelWrap,
} from './styled';

export const OrderUser = () => {
  return (
    <OrderContentContainer>
      <Title>주문자 정보</Title>
      <AllContentWrap>
        <form>
          <LabelWrap>
            주문자명
            <label htmlFor="order-user">
              <input type="text" id="order-user" required />
            </label>
          </LabelWrap>
          <LabelWrap>
            연락처
            <label htmlFor="order-user-phone">
              <input type="text" id="order-user-phone" required />
            </label>
          </LabelWrap>
          <LabelWrap>
            이메일
            <label htmlFor="order-user-email">
              <input type="text" id="order-user-email" required />
            </label>
          </LabelWrap>
          <LabelWrap>
            품절 시 환불
            <label htmlFor="order-soldout">
              <input type="text" id="order-soldout" />
            </label>
          </LabelWrap>
        </form>
      </AllContentWrap>
    </OrderContentContainer>
  );
};
