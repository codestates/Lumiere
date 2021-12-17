import styled from 'styled-components';

// OrderHistory
export const OrderHistoryContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

// OrderMenu Web Only
export const MenuContainer = styled.section`
  display: none;

  @media screen and (min-width: 768px) {
    display: block;
    border-bottom: 2px solid #dddddd;
  }
`;

export const MenuListWrapUl = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 2rem;
  font-size: 0.9rem;
  font-weight: 700;
  color: #666666;
  background-color: #f7f7f7;

  & li:nth-child(1) {
    flex: 2.5;
  }

  & li:nth-child(2) {
    flex: 5.5;
  }

  & li:nth-child(3) {
    flex: 2;
  }

  & li:nth-child(4) {
    flex: 1.5;
  }

  & li:nth-child(5) {
    flex: 1;
  }
`;

// MyPageOrderList
export const OrderListContainer = styled.div``;

export const ListContainer = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  text-align: start;
  border-bottom: 1px solid #eeeeee;

  @media screen and (min-width: 768px) {
    display: flex;
    flex-direction: row;
    text-align: center;
    padding: 0;
    .mobile-Only {
      display: none;
    }
  }
`;

// 주문번호 결제일자 상세보기
export const OrderNumberDescription = styled.dl`
  order: 1;
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  min-height: 3rem;
  padding: 1rem 0.5rem 0.5rem 1rem;
  background-color: #fbfbfb;

  .detailView {
    border: none;
    background: none;
    font-weight: 500;
    color: #8a8a8a;

    &:hover {
      cursor: pointer;
      background-color: #f7f7f7;
    }
  }

  @media screen and (min-width: 768px) {
    order: 1;
    flex: 2.5;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;

    .detailView {
      border: none;
      background: none;
      font-weight: 700;
      font-size: 1rem;
      color: #666666;
      margin-top: 1rem;
    }
  }
`;

export const DtDdWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  line-height: 1.2;

  dt,
  .loading_dt {
    margin: 0 1rem 0 0;
  }

  & div {
    display: flex;
    flex-direction: row;
  }
  @media screen and (min-width: 768px) {
    flex-direction: column;
    align-items: center;

    dt,
    .loading_dt {
      display: none;
    }

    dd {
      margin-bottom: 0.5rem;
    }

    .smalldd {
      font-size: 0.9rem;
    }
  }
`;

// 상품
export const AllProductWrap = styled.div`
  flex: 2;
  order: 4;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #eeeeee;
  border-top: 1px solid #eeeeee;
  padding: 0.5rem 1rem;

  @media screen and (min-width: 768px) {
    order: 2;
    flex: 5.5;
    border-top: none;
    border-bottom: none;
  }
`;

export const ProductWrap = styled.div`
  display: flex;
  padding: 0.5rem 0;
  min-height: 8rem;

  @media screen and (min-width: 768px) {
    border-bottom: 1px solid #eeeeee;

    &:last-child {
      border-bottom: none;
    }
  }
`;

export const ImgWrap = styled.div`
  flex: 2;
  background-color: #ebebeb;

  img {
    background-color: #ffffff;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const ProductDlWrap = styled.dl`
  flex: 7;
  padding: 0.5rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  & dt {
    font-weight: 700;
    font-size: 1.2rem;
    color: #424242;
  }

  & dd {
    font-weight: 400;
    font-size: 1rem;
    color: #424242;
  }

  dd:nth-child(4) {
    font-weight: 700;
  }

  @media screen and (min-width: 768px) {
    align-items: flex-start;

    dt:nth-child(1) {
      font-weight: 800;
      font-size: 1.15rem;
    }

    dd:nth-child(4) {
      font-weight: 800;
      font-size: 1.15rem;
    }
  }
`;

// 총 결제 가격
export const TotalPriceWrap = styled.div`
  flex: 1;
  order: 5;
  min-height: 4rem;
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;

  .mobile-Only.shipping {
    min-height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.9rem;
  }

  .totalPrice {
    display: flex;
    justify-content: space-between;
  }

  .realtotalPrice {
    font-weight: 700;
  }

  @media screen and (min-width: 768px) {
    flex: 2;
    order: 3;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 800;
    font-size: 1.1rem;
    padding: 0;
    margin-bottom: 0;

    .mobile-Only.shipping {
      display: none;
    }
  }
`;

// 진행상태
export const OrderStatus = styled.div`
  flex: 1;
  order: 3;
  position: absolute;
  top: 5rem;
  right: 0.7rem;
  font-weight: 700;
  padding: 0.5rem;
  background-color: #fbfbfb;

  @media screen and (min-width: 768px) {
    position: static;
    flex: 1.5;
    order: 4;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
    font-weight: 700;
    font-size: 1.1rem;
    padding: 0;
    margin-bottom: 0;
  }
`;

// 관리
export const Management = styled.div`
  flex: 1;
  order: 2;
  display: flex;
  align-items: center;
  min-height: 4rem;
  padding: 0.5rem 1rem;
  background-color: #fbfbfb;

  & button {
    color: #8a8a8a;
    border: none;
    background: none;
    background-color: #ffffff;
    border: 1px solid #ececec;
    margin-right: 1rem;
    width: 4.5rem;
    height: 2.2rem;

    &:hover {
      cursor: pointer;
      background-color: #f4f4f4;
    }
  }

  @media screen and (min-width: 768px) {
    flex: 1;
    order: 5;
    flex-direction: column;
    justify-content: center;
    background-color: #ffffff;
    padding: 0;
    margin-bottom: 0;

    > button {
      width: 3rem;
      margin: 0;
      &:first-child {
        margin: 0 0 1rem;
      }
      &:hover {
        cursor: pointer;
        background-color: #f4f4f4;
      }
    }
  }
`;
