/* eslint no-underscore-dangle: 0 */
import { useEffect, useState } from 'react';
import instance from 'util/axios';
import { Order } from 'util/type';
import { v4 as uuidv4 } from 'uuid';
import { useRecoilState } from 'recoil';
import { IsSigninState } from 'States/IsLoginState';
import { useComma, convertDeliverStatus } from 'util/functions';
import Header from 'components/Header/Header';
import PageNation from 'components/PageNation/PageNation';
import {
  Table,
  TableWrap,
  ProductInfoWrap,
  TitleSpan,
  ProductInfoWrap2,
  AdminHeaderWrap,
} from './styled';

const AdminOrderList = () => {
  const [isLogin, setIsLogin] = useRecoilState(IsSigninState);
  const [curPage, setCurPage] = useState<number>(1);
  const [orderList, setOrderList] = useState<Order>({
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
        user: {
          general: {
            email: '',
          },
          name: '',
          _id: '',
        },
        _id: '',
      },
    ],
    page: 0,
    pages: 0,
  });
  useEffect(() => {
    instance
      .get<Order>('/orders')
      .then((res) => {
        setOrderList(res.data);
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

  const pageChangeHandler = (page: number) => {
    setCurPage(page);
    instance
      .get<Order>('/orders', { params: { pageNumber: page } })
      .then((res) => {
        setOrderList(res.data);
      })
      .catch((err) => {
        if (err.response.status === 401 && isLogin) {
          alert('로그인이 만료되었습니다. 다시 로그인해주세요.');
          localStorage.removeItem('lumiereUserInfo');
          setIsLogin(false);
          window.location.assign('/signin');
        } else window.location.assign('/error');
      });
  };

  const cancelOrder = (id: string) => {
    instance
      .delete(`/orders/${id}`)
      .then((res) => {
        alert(`${res.data.message}`);
        window.location.reload();
      })
      .catch((err) => {
        alert(`${err.response.data.message}`);
      });
  };

  const changeOrderStatus = (id: string, status: string) => {
    switch (status) {
      case '준비중':
        return instance
          .patch(`/orders/${id}`, { status: 1 })
          .then((res) => {
            alert(`${res.data.message}`);
            window.location.reload();
          })
          .catch((err) => alert(`${err.response.data.message}`));
      case '배송중':
        return instance
          .patch(`/orders/${id}`, { status: 2 })
          .then((res) => {
            alert(`${res.data.message}`);
            window.location.reload();
          })
          .catch((err) => alert(`${err.response.data.message}`));
      case '완료':
        return instance
          .patch(`/orders/${id}`, { status: 3 })
          .then((res) => {
            alert(`${res.data.message}`);
            window.location.reload();
          })
          .catch((err) => alert(`${err.response.data.message}`));
      case '반품':
        return instance
          .patch(`/orders/${id}`, { status: 4 })
          .then((res) => {
            alert(`${res.data.message}`);
            window.location.reload();
          })
          .catch((err) => alert(`${err.response.data.message}`));
      default:
        return alert('변경실패, 진행 단계가 알맞지 않습니다');
    }
  };

  return (
    <AdminHeaderWrap>
      <Header />
      <h1>결제/배송 관리</h1>
      <PageNation
        curPage={curPage}
        totalPages={orderList.pages}
        pageChangeHandler={pageChangeHandler}
      />
      <TableWrap>
        <Table>
          <tbody>
            <tr>
              <td>주문자</td>
              <td>주문번호</td>
              <td>상품정보</td>
              <td>주문금액</td>
              <td>진행상태</td>
              <td>관리</td>
              <td>배송관리</td>
            </tr>
          </tbody>
          {orderList.orders.map((el) => {
            return (
              <tbody key={uuidv4()}>
                <tr>
                  <td>
                    <div>{el.user === null ? '탈퇴한 회원입니다.' : ''}</div>
                    <div>{el.user === null ? el._id : ''}</div>
                    <div>{el.user?.general?.email}</div>
                    <div>{el.user?.kakao?.email}</div>
                    <div>{el.user?.google?.email}</div>
                    <div>{el.user?.naver?.email}</div>
                    <div>{el.user?.name}</div>
                    <div>{el.user?._id}</div>
                  </td>
                  <td>
                    <div>
                      {el.result?.paidAt
                        ? el.result?.paidAt
                            .toString()
                            .split('-')
                            .join('/')
                            .split('T')
                            .join(' ')
                            .slice(2)
                            .slice(0, -5)
                        : ''}
                    </div>
                    <div>주문번호: {el.result.id}</div>
                  </td>
                  <td>
                    {el.orderItems.map((el) => {
                      return (
                        <ProductInfoWrap key={uuidv4()}>
                          <div>
                            <img src={el.image} alt="주문내역" width="200rem" />
                          </div>
                          <ProductInfoWrap2>
                            <div>
                              <TitleSpan>{el.title}</TitleSpan>
                            </div>
                            <div>
                              <span>{el.artist}</span>
                            </div>
                            <div>
                              <span>{el.size}</span>
                            </div>
                            <div>
                              <span>{useComma(el.price)}원</span>
                            </div>
                          </ProductInfoWrap2>
                        </ProductInfoWrap>
                      );
                    })}
                  </td>
                  <td>{useComma(el.totalPrice)}</td>
                  <td>{convertDeliverStatus(el.result.status)}</td>
                  <td>
                    <button type="button" onClick={() => cancelOrder(el._id)}>
                      취소
                    </button>
                    <button
                      type="button"
                      onClick={() => changeOrderStatus(el._id, '반품')}
                    >
                      반품
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => changeOrderStatus(el._id, '준비중')}
                    >
                      준비중
                    </button>
                    <button
                      type="button"
                      onClick={() => changeOrderStatus(el._id, '배송중')}
                    >
                      배송중
                    </button>
                    <button
                      type="button"
                      onClick={() => changeOrderStatus(el._id, '완료')}
                    >
                      완료
                    </button>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </Table>
      </TableWrap>
    </AdminHeaderWrap>
  );
};
export default AdminOrderList;
