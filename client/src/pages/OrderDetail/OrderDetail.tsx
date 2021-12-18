import Header from 'components/Header/Header';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import OrderDetailContent from 'components/OrderDetail/OrderDetailContent';
import {
  OrderDetailContainer,
  OrderDetailWrap,
  TitleWrap,
  ContentContainer,
} from './styled';

const OrderDetail = () => {
  const location = useLocation();
  const orderDetailId = location.state.id;
  const [isLoading, setIsLoading] = useState(true);

  return (
    <OrderDetailContainer>
      <Header />
      <OrderDetailWrap>
        <TitleWrap>
          <h1>주문내역 상세</h1>
        </TitleWrap>
        <ContentContainer>
          <OrderDetailContent
            orderDetailId={orderDetailId}
            setIsLoading={setIsLoading}
            isLoading={isLoading}
          />
        </ContentContainer>
      </OrderDetailWrap>
    </OrderDetailContainer>
  );
};
export default OrderDetail;
