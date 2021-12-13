import styled from 'styled-components';

// Cart Page
export const CartContainer = styled.section`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 6vh 0 0 0;
  background-color: #f7f7f7;

  & Footer {
    display: none;
  }

  @media screen and (min-width: 768px) {
    & Footer {
      display: flex;
    }
  }
`;

export const CartTitleWrap = styled.div`
  display: none;

  @media screen and (min-width: 768px) {
    flex: 0 0 10vh;
    display: flex;
    width: 100%;
    align-items: center;
    background-color: #ffffff;
  }
`;

export const CartTitle = styled.h1`
  @media screen and (min-width: 768px) {
    display: block;
    font-size: 1.8rem;
    font-weight: 700;
    margin: 0 auto;
  }
`;

export const CartContentWrap = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  max-width: 1152px;
  width: 100%;
  margin: 0 auto;

  @media screen and (min-width: 768px) {
    display: flex;
    min-height: 500px;
    flex: 1;
    flex-direction: row;
    padding: 0 1rem 1rem;
  }
`;

export const CartContentLeftWrap = styled.div`
  display: flex;
  flex-direction: column;
  height: 82vh;

  @media screen and (min-width: 768px) {
    flex: 7;
    height: 100%;
  }
`;
