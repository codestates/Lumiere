/* eslint-disable */
import instance from 'util/axios';
import { OrderdetailType } from 'util/type';
import { useComma, convertDeliverStatus } from 'util/functions';
import { OrderDetailLoading } from './Loading';
import { useRecoilState } from 'recoil';
import { IsSigninState } from 'States/IsLoginState';
import { useEffect, useState } from 'react';
import {
  OrderNumberDescription,
  DtDdWrap,
  BtnWrap,
  AllProductWrap,
  ProductWrap,
  ImgWrap,
  TotalPriceWrap,
  ProductDlWrap,
  OrderInfoWrap,
  DeliveryInfo,
  UserInfo,
  DeleveryReq,
  Menu,
} from './styled';

type OrderDetailProps = {
  orderDetailId: string;
  setIsLoading: (loading: boolean) => void;
  isLoading: boolean;
};

const OrderDetailContent = ({
  orderDetailId,
  setIsLoading,
  isLoading,
}: OrderDetailProps) => {
  const [isLogin, setIsLogin] = useRecoilState(IsSigninState);
  const [userOrder, setUserOrder] = useState<Array<OrderdetailType>>([
    {
      result: {
        id: '',
        paidAt: '',
        status: 0,
        updatedAt: '',
      },
      deliveryInfo: {
        address: '',
        detailedAddress: '',
        receiver: '',
        contactNum: '',
      },
      deliveryDetails: {
        receiveAt: '',
        requestedTerms: '',
      },
      ordererInfo: {
        name: '',
        phoneNum: '',
        email: '',
        refundTerms: '',
      },
      _id: '',
      user: '',
      orderItems: [
        {
          image: '',
          title: '',
          artist: '',
          size: '',
          price: 0,
          product: '',
        },
      ],
      shippingPrice: 0,
      totalPrice: 0,
    },
  ]);

  useEffect(() => {
    instance
      .get(`/orders/${orderDetailId}`)
      .then((res) => {
        setUserOrder([res.data]);
        setIsLoading(false);
      })
      .catch(() => {
        window.location.assign('/error');
      });
  }, []);

  const cancelOrderHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { status, order } = e.currentTarget.dataset;

    if (status === '3' || status === '4' || status === '5') {
      alert('현재 상태에서는 취소가 불가합니다.');
    } else {
      instance
        .delete(`/orders/${order}`)
        .then(() => {
          alert('결제가 취소 되었습니다');
          window.history.back();
        })
        .catch((err) => {
          if (err.response.status === 401 && isLogin) {
            alert('로그인이 만료되었습니다. 다시 로그인해주세요.');
            localStorage.removeItem('lumiereUserInfo');
            setIsLogin(false);
            window.location.assign('/signin');
          }
          alert(`${err.response.data.message}`);
        });
    }
  };

  const refundOrderHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { status, order } = e.currentTarget.dataset;

    if (
      status === '0' ||
      status === '1' ||
      status === '2' ||
      status === '5' ||
      status === '4'
    ) {
      alert('현재 상태에서는 반품이 불가능 합니다. 배송 완료 후 반품 해주세요');
    } else {
      instance
        .patch(`/orders/${order}`, { status: 4 })
        .then(() => {
          alert('반품신청이 완료되었습니다');
          window.history.back();
        })
        .catch((err) => {
          if (err.response.status === 401 && isLogin) {
            alert('로그인이 만료되었습니다. 다시 로그인해주세요.');
            localStorage.removeItem('lumiereUserInfo');
            setIsLogin(false);
            window.location.assign('/signin');
          }
          alert(`${err.response.data.message}`);
          window.location.assign('/error');
        });
    }
  };

  return (
    <>
      {!isLoading ? (
        userOrder.map((el) => {
          return (
            <div key={el._id}>
              <OrderNumberDescription>
                <DtDdWrap>
                  <div>
                    <div>
                      <dt>주문번호</dt>
                      <dd>{el.result.id}</dd>
                    </div>
                    <div>
                      <dt>결제일자</dt>
                      <dd className="smalldd">{el.result.paidAt}</dd>
                    </div>
                  </div>
                  <div>
                    <button type="button" className="orderstatus">
                      {convertDeliverStatus(el.result.status)}
                    </button>
                  </div>
                </DtDdWrap>
                <BtnWrap>
                  <button
                    type="button"
                    onClick={cancelOrderHandler}
                    data-status={el.result.status}
                    data-order={el._id}
                  >
                    취소
                  </button>
                  <button
                    type="button"
                    onClick={refundOrderHandler}
                    data-status={el.result.status}
                    data-order={el._id}
                  >
                    반품
                  </button>
                </BtnWrap>
              </OrderNumberDescription>
              <Menu>
                <div>
                  <div>상품정보</div>
                  <div>주문금액</div>
                </div>
              </Menu>
              <AllProductWrap>
                {el.orderItems.map((el) => {
                  return (
                    <ProductWrap key={el.product}>
                      <ImgWrap>
                        <img
                          src={el.image}
                          alt={`${el.artist}의 ${el.title}`}
                        />
                      </ImgWrap>
                      <ProductDlWrap>
                        <dt>{el.title}</dt>
                        <dd>{el.artist}</dd>
                        <dd>{el.size}</dd>
                        <dd>{`${useComma(el.price)}원`}</dd>
                      </ProductDlWrap>
                    </ProductWrap>
                  );
                })}
              </AllProductWrap>
              <TotalPriceWrap>
                <div className="mobile-Only shipping">
                  {`상품 ${useComma(
                    el.totalPrice - 10000,
                  )}원 + 배송비 10,000원 `}
                </div>
                <div className="totalPrice">
                  <div className="mobile-Only">총 결제 금액</div>
                  <div className="realtotalPrice">{`${useComma(
                    el.totalPrice,
                  )}원`}</div>
                </div>
              </TotalPriceWrap>
              <OrderInfoWrap>
                <DeliveryInfo>
                  <h2>배송지</h2>
                  <div>
                    <div>
                      {`${el.deliveryInfo.address} ${el.deliveryInfo.detailedAddress}`}
                    </div>
                    <div>{el.deliveryInfo.receiver}</div>
                    <div>{el.deliveryInfo.contactNum}</div>
                  </div>
                </DeliveryInfo>
                <UserInfo>
                  <h2>주문자 정보</h2>
                  <div>
                    <div>
                      <dt>주문자명</dt>
                      <dd>{el.ordererInfo.name}</dd>
                    </div>
                    <div>
                      <dt>연락처</dt>
                      <dd>{el.ordererInfo.phoneNum}</dd>
                    </div>
                    <div>
                      <dt>이메일</dt>
                      <dd>{el.ordererInfo.email}</dd>
                    </div>
                    <div>
                      <dt>품절시 환불</dt>
                      <dd>{el.ordererInfo.refundTerms}</dd>
                    </div>
                  </div>
                </UserInfo>
                <DeleveryReq>
                  <h2>배송 요청사항</h2>
                  <div>
                    <div>
                      <dt>수령위치</dt>
                      <dd>{el.deliveryDetails.receiveAt}</dd>
                    </div>
                    <div>
                      <dt>택배배송 요청사항</dt>
                      <dd>{el.deliveryDetails.requestedTerms}</dd>
                    </div>
                  </div>
                </DeleveryReq>
              </OrderInfoWrap>
            </div>
          );
        })
      ) : (
        <OrderDetailLoading />
      )}
    </>
  );
};
export default OrderDetailContent;
