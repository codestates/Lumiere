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
      test
    </AdminHeaderWrap>
  );
};
export default AdminBanner;
