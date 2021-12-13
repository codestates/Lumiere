import React from 'react';
import { OrderDelierDetail } from 'util/type';
import {
  OrderContentContainer,
  Title,
  AllContentWrap,
  LabelWrap,
} from './styled';

type OrderReqProps = {
  deliveryReqState: OrderDelierDetail;
  setDeliveryReqState: (data: OrderDelierDetail) => void;
};

export const OrderRequestInfo = ({
  deliveryReqState,
  setDeliveryReqState,
}: OrderReqProps) => {
  // 배송 요청사항 변경 핸들러
  const deliveryReqChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id } = e.target;
    if (id === 'request-address') {
      setDeliveryReqState({ ...deliveryReqState, receiveAt: e.target.value });
    }
    if (id === 'order-request') {
      setDeliveryReqState({
        ...deliveryReqState,
        requestedTerms: e.target.value,
      });
    }
  };

  return (
    <OrderContentContainer>
      <Title>배송 요청사항</Title>
      <AllContentWrap>
        <form>
          <LabelWrap>
            수령위치
            <label htmlFor="request-address">
              <input
                type="text"
                id="request-address"
                value={deliveryReqState.receiveAt}
                onChange={deliveryReqChangeHandler}
              />
            </label>
          </LabelWrap>
          <LabelWrap>
            배송 요청 사항
            <label htmlFor="order-request">
              <input
                type="text"
                id="order-request"
                value={deliveryReqState.requestedTerms}
                onChange={deliveryReqChangeHandler}
              />
            </label>
          </LabelWrap>
        </form>
      </AllContentWrap>
    </OrderContentContainer>
  );
};
