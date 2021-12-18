import styled from 'styled-components';

// 주문번호 결제일자 상세보기
export const OrderNumberDescription = styled.dl`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 3rem;
  background-color: #fbfbfb;

  .orderstatus {
    border: none;
    background: none;
    font-weight: 700;
    color: #666666;

    &:hover {
      cursor: pointer;
      background-color: #f7f7f7;
    }
  }

  @media screen and (min-width: 768px) {
    display: flex;
    flex-direction: row;
    min-height: 5rem;
    .orderstatus {
      font-size: 1rem;
      padding-right: 0;
    }
  }
`;

export const DtDdWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  min-height: 3rem;
  line-height: 1.2;
  padding: 1rem 1rem;

  dt {
    margin: 0 1rem 0 0;
  }

  & div div {
    display: flex;
    flex-direction: row;
  }

  @media screen and (min-width: 768px) {
    flex: 1;
    display: flex;
    flex-direction: row;
    padding-right: 1rem;
  }
`;

export const BtnWrap = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 3rem;

  button {
    width: 100%;
    border: none;
    background: none;
    font-weight: 500;
    color: #8a8a8a;
    background-color: #ffffff;
    padding: 0;
    border: 1px solid #eeeeee;

    &:hover {
      cursor: pointer;
      background-color: #f7f7f7;
    }
  }

  @media screen and (min-width: 768px) {
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 5rem;

    button {
      width: 100%;
      height: 47%;

      &:hover {
        cursor: pointer;
        background-color: #f7f7f7;
      }
    }
  }
`;

// 상품
export const AllProductWrap = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #eeeeee;
  border-top: 1px solid #eeeeee;
  padding: 0.5rem 1rem;

  @media screen and (min-width: 768px) {
    background-color: #ffffff;
  }
`;

export const ProductWrap = styled.div`
  display: flex;
  padding: 0.5rem 0;
  min-height: 8rem;

  @media screen and (min-width: 768px) {
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

  @media screen and (min-width: 768px) {
    flex: 1;
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
    position: relative;

    dt:nth-child(1) {
      font-weight: 800;
      font-size: 1.15rem;
    }

    dd:nth-child(4) {
      position: absolute;
      right: 5rem;
      font-weight: 800;
      font-size: 1.15rem;
    }

    .loading_dd {
      position: absolute;
      right: 5rem;
      font-weight: 800;
      font-size: 1.15rem;
    }
  }
`;

// 총 결제 가격
export const TotalPriceWrap = styled.div`
  min-height: 4rem;
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid #eeeeee;

  .mobile-Only.shipping {
    min-height: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.9rem;
  }

  .totalPrice {
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 3rem;
  }

  .realtotalPrice {
    font-weight: 700;
  }

  @media screen and (min-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 6rem;
    font-size: 1.1rem;
    background-color: #ffffff;
    margin-bottom: 0;

    .realtotalPrice {
      font-weight: 700;
    }

    .totalPrice {
      padding: 0 5rem;
    }
  }
`;

export const OrderInfoWrap = styled.section`
  padding: 1rem 1rem;
  background-color: #ffffff;

  @media screen and (min-width: 768px) {
    padding: 2rem 1rem 1rem;
  }
`;

export const DeliveryInfo = styled.div`
  > h2 {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 3rem;
    font-size: 1.1rem;
    font-weight: 800;
    border-bottom: 1px solid #3d3d3d;
  }

  > div {
    min-height: 8rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1rem 0;
  }

  @media screen and (min-width: 768px) {
    > h2 {
      font-size: 1.2rem;
      border-bottom: 1px solid #3d3d3d;
    }
  }
`;

export const UserInfo = styled.dl`
  > h2 {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 3rem;
    font-size: 1.1rem;
    font-weight: 800;
    border-bottom: 1px solid #3d3d3d;
  }

  > div {
    min-height: 10rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1rem 0;
  }

  & div div {
    display: flex;
  }

  dt {
    flex: 4;
    color: #666666;
  }

  dd {
    flex: 6;
    color: #000000;
  }

  @media screen and (min-width: 768px) {
    > h2 {
      font-size: 1.2rem;
      border-bottom: 1px solid #3d3d3d;
    }
  }
`;

export const DeleveryReq = styled.dl`
  > h2 {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 3rem;
    font-size: 1.1rem;
    font-weight: 800;
    border-bottom: 1px solid #3d3d3d;
  }

  > div {
    min-height: 5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1rem 0;
  }

  & div div {
    display: flex;
  }

  dt {
    flex: 4;
    color: #666666;
  }

  dd {
    flex: 6;
    color: #000000;
  }

  @media screen and (min-width: 768px) {
    > h2 {
      font-size: 1.2rem;
      border-bottom: 1px solid #3d3d3d;
    }
  }
`;

//  Desktop Only
export const Menu = styled.div`
  display: none;

  @media screen and (min-width: 768px) {
    border-top: 0.5px solid #eeeeee;
    display: flex;
    min-height: 3rem;
    font-weight: 700;
    background-color: #ffffff;

    > div {
      flex: 1;
      display: flex;
      padding: 1rem 6rem 1rem 1rem;
    }

    div div:first-child {
      flex: 1;
      display: flex;
      padding-left: 30%;
      align-items: center;
    }

    div div:last-child {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;
