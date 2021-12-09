import {
  OrderContentContainer,
  Title,
  FindAddressBtn,
  AllContentWrap,
  AddressContent,
  OrderUserInfo,
} from './styled';

export const OrderAddress = () => {
  return (
    <OrderContentContainer>
      <Title>배송지</Title>
      <FindAddressBtn type="button">주소찾기</FindAddressBtn>
      <AllContentWrap>
        <AddressContent>
          [18030] 서울특별시 서초구 서초대로 396, 강남빌딩 20층 (스파크플러스
          강남2호점)
        </AddressContent>
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
