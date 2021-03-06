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
      alert('?????? ??????????????? ????????? ???????????????.');
    } else {
      instance
        .delete(`/orders/${order}`)
        .then(() => {
          alert('????????? ?????? ???????????????');
          window.history.back();
        })
        .catch((err) => {
          if (err.response.status === 401 && isLogin) {
            alert('???????????? ?????????????????????. ?????? ?????????????????????.');
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
      alert('?????? ??????????????? ????????? ????????? ?????????. ?????? ?????? ??? ?????? ????????????');
    } else {
      instance
        .patch(`/orders/${order}`, { status: 4 })
        .then(() => {
          alert('??????????????? ?????????????????????');
          window.history.back();
        })
        .catch((err) => {
          if (err.response.status === 401 && isLogin) {
            alert('???????????? ?????????????????????. ?????? ?????????????????????.');
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
                      <dt>????????????</dt>
                      <dd>{el.result.id}</dd>
                    </div>
                    <div>
                      <dt>????????????</dt>
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
                    ??????
                  </button>
                  <button
                    type="button"
                    onClick={refundOrderHandler}
                    data-status={el.result.status}
                    data-order={el._id}
                  >
                    ??????
                  </button>
                </BtnWrap>
              </OrderNumberDescription>
              <Menu>
                <div>
                  <div>????????????</div>
                  <div>????????????</div>
                </div>
              </Menu>
              <AllProductWrap>
                {el.orderItems.map((el) => {
                  return (
                    <ProductWrap key={el.product}>
                      <ImgWrap>
                        <img
                          src={el.image}
                          alt={`${el.artist}??? ${el.title}`}
                        />
                      </ImgWrap>
                      <ProductDlWrap>
                        <dt>{el.title}</dt>
                        <dd>{el.artist}</dd>
                        <dd>{el.size}</dd>
                        <dd>{`${useComma(el.price)}???`}</dd>
                      </ProductDlWrap>
                    </ProductWrap>
                  );
                })}
              </AllProductWrap>
              <TotalPriceWrap>
                <div className="mobile-Only shipping">
                  {`?????? ${useComma(
                    el.totalPrice - 10000,
                  )}??? + ????????? 10,000??? `}
                </div>
                <div className="totalPrice">
                  <div className="mobile-Only">??? ?????? ??????</div>
                  <div className="realtotalPrice">{`${useComma(
                    el.totalPrice,
                  )}???`}</div>
                </div>
              </TotalPriceWrap>
              <OrderInfoWrap>
                <DeliveryInfo>
                  <h2>?????????</h2>
                  <div>
                    <div>
                      {`${el.deliveryInfo.address} ${el.deliveryInfo.detailedAddress}`}
                    </div>
                    <div>{el.deliveryInfo.receiver}</div>
                    <div>{el.deliveryInfo.contactNum}</div>
                  </div>
                </DeliveryInfo>
                <UserInfo>
                  <h2>????????? ??????</h2>
                  <div>
                    <div>
                      <dt>????????????</dt>
                      <dd>{el.ordererInfo.name}</dd>
                    </div>
                    <div>
                      <dt>?????????</dt>
                      <dd>{el.ordererInfo.phoneNum}</dd>
                    </div>
                    <div>
                      <dt>?????????</dt>
                      <dd>{el.ordererInfo.email}</dd>
                    </div>
                    <div>
                      <dt>????????? ??????</dt>
                      <dd>{el.ordererInfo.refundTerms}</dd>
                    </div>
                  </div>
                </UserInfo>
                <DeleveryReq>
                  <h2>?????? ????????????</h2>
                  <div>
                    <div>
                      <dt>????????????</dt>
                      <dd>{el.deliveryDetails.receiveAt}</dd>
                    </div>
                    <div>
                      <dt>???????????? ????????????</dt>
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
