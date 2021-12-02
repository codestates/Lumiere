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
      return '오류';
  }
};
