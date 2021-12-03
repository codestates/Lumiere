/* eslint no-underscore-dangle: 0 */
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import adminInstance from 'util/axios';
import { Order } from 'util/type';
import { v4 as uuidv4 } from 'uuid';
import { useComma, convertDeliverStatus } from 'util/functions';
import AdminHeader from 'components/Header/AdminHeader';
import {
  Table,
  TableWrap,
  ProductInfoWrap,
  TitleSpan,
  ProductInfoWrap2,
  AdminHeaderWrap,
} from './styled';

const AdminBanner = () => {
  const [orderList, setOrderList] = useState<Array<Order>>([]);
  useEffect(() => {
    adminInstance
      .get<Order>('/orders')
      .then((res) => setOrderList([res.data].flat()));
  }, []);

  const cancleOrder = (id: string) => {
    adminInstance
      .patch(`/orders/${id}`, { status: 5, inStock: true })
      .then((res) => {
        alert('취소가 완료되었습니다.');
        window.location.reload();
      })
      .catch((err) => alert('취소실패, 담당자에게 문의해주세요'));
  };

  const returnOrder = (id: string) => {
    adminInstance
      .patch(`/orders/${id}`, { status: 5, inStock: false })
      .then((res) => {
        alert('반품이 완료되었습니다.');
        window.location.reload();
      })
      .catch((err) => alert('반품실패, 담당자에게 문의해주세요'));
  };

  const changeOrderStatus = (id: string, status: string) => {
    switch (status) {
      case '준비중':
        return adminInstance
          .patch(`/orders/${id}`, { status: 1 })
          .then((res) => {
            alert('배송상태가 준비중으로 변경되었습니다.');
            window.location.reload();
          })
          .catch((err) => alert('변경실패, 담당자에게 문의해주세요'));
      case '배송중':
        return adminInstance
          .patch(`/orders/${id}`, { status: 2 })
          .then((res) => {
            alert('배송상태가 준비중으로 변경되었습니다.');
            window.location.reload();
          })
          .catch((err) => alert('변경실패, 담당자에게 문의해주세요'));
      case '완료':
        return adminInstance
          .patch(`/orders/${id}`, { status: 3 })
          .then((res) => {
            alert('배송상태가 준비중으로 변경되었습니다.');
            window.location.reload();
          })
          .catch((err) => alert('변경실패, 담당자에게 문의해주세요'));
      default:
        return alert('변경실패');
    }
  };

  console.log(orderList.map((el) => el));
  return (
    <AdminHeaderWrap>
      <AdminHeader />
      {/* <Link to="/"></Link> */}
      <h1>배너 관리</h1>
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
          {orderList.map((el) => {
            return (
              <tbody key={uuidv4()}>
                <tr>
                  <td rowSpan={el.orderItems.length}>
                    <div>{el.user.name}</div>
                    <div>{el.ordererInfo.email}</div>
                    <div>{el.ordererInfo.phoneNum}</div>
                    <div>({el.user._id})</div>
                  </td>
                  <td rowSpan={el.orderItems.length}>
                    <div>
                      {el.result.paidAt
                        .toString()
                        .split('-')
                        .join('/')
                        .split('T')
                        .join(' ')
                        .slice(2)
                        .slice(0, -5)}
                    </div>
                    <div>{el.result.id}</div>
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
                    <button type="button" onClick={() => cancleOrder(el._id)}>
                      취소
                    </button>
                    <button type="button" onClick={() => returnOrder(el._id)}>
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
export default AdminBanner;
