import Footer from 'components/Footer/Footer';
import { useLocation } from 'react-router-dom';
import Header from 'components/Header/Header';
import { useEffect, useState } from 'react';
import {
  OrderDeliver,
  OrdererUserInfo,
  OrderDelierDetail,
  OrderPrice,
  OrderProducts,
} from 'util/type';
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
  // Cart에서 histtory로 받아온값
  const location = useLocation();
  const orderProduct: string[] = location.state.id || [];

  const localInfo = localStorage.getItem('lumiereUserInfo');
  const userName = JSON.parse(localInfo || '{}').name;

  // 배송지 State
  const [shippingState, setShippingState] = useState<OrderDeliver>({
    address: '',
    detailedAddress: '',
    receiver: '',
    contactNum: '',
  });
  // 주문자 정보State
  const [ordererInfoState, setOrdererInfoState] = useState<OrdererUserInfo>({
    name: userName || '',
    phoneNum: '',
    email: '',
    refundTerms: '',
  });

  // 주문 요청사항 State
  const [deliveryReqState, setDeliveryReqState] = useState<OrderDelierDetail>({
    receiveAt: '문 앞에 놓아주세요.',
    requestedTerms: '',
  });

  // 가격 State
  const [priceState, setPriceState] = useState<OrderPrice>({
    shippingPrice: 0,
    totalPrice: 0,
  });

  // 주문 작품 State
  const [productState, setProductState] = useState<Array<OrderProducts>>([
    {
      artist: {
        _id: '',
        name: '',
      },
      image: '',
      inStock: true,
      info: {
        size: '',
        canvas: 0,
      },
      price: 0,
      title: '',
      _id: '',
    },
  ]);

  const [clientPrice, setClientPrice] = useState(0);

  // 최초 렌더링시 주문이력 여부 확인
  useEffect(() => {
    instance
      .get('/orders/latest')
      .then((res) => {
        // 주문이력 O
        const { name, email, phoneNum, refundTerms } = res.data.ordererInfo;
        const { address, detailedAddress, receiver, contactNum } =
          res.data.deliveryInfo;
        const { receiveAt, requestedTerms } = res.data.deliveryDetails;
        setOrdererInfoState({ name, email, phoneNum, refundTerms });
        setShippingState({ address, detailedAddress, receiver, contactNum });
        setDeliveryReqState({ receiveAt, requestedTerms });
      })
      .catch(() => {
        // 주문이력 X
      });
  }, []);

  // 주문 가격 확인
  useEffect(() => {
    instance
      .get('/products/total-price', { params: { productId: orderProduct } })
      .then((res) => {
        const price = res.data.totalPrice;
        setPriceState({
          ...priceState,
          shippingPrice: price,
          totalPrice: price + 10000,
        });
      })
      .catch(() => {
        // 주문 가격 에러
      });
  }, []);

  // 구입예정 제품 정보 확인
  useEffect(() => {
    instance
      .get('/products/cart-items', { params: { productId: orderProduct } })
      .then((res) => {
        setProductState(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // 클라이언트에서 계산한 결졔 예정 금액
  useEffect(() => {
    setClientPrice(
      productState.reduce((acc, cur) => {
        return acc + cur.price;
      }, 0),
    );
  }, [productState]);

  return (
    <OrderContainer>
      <Header />
      <TitleWrap>
        <Title>결제</Title>
      </TitleWrap>
      <ContentWrap>
        <ContentLeft>
          <OrderAddress
            shippingState={shippingState}
            setShippingState={setShippingState}
          />
          <OrderUser
            ordererInfoState={ordererInfoState}
            setOrdererInfoState={setOrdererInfoState}
          />
          <OrderRequestInfo
            deliveryReqState={deliveryReqState}
            setDeliveryReqState={setDeliveryReqState}
          />
          <OrderProduct
            productState={productState}
            setProductState={setProductState}
          />
        </ContentLeft>
        <ContentRight>
          <OrderPay priceState={priceState} clientPrice={clientPrice} />
        </ContentRight>
      </ContentWrap>
      <Footer />
    </OrderContainer>
  );
};
export default Order;
