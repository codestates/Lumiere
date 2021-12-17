import styled from 'styled-components';

export const OrderDetailContainer = styled.div`
  padding-top: 6vh;
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 768px) {
    background-color: #f7f7f7;
  }
`;

export const OrderDetailWrap = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const TitleWrap = styled.div`
  flex: 0 0 10vh;
  display: flex;
  align-items: center;
  padding: 2rem 1rem;
  border-bottom: 1px solid #eeeeee;
  > h1 {
    font-size: 1.2rem;
    font-weight: 700;
  }

  @media screen and (min-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
    padding: 2rem 1rem;

    > h1 {
      font-size: 2rem;
      font-weight: 700;
    }
  }
`;

export const ContentContainer = styled.div`
  flex: 1;
  max-width: 1152px;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;

  @media screen and (min-width: 768px) {
    flex: 1;
    width: 100%;
    margin: 0 auto;
    background-color: #f7f7f7;
    padding: 2rem 1rem;
  }
`;
