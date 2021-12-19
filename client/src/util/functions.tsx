/* eslint-disable */
import { OrderProducts } from './type';

export const useComma = (price: number) => {
  return Number(price).toLocaleString('ko');
};

export const convertDeliverStatus = (param: number) => {
  switch (param) {
    case 0:
      return '결제완료';
    case 1:
      return '발송준비중';
    case 2:
      return '배송중';
    case 3:
      return '배송완료';
    case 4:
      return '반품요청중';
    case 5:
      return '결제취소';
    default:
      return '결제오류';
  }
};

//  order 주문 anme
export const useName = (title: OrderProducts[]): string => {
  if (title.length === 1) {
    return `${title[0].title}`;
  }

  return `${title[0].title} 외 ${title.length - 1}개의 작품`;
};

// order 주문번호
export const useOrderNumber = () => {
  function generateRandomCode(n: number) {
    let str = '';
    for (let i = 0; i < n; i++) {
      str += Math.floor(Math.random() * 10);
    }
    return str;
  }

  const today = new Date();
  const year = today.getFullYear();
  const month = ('0' + (today.getMonth() + 1)).slice(-2);
  const day = ('0' + today.getDate()).slice(-2);

  const dateStrng: string = year + month + day;

  const productNum = generateRandomCode(6);
  return `${dateStrng}${productNum}`;
};
