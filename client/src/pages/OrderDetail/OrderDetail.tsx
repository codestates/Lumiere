import Header from 'components/Header/Header';
import { useLocation } from 'react-router-dom';
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

  return (
    <OrderDetailContainer>
      <Header />
      <OrderDetailWrap>
        <TitleWrap>
          <h1>주문내역 상세</h1>
        </TitleWrap>
        <ContentContainer>
          <OrderDetailContent orderDetailId={orderDetailId} />
        </ContentContainer>
      </OrderDetailWrap>
    </OrderDetailContainer>
  );
};
export default OrderDetail;
