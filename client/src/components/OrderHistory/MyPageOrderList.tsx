/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageNation from 'components/PageNation/PageNation';
import { useComma, convertDeliverStatus } from 'util/functions';
import { EmptyImageWrap } from 'components/ZzimProducts/styled';
import instance from 'util/axios';
import { MypageOrder } from 'util/type';
import { useRecoilState } from 'recoil';
import { LoadingOrderList } from './Loading';
import { IsSigninState } from 'States/IsLoginState';
import { OrderListDummy } from './dummy';
import {
  OrderListContainer,
  ListContainer,
  OrderNumberDescription,
  DtDdWrap,
  ImgWrap,
  ProductDlWrap,
  ProductWrap,
  TotalPriceWrap,
  OrderStatus,
  Management,
  AllProductWrap,
} from './styled';

interface Props {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const MypageOrderList = ({ isLoading, setIsLoading }: Props) => {
  const [isLogin, setIsLogin] = useRecoilState(IsSigninState);
  const navigate = useNavigate();
  const [curPage, setCurPage] = useState<number>(1);
  const [orderList, setOrderList] = useState<MypageOrder>({
    orders: [
      {
        orderItems: [
          {
            artist: '',
            image: '',
            price: 0,
            product: '',
            size: '',
            title: '',
          },
        ],
        result: {
          id: '',
          paidAt: '',
          status: 0,
          updatedAt: '',
        },
        totalPrice: 0,
        user: '',
        _id: '',
      },
    ],
    page: 1,
    pages: 1,
  });

  useEffect(() => {
    setIsLoading(true);
    instance
      .get('/orders/mine', { params: { pageNumber: curPage } })
      .then((res) => {
        setOrderList(res.data);
        setCurPage(res.data.page);
        setIsLoading(false);
      })
      .catch(() => {
        window.location.assign('/error');
      });
  }, []);

  const pageChangeHandler = (page: number) => {
    setCurPage(page);
    setIsLoading(true);
    instance
      .get('/orders/mine', { params: { pageNumber: page } })
      .then((res) => {
        setOrderList(res.data);
        setCurPage(res.data.page);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err.response.status === 401 && isLogin) {
          alert('로그인이 만료되었습니다. 다시 로그인해주세요.');
          localStorage.removeItem('lumiereUserInfo');
          setIsLogin(false);
          window.location.assign('/signin');
        } else window.location.assign('/signin');
      });
  };

  const cancelOrderHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { status, order } = e.currentTarget.dataset;

    if (status === '3' || status === '4' || status === '5') {
      alert('현재 상태에서는 취소가 불가합니다.');
    } else {
      instance
        .delete(`/orders/${order}`)
        .then(() => {
          alert('결제가 취소 되었습니다');
          window.location.reload();
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
          window.location.reload();
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

  const orderDetailHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    navigate(`/orderdetail/${e.currentTarget.dataset.id}`, {
      state: { id: e.currentTarget.dataset.id },
    });
  };

  return (
    <OrderListContainer>
      {isLoading ? (
        OrderListDummy.map((order) => <LoadingOrderList key={order.id} />)
      ) : orderList.orders[0] !== undefined ? (
        orderList.orders.map((el) => {
          return (
            <div key={el._id}>
              <ListContainer>
                <OrderNumberDescription>
                  <DtDdWrap>
                    <div>
                      <dt>주문번호</dt>
                      <dd>{el.result.id}</dd>
                    </div>
                    <div>
                      <dt>결제일자</dt>
                      <dd className="smalldd">{el.result.paidAt}</dd>
                    </div>
                  </DtDdWrap>
                  <button
                    type="button"
                    className="detailView"
                    onClick={orderDetailHandler}
                    data-id={el._id}
                  >
                    상세보기
                  </button>
                </OrderNumberDescription>
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
                    )}원 + 배송비 10,000원`}
                  </div>
                  <div className="totalPrice">
                    <div className="mobile-Only">총 결제 금액</div>
                    <div className="realtotalPrice">{`${useComma(
                      el.totalPrice,
                    )}원`}</div>
                  </div>
                </TotalPriceWrap>
                <OrderStatus>
                  <div>{convertDeliverStatus(el.result.status)}</div>
                </OrderStatus>
                <Management>
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
                </Management>
              </ListContainer>
            </div>
          );
        })
      ) : (
        <EmptyImageWrap>
          <img
            src={`/images/EmptyZzim/hanging-cat-${
              Math.floor(Math.random() * 2) + 1
            }.png`}
            alt="emptyCat"
          />
          <div>아직 아무것도 없네요!</div>
        </EmptyImageWrap>
      )}
      <PageNation
        curPage={curPage}
        totalPages={orderList.pages}
        pageChangeHandler={pageChangeHandler}
      />
    </OrderListContainer>
  );
};
export default MypageOrderList;
