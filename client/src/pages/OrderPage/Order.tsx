import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';
import { useEffect, useState } from 'react';
import { OrderDeliver, OrdererUserInfo, OrderPrice } from 'util/type';
import instance from 'util/axios';
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
  const [deliverInfo, setDeliverInfo] = useState<OrderDeliver>({
    deliver: {
      address: '',
      receiver: '',
      request: '',
    },
  });

  // const localInfo = localStorage.getItem('lumiereUserInfo');
  // const userName = JSON.parse(localInfo || '{}').name;

  // 최초 렌더링시 주문이력 여부 확인
  useEffect(() => {
    instance
      .get('/orders/latest')
      .then((res) => {
        // 주문이력 O
        const { address, receiver, request } = res.data.deliver;
        setDeliverInfo({ deliver: { address, receiver, request } });
      })
      .catch(() => {
        // 주문이력 X
        setDeliverInfo(deliverInfo);
      });
  }, []);

  return (
    <OrderContainer>
      <Header />
      <TitleWrap>
        <Title>결제</Title>
      </TitleWrap>
      <ContentWrap>
        <ContentLeft>
          <OrderAddress
            deliverInfo={deliverInfo}
            setDeliverInfo={setDeliverInfo}
          />
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
