import React from 'react';
import { OrdererUserInfo } from 'util/type';
import {
  OrderContentContainer,
  Title,
  AllContentWrap,
  LabelWrap,
} from './styled';

type UserProps = {
  ordererInfoState: {
    name: string;
    phoneNum: string;
    email: string;
    refundTerms: string;
  };
  setOrdererInfoState: (data: OrdererUserInfo) => void;
};

export const OrderUser = ({
  ordererInfoState,
  setOrdererInfoState,
}: UserProps) => {
  // 주문자 정보 변경 핸들러
  const oerdererInfoChagneHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { id } = e.target;
    if (id === 'order-user') {
      setOrdererInfoState({ ...ordererInfoState, name: e.target.value });
    }

    if (id === 'order-user-phone') {
      setOrdererInfoState({ ...ordererInfoState, phoneNum: e.target.value });
    }

    if (id === 'order-user-email') {
      setOrdererInfoState({ ...ordererInfoState, email: e.target.value });
    }

    if (id === 'order-soldout') {
      setOrdererInfoState({ ...ordererInfoState, refundTerms: e.target.value });
    }
  };
  return (
    <OrderContentContainer>
      <Title>주문자 정보</Title>
      <AllContentWrap>
        <form>
          <LabelWrap>
            주문자명
            <label htmlFor="order-user">
              <input
                type="text"
                id="order-user"
                value={ordererInfoState.name}
                onChange={oerdererInfoChagneHandler}
                required
              />
            </label>
          </LabelWrap>
          <LabelWrap>
            연락처
            <label htmlFor="order-user-phone">
              <input
                type="text"
                id="order-user-phone"
                value={ordererInfoState.phoneNum}
                onChange={oerdererInfoChagneHandler}
                required
              />
            </label>
          </LabelWrap>
          <LabelWrap>
            이메일
            <label htmlFor="order-user-email">
              <input
                type="text"
                id="order-user-email"
                value={ordererInfoState.email}
                onChange={oerdererInfoChagneHandler}
                required
              />
            </label>
          </LabelWrap>
          <LabelWrap>
            품절 시 환불
            <label htmlFor="order-soldout">
              <input
                type="text"
                id="order-soldout"
                value={ordererInfoState.refundTerms}
                onChange={oerdererInfoChagneHandler}
                required
              />
            </label>
          </LabelWrap>
        </form>
      </AllContentWrap>
    </OrderContentContainer>
  );
};
