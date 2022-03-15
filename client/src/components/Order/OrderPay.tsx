/* eslint-disable */
import { useState, useEffect } from 'react';
import { useComma, useName, useOrderNumber } from 'util/functions';
import { useRecoilState } from 'recoil';
import { IsDisableBtnState } from 'States/IsDisableBtnState';
import instance from 'util/axios';
import dotenv from 'dotenv';
import { useNavigate } from 'react-router-dom';
import {
  OrderDeliver,
  OrdererUserInfo,
  OrderDelierDetail,
  OrderPrice,
  OrderProducts,
  RequestPayParams,
  RequestPayResponse,
} from 'util/type';
import {
  OrderContentContainer,
  ContentWrap,
  CountWrap,
  DescriptionWrap,
  ClickBtn,
  PayTitle,
  ClickBtnSpan,
} from './styled';

type PriceProps = {
  priceState: OrderPrice;
  shippingState: OrderDeliver;
  ordererInfoState: OrdererUserInfo;
  deliveryReqState: OrderDelierDetail;
  productState: OrderProducts[];
  orderProduct: string[];
};

dotenv.config();

declare global {
  interface Window {
    IMP: any;
  }
}

export const OrderPay = ({
  priceState,
  shippingState,
  ordererInfoState,
  deliveryReqState,
  productState,
  orderProduct,
}: PriceProps) => {
  // input Validate State
  const [inputAllCheck, setInputAllCheck] = useState(false);
  const [isDisableBtn, setIsDisableBtn] = useRecoilState(IsDisableBtnState);
  const history = useNavigate();

  useEffect(() => {
    const { address, detailedAddress, receiver, contactNum } = shippingState;
    const { name, phoneNum, email, refundTerms } = ordererInfoState;
    const { receiveAt, requestedTerms } = deliveryReqState;

    if (
      address &&
      detailedAddress &&
      receiver &&
      contactNum &&
      name &&
      phoneNum &&
      email &&
      refundTerms &&
      receiveAt &&
      requestedTerms
    ) {
      setInputAllCheck(true);
    } else {
      setInputAllCheck(false);
    }
  }, [shippingState, ordererInfoState, deliveryReqState]);

  const OrderPaymentHandler = () => {
    if (isDisableBtn) {
      return;
    } else {
      setIsDisableBtn(true);
    }

    // input창 입력 status
    if (!inputAllCheck) {
      alert('배송지 주문자 정보, 배송 요청사항을 모두 입력해주세요');
      setIsDisableBtn(false);
      return;
    }

    // 품절여부 확인
    instance
      .get('/products/cart-items', { params: { productId: orderProduct } })
      .then((res) => {
        const newArr = res.data.filter((el: OrderProducts) => {
          return el.inStock;
        });
        if (newArr.length !== res.data.length) {
          // 품절 상품이 있는경우
          alert('품절 상품이 있습니다 품절상품 제외하고 다시 주문해주세요');
          window.history.back();
        } else {
          instance
            .get('/products/total-price', {
              params: { productId: orderProduct },
            })
            .then((res) => {
              if (
                res.data.totalPrice !==
                (priceState.totalPrice + priceState.shippingPrice) / 1000
              ) {
                alert('결제금액이 다릅니다.');
                return window.location.assign('/error');
              } else {
                // 임시 주문서 생성
                const orderItem = productState.map((el) => {
                  return {
                    product: el._id,
                    image: el.image,
                    title: el.title,
                    artist: el.artist.name,
                    size: `${el.info.size}(${el.info.canvas}호)`,
                    price: el.price,
                  };
                });
                instance
                  .post('/orders', {
                    orderItems: orderItem,
                    result: {
                      id: useOrderNumber(),
                    },
                    deliveryInfo: shippingState,
                    deliveryDetails: deliveryReqState,
                    ordererInfo: ordererInfoState,
                    shippingPrice: priceState.shippingPrice,
                    totalPrice:
                      (priceState.totalPrice + priceState.shippingPrice) / 1000,
                  })
                  .then((res) => {
                    // 임시주문서 order id
                    const orderid = res.data.orderId;
                    setIsDisableBtn(false);
                    handlePayment(orderid);
                  })
                  .catch((err) => {
                    // 임시 주문서 생성 실패
                    window.location.assign('/error');
                  });
              }
            });
        }
      })
      .catch(() => {
        window.location.assign('/error');
      });
  };

  // IAMPORT 핸들러
  const handlePayment = (orderid: string) => {
    // 가맹점 식별코드 이용하여 IMP객체 초기화
    setIsDisableBtn(false);
    const IMP = window.IMP; // 생략 가능
    IMP.init(process.env.REACT_APP_IMPORT);

    // 결제 금액
    const amount: number =
      (priceState.totalPrice + priceState.shippingPrice) / 1000;
    if (!amount) {
      alert('결제 금액을 확인해주세요');
      return;
    }

    // req 함수 data 설정
    const data: RequestPayParams = {
      pg: 'html5_inicis',
      pay_method: 'card',
      merchant_uid: orderid,
      name: useName(productState),
      amount: amount,
      buyer_name: ordererInfoState.name,
      buyer_tel: ordererInfoState.phoneNum,
      buyer_email: ordererInfoState.email,
      m_redirect_url: 'https://www.lumieregallery.site/',
      app_scheme: 'https://www.lumieregallery.site/',
    };

    const callback = (response: RequestPayResponse) => {
      const { success } = response;

      if (success) {
        // 아임포트 결제 성공했으니 서버에 주문 정보 전달
        if (
          (priceState.totalPrice + priceState.shippingPrice) / 1000 ===
          response.paid_amount
        ) {
          instance
            .patch(`/orders/pay`, {
              imp_uid: response.imp_uid,
            })
            .then(() => {
              const localInfo = localStorage.getItem('cartItems');
              const newArr = JSON.parse(localInfo || '[]').filter(
                (el: string) => {
                  return !orderProduct.includes(el);
                },
              );
              localStorage.setItem('cartItems', JSON.stringify(newArr));
              history('/paymentfinished');
            })
            .catch((err) => {
              // 아임포트는 결제 완료되었지만 DB저장 혹시 서버에서 문제 발생할 경우
              // 이떄 아임포트 결제 환불 시켜줘야함, 오더 삭제
              alert(`${err.response.data.message}`);
              window.location.assign('/error');
            });
        }
      } else {
        // 아임포트 결제 취소 : 임시 주문서 삭제 필요
        instance
          .delete(`/orders/${response.merchant_uid}`)
          .then(() => {
            alert('주문을 취소 하셨습니다');
            setIsDisableBtn(false);
          })
          .catch(() => {
            window.location.assign('/error');
          });
      }
    };

    IMP.request_pay(data, callback);
  };

  return (
    <OrderContentContainer mobile="mobile">
      <ContentWrap>
        <PayTitle>결제 예정금액</PayTitle>
        <CountWrap>
          <DescriptionWrap>
            <dt>주문금액</dt>
            <dd>{`${useComma(priceState.totalPrice)} 원`}</dd>
          </DescriptionWrap>
          <DescriptionWrap>
            <dt>배송비</dt>
            <dd>{`${useComma(priceState.shippingPrice)} 원`}</dd>
          </DescriptionWrap>
          <DescriptionWrap>
            <dt>총 결제 예정금액</dt>
            <dd>{`${useComma(
              priceState.totalPrice + priceState.shippingPrice,
            )} 원`}</dd>
          </DescriptionWrap>
        </CountWrap>
        <ClickBtn type="button" onClick={OrderPaymentHandler}>
          <ClickBtnSpan>{`${useComma(
            priceState.totalPrice + priceState.shippingPrice,
          )}원`}</ClickBtnSpan>
          결제하기
        </ClickBtn>
      </ContentWrap>
    </OrderContentContainer>
  );
};
