import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';
import { OrderAddress } from 'components/Order/OrderAddress';
import { OrderPay } from 'components/Order/OrderPay';
import { OrderUser } from 'components/Order/OrderUser';
import { OrderProduct } from 'components/Order/OrderProduct';
import { OrderRequestInfo } from 'components/Order/OrderRequestInfo';
import {
  OrderContainer,
  TitleWrap,
  Title,
  ContentWrap,
  ContentLeft,
  ContentRight,
} from './styled';

const Order = () => {
  return (
    <OrderContainer>
      <Header />
      <TitleWrap>
        <Title>결제</Title>
      </TitleWrap>
      <ContentWrap>
        <ContentLeft>
          <OrderAddress />
          <OrderUser />
          <OrderRequestInfo />
          <OrderProduct />
        </ContentLeft>
        <ContentRight>
          <OrderPay />
        </ContentRight>
      </ContentWrap>
      <Footer />
    </OrderContainer>
  );
};
export default Order;
