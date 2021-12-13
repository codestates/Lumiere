import styled from 'styled-components';

export const PaymentContainer = styled.section`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 6vh 0 0 0;
  background-color: #f7f7f7;
  align-items: center;
  justify-content: center;
  & Footer {
    display: flex;
  }
  @media screen and (min-width: 768px) {
    height: auto;
  }
`;

export const PaymentTitleWrap = styled.div`
  display: none;
  height: 3vh;
  @media screen and (min-width: 768px) {
    flex: 0 0 10vh;
    display: flex;
    width: 100%;
    align-items: center;
    background-color: #ffffff;
  }
`;

export const PaymentTitle = styled.h1`
  @media screen and (min-width: 768px) {
    display: block;
    font-size: 1.8rem;
    font-weight: 700;
    margin: 0 auto;
  }
`;

export const PaymentWrap = styled.div`
  /* padding: 10vh 2.5rem 2rem; */
  width: 90%;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 0 0 40vh;
  margin: 11.6vh 0;
  @media only screen and (min-width: 768px) {
    width: 50%;
  }
`;

export const ButtonWrap = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  text-align: center;
  width: 100%;
  cursor: pointer;
  div {
    width: 100%;
  }
  .leftButton {
    background-color: #6f6f6f;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #eee;
    font-weight: bolder;
    font-size: 1.1rem;
  }
  .rightButton {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #4d4d4d;
    color: #eee;
    font-weight: bolder;
    font-size: 1.1rem;
  }
`;

export const H1Wrap = styled.div`
  flex: 7;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  div {
    padding: 1rem;
    font-weight: bolder;
    font-size: 1.3rem;
  }
`;
