import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';
import { useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { IsSigninState } from 'States/IsLoginState';
import { useEffect, useState } from 'react';
import instance from 'util/axios';
import { OrderAddress } from 'components/Order/OrderAddress';
import { OrderPay } from 'components/Order/OrderPay';
import { OrderUser } from 'components/Order/OrderUser';
import { OrderProduct } from 'components/Order/OrderProduct';
import { OrderRequestInfo } from 'components/Order/OrderRequestInfo';
import {
  OrderDeliver,
  OrdererUserInfo,
  OrderDelierDetail,
  OrderPrice,
  OrderProducts,
} from 'util/type';
import { OrderLoading } from './Loading';
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

  // OrderPage Loading State
  const [isLoading, setIsLoading] = useState(true);

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

  const [isLogin, setIsLogin] = useRecoilState(IsSigninState);
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
        setIsLoading(false);
      })
      .catch(() => {
        window.location.assign('/error');
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
          shippingPrice: 10000,
          totalPrice: price - 10000,
        });
      })
      .catch((err) => {
        if (err.response.status === 401 && isLogin) {
          alert('로그인이 만료되었습니다. 다시 로그인해주세요.');
          localStorage.removeItem('lumiereUserInfo');
          setIsLogin(false);
          window.location.assign('/signin');
        } else window.location.assign('/error');
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

  return (
    <OrderContainer>
      <Header />
      <TitleWrap>
        <Title>결제</Title>
      </TitleWrap>
      {isLoading ? (
        <OrderLoading />
      ) : (
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
            <OrderPay
              shippingState={shippingState}
              ordererInfoState={ordererInfoState}
              deliveryReqState={deliveryReqState}
              priceState={priceState}
              productState={productState}
              orderProduct={orderProduct}
            />
          </ContentRight>
        </ContentWrap>
      )}
      <Footer />
    </OrderContainer>
  );
};
export default Order;
