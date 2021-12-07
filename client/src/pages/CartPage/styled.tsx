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
    font-size: 1.9rem;
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
  background-color: #ffffff;

  @media screen and (min-width: 768px) {
    display: flex;
    flex: 1;
    flex-direction: row;
    margin-bottom: 3rem;
    min-height: 500px;
  }
`;

export const CartContentLeftWrap = styled.div`
  @media screen and (min-width: 768px) {
    flex: 7;
  }
`;
