import styled from 'styled-components';

// ALl Content
export const OrderContentContainer = styled.section<{ mobile?: string }>`
  position: relative;
  margin: ${({ mobile }) => (mobile ? '0 1rem 7vh' : '1rem')};
  padding: 1.5rem 1rem;
  background-color: #ffffff;
  border-radius: 4px;

  @media screen and (min-width: 768px) {
    min-width: 330px;
    margin: 0;
    border-radius: 0;
    margin-bottom: 1rem;
    padding: 1rem;
  }
`;

export const Title = styled.h2`
  font-weight: 800;
  font-size: 1.1rem;
  margin-bottom: 1.3rem;

  @media screen and (min-width: 768px) {
    font-size: 1.2rem;
    font-weight: 800;
    padding-bottom: 1.4rem;
    margin-bottom: 1rem;
    border-bottom: 1px solid #3d3d3d;
  }
`;

export const AllContentWrap = styled.div`
  @media screen and (min-width: 768px) {
  }
`;

// OrderUser,OrderRequestInfo form,div,input,label

export const LabelWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 0.6rem;

  label {
    width: 65%;
    font-size: 0.9rem;
  }

  input {
    width: 100%;
    border: none;
    border: 1px solid #bbb4b4;
    &:hover {
      border: 1px solid #bbb4b4;
    }

    &:focus {
      outline: 1px solid #bbb4b4;
    }
  }

  @media screen and (min-width: 768px) {
    margin-bottom: 0.8rem;

    label {
      width: 80%;
      font-size: 0.9rem;
    }

    input {
      width: 100%;
    }
  }
`;

//  OrderPay
export const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 768px) {
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
  }
`;

export const PayTitle = styled.h2`
  font-weight: 800;
  font-size: 1.1rem;
  margin-bottom: 1.5rem;

  @media screen and (min-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
    font-weight: 800;
    margin-top: 1.3rem;
    margin-bottom: 0;
  }
`;
export const CountWrap = styled.dl`
  display: flex;
  flex-direction: column;

  & dt {
    margin-bottom: 0.5rem;
    font-size: 1rem;
  }

  & dd {
    font-size: 1rem;
    font-weight: 400;
  }

  & div:nth-child(3) {
    border-top: 1px solid #eeeeee;
    padding-top: 1rem;
  }

  & div:nth-child(3) dt,
  & div:nth-child(3) dd {
    font-size: 1.1rem;
    font-weight: 800;
  }

  @media screen and (min-width: 768px) {
    min-height: 180px;
    min-width: 265px;
    flex-direction: column;
    justify-content: center;
    padding: 0.2rem 1rem;

    & dt {
      margin-bottom: 0;
    }

    svg {
      display: none;
    }

    & div:nth-child(1) dt,
    & div:nth-child(1) dd {
      font-size: 1.15rem;
      font-weight: 800;
    }

    & div:nth-child(1) {
      margin-bottom: 1.3rem;
    }

    & div:nth-child(2) dt,
    & div:nth-child(2) dd {
      font-weight: 700;
      font-size: 0.9rem;
    }

    & div:nth-child(2) {
      margin-bottom: 1rem;
    }

    & div:nth-child(3) dt,
    & div:nth-child(3) dd {
      font-size: 1.15rem;
      font-weight: 800;
    }

    & div:nth-child(3) {
      border-top: 1px solid #3d3d3d;
      padding-top: 1rem;
    }
  }
`;

export const DescriptionWrap = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;

  @media screen and (min-width: 768px) {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const ClickBtn = styled.button`
  position: fixed;
  width: 100%;
  height: 6vh;
  bottom: 0;
  left: 0;
  padding: 0;
  font-size: 1.3rem;
  font-weight: 700;
  border: none;
  background: none;
  background-color: var(--color-black);
  color: #ffffff;
  transition: all 0.5s;

  &:hover {
    cursor: pointer;
    transform: scale(1.05);
    font-weight: 800;
  }

  &:active {
    background-color: #c8c8c8;
  }

  @media screen and (min-width: 768px) {
    position: static;
    font-size: 1.4rem;
    height: 5vh;
  }
`;
export const ClickBtnSpan = styled.span`
  color: #ffffff;
  margin-right: 0.5rem;

  @media screen and (min-width: 768px) {
    display: none;
  }
`;

// OrderAddress

export const FindAddressBtn = styled.button`
  position: absolute;
  right: 1rem;
  top: 1rem;
  height: 2.4rem;
  font-size: 1rem;
  color: #000000;
  background: none;
  border: none;
  border: 1px solid #bbb4b4;
  border-radius: 2px;

  &:hover {
    cursor: pointer;
    transform: scale(1.05);
    font-weight: 800;
  }

  &:active {
    background-color: #c8c8c8;
  }

  @media screen and (min-width: 768px) {
    top: 4.2rem;
  }
`;

export const AddressContent = styled.div`
  width: 95%;
  margin-bottom: 1rem;
  overflow: auto;
  overflow-y: hidden;
  overflow-x: hidden;
  line-height: 1.3rem;

  @media screen and (min-width: 768px) {
    width: 80%;
  }
`;

export const OrderUserInfo = styled.div`
  width: 65%;

  input {
    width: 100%;
    font-size: 0.9rem;
    border: none;
    border: 1px solid #bbb4b4;

    &:hover {
      border: 1px solid #bbb4b4;
    }

    &:focus {
      outline: 1px solid #bbb4b4;
    }
  }

  @media screen and (min-width: 768px) {
    width: 50%;
  }
`;

// OrderProduct
export const ProductContentWrap = styled.div`
  display: flex;
  margin-bottom: 1rem;

  @media screen and (min-width: 768px) {
  }
`;

export const ImgWrap = styled.div`
  background-color: #ebebeb;
  width: 7rem;
  height: 9rem;
  padding: 0 0.5rem;

  img {
    background-color: #ffffff;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const ProductDlWrap = styled.dl`
  flex: 1;
  padding: 1rem;
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
    dt:nth-child(1) {
      order: 1;
      font-weight: 800;
      font-size: 1.15rem;
    }
    dd:nth-child(2) {
      order: 2;
    }
    dd:nth-child(3) {
      order: 4;
    }

    dd:nth-child(4) {
      order: 3;
      text-align: end;
      font-weight: 800;
      font-size: 1.15rem;
    }
  }
`;
