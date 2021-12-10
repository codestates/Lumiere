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

type orderDeliverProps = {
  deliverInfo: {
    deliver: {
      address: string;
      receiver: string;
      request: string;
    };
  };
  setDeliverInfo: (data: OrderDeliver) => void;
};

export const OrderAddress = ({
  deliverInfo,
  setDeliverInfo,
}: orderDeliverProps) => {
  // 주소 모달 on / off
  const [isAddModal, setIsAddModal] = useState(false);
  const clickModalHandler = () => {
    setIsAddModal(!isAddModal);
  };

  return (
    <OrderContentContainer>
      {isAddModal && (
        <AddressModal
          clickModalHandler={clickModalHandler}
          setDeliverInfo={setDeliverInfo}
          deliverInfo={deliverInfo}
        />
      )}
      <Title>배송지</Title>
      <FindAddressBtn type="button" onClick={clickModalHandler}>
        주소찾기
      </FindAddressBtn>
      <AllContentWrap>
        <AddressContent>
          {deliverInfo.deliver.address ? (
            deliverInfo.deliver.address
          ) : (
            <span>주소를 입력해주세요</span>
          )}
        </AddressContent>
        <OrderUserInfo>
          <label htmlFor="order-user">
            <input
              type="text"
              id="oder-user"
              placeholder="상세 주소를 입력해주세요"
            />
          </label>
        </OrderUserInfo>
        <br />
        <OrderUserInfo>
          <label htmlFor="order-user">
            <input
              type="text"
              id="oder-user"
              placeholder="주문자 정보를 입력해주세요"
            />
          </label>
        </OrderUserInfo>
      </AllContentWrap>
    </OrderContentContainer>
  );
};
