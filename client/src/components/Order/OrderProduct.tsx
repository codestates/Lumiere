import {
  OrderContentContainer,
  Title,
  ProductContentWrap,
  ImgWrap,
  ProductDlWrap,
} from './styled';

export const OrderProduct = () => {
  return (
    <OrderContentContainer>
      <Title>주문작품</Title>
      <ProductContentWrap>
        <ImgWrap>
          <img src="#" alt="주문작품" />
        </ImgWrap>
        <ProductDlWrap>
          <dt>2013-5</dt>
          <dd>주단태</dd>
          <dd>52x73cm(20호)</dd>
          <dd>80,000원</dd>
        </ProductDlWrap>
      </ProductContentWrap>
    </OrderContentContainer>
  );
};
