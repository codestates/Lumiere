import React, { useState } from 'react';
import { OrderDeliver } from 'util/type';
import AddressModal from 'components/Modal/AddressModal';
import {
  OrderContentContainer,
  Title,
  FindAddressBtn,
  AllContentWrap,
  AddressContent,
  OrderUserInfo,
} from './styled';

type OrderAddressProps = {
  shippingState: {
    address: string;
    detailedAddress: string;
    receiver: string;
    contactNum: string;
  };
  setShippingState: (data: OrderDeliver) => void;
};

export const OrderAddress = ({
  shippingState,
  setShippingState,
}: OrderAddressProps) => {
  // 주소 모달 on / off
  const [isAddModal, setIsAddModal] = useState(false);
  const clickModalHandler = () => {
    setIsAddModal(!isAddModal);
  };

  // 배송지 변경 핸들러
  const shippingChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id } = e.target;
    if (id === 'shipping-detail-address') {
      setShippingState({ ...shippingState, detailedAddress: e.target.value });
    }

    if (id === 'shipping-user') {
      setShippingState({ ...shippingState, receiver: e.target.value });
    }

    if (id === 'shipping-user-phone') {
      setShippingState({ ...shippingState, contactNum: e.target.value });
    }
  };

  return (
    <OrderContentContainer>
      {isAddModal && (
        <AddressModal
          clickModalHandler={clickModalHandler}
          shippingState={shippingState}
          setShippingState={setShippingState}
        />
      )}
      <Title>배송지</Title>
      <FindAddressBtn type="button" onClick={clickModalHandler}>
        주소찾기
      </FindAddressBtn>
      <AllContentWrap>
        <AddressContent onClick={clickModalHandler}>
          {shippingState.address ? (
            shippingState.address
          ) : (
            <span>주소를 입력해주세요</span>
          )}
        </AddressContent>
        <OrderUserInfo>
          <label htmlFor="shipping-detail-address">
            <input
              type="text"
              id="shipping-detail-address"
              placeholder="상세 주소를 입력해주세요"
              value={shippingState.detailedAddress}
              onChange={shippingChangeHandler}
            />
          </label>
        </OrderUserInfo>
        <br />
        <OrderUserInfo>
          <label htmlFor="shipping-user">
            <input
              type="text"
              id="shipping-user"
              placeholder="받는사람을 입력해주세요"
              value={shippingState.receiver}
              onChange={shippingChangeHandler}
            />
          </label>
        </OrderUserInfo>
        <br />
        <OrderUserInfo>
          <label htmlFor="shipping-user-phone">
            <input
              type="text"
              id="shipping-user-phone"
              placeholder="연락처를 적어주세요"
              value={shippingState.contactNum}
              onChange={shippingChangeHandler}
            />
          </label>
        </OrderUserInfo>
      </AllContentWrap>
    </OrderContentContainer>
  );
};
