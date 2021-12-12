import styled from 'styled-components';

// CartMenu

export const CartMenuWrap = styled.div`
  flex: 0 0 5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #e4e4e4;

  button {
    border: none;
    background: none;
    color: #888888;
    transition: all 0.5s;
  }

  button:hover {
    cursor: pointer;
    transform: scale(1.05);
    font-weight: 800;
  }

  button:active {
    background-color: #a9a9a9;
  }

  svg {
    pointer-events: none;
    font-size: 1.3rem;
  }

  @media screen and (min-width: 768px) {
    background-color: #f7f7f7;
    border-bottom: none;
  }
`;

export const AllSelectBtnWrap = styled.div`
  button {
    display: flex;
    align-items: center;
  }

  div {
    margin-top: 0.3rem;
  }

  svg {
    pointer-events: none;
    font-size: 1.3rem;
    margin-right: 0.2rem;
  }

  @media screen and (min-width: 768px) {
    button {
      font-size: 1.1rem;
    }
  }
`;

export const SelectBtnWrap = styled.div`
  button {
    font-size: 1rem;
  }
`;

// CartList
export const CartListWrap = styled.div`
  background-color: #ffffff;
  flex: 1;
  @media screen and (min-width: 768px) {
  }
`;

//  Cartpay
export const CartPayWrap = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;

  @media screen and (min-width: 768px) {
    flex: 3;
    position: static;
    background-color: #f7f7f7;
  }
`;

export const CartPayContentWrap = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 768px) {
    display: flex;
    margin-top: 5rem;
    margin-left: 1rem;
    background-color: #ffffff;
  }
`;

export const CartPayCountWrap = styled.dl`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 8vh;
  padding: 0.2rem 2.2rem;
  text-align: center;

  & dt {
    margin-bottom: 0.5rem;
    font-size: 1rem;
  }

  & dd {
    font-size: 1.3rem;
    font-weight: 800;
  }

  @media screen and (min-width: 768px) {
    min-height: 180px;
    min-width: 265px;
    flex-direction: column;
    justify-content: center;
    height: 15vh;
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

    & div:nth-child(3) dt,
    & div:nth-child(3) dd {
      font-weight: 700;
      font-size: 0.9rem;
    }

    & div:nth-child(3) {
      margin-bottom: 1rem;
    }

    & div:nth-child(5) dt,
    & div:nth-child(5) dd {
      font-size: 1.15rem;
      font-weight: 800;
    }

    & div:nth-child(5) {
      border-top: 1px solid #3d3d3d;
      padding-top: 1rem;
    }
  }
`;

export const CartPayDescriptionWrap = styled.div`
  @media screen and (min-width: 768px) {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const CartPayClickBtn = styled.button`
  border: none;
  font-size: 1.3rem;
  font-weight: 700;
  background: none;
  height: 6vh;
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
    font-size: 1.4rem;
    height: 5vh;
    margin: 1rem;
  }
`;

// CartList
export const ProductContentWrap = styled.div`
  margin-bottom: 1rem;
  padding: 1rem;
  background-color: #ffffff;
  overflow: scroll;
  overflow-x: hidden;

  /* 스크롤바 전체길이 */
  &::-webkit-scrollbar {
    width: 5px;
    background-color: #f7f7f7;
    border-radius: 4px;
  }

  /* 현재 내가보고있는 스크롤바 길이 */
  &::-webkit-scrollbar-thumb {
    background-color: #dddddd;
    border-radius: 4px;
  }

  @media screen and (min-width: 768px) {
    height: 100%;
    margin-bottom: 1rem;
  }
`;

export const ProductContent = styled.div`
  display: flex;
  position: relative;
  border-bottom: 1px solid #e4e4e4;
  margin-bottom: 1rem;
`;

export const ListDeleteBtnWrap = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 0;
  top: 0;
  width: 2rem;
  height: 2rem;

  & button {
    width: 100%;
    height: 100%;
    border: none;
    background: none;
    transition: all 0.5s;
  }

  & button:hover {
    cursor: pointer;
    transform: scale(1.1);
  }

  & button svg {
    font-size: 1rem;
    pointer-events: none;
  }
`;

export const ListCheckBtnWrap = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background: none;

  & button {
    width: 2rem;
    height: 2rem;
    padding: 0;
    border: none;
    background: none;
  }

  & button svg {
    font-size: 1.5rem;
    pointer-events: none;
  }
`;

export const ImgWrap = styled.div`
  flex: 3;
  width: 7rem;
  height: 9rem;
  padding: 0 0.5rem;
  background-color: #ebebeb;

  img {
    background-color: #ffffff;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media screen and (min-width: 768px) {
    flex: 2;
  }
`;

export const ProductDlWrap = styled.dl`
  flex: 6;
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
    flex: 7;
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
      font-weight: 800;
      font-size: 1.15rem;
    }
  }
`;
