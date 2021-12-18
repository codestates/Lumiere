import styled from 'styled-components';

// Order Page
export const OrderContainer = styled.section`
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

export const TitleWrap = styled.div`
  display: none;

  @media screen and (min-width: 768px) {
    flex: 0 0 10vh;
    display: flex;
    width: 100%;
    align-items: center;
    background-color: #ffffff;
  }
`;

export const Title = styled.h1`
  @media screen and (min-width: 768px) {
    display: block;
    font-size: 1.8rem;
    font-weight: 700;
    margin: 0 auto;
  }
`;

export const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1152px;
  width: 100%;
  margin: 0 auto;
  background-color: #f7f7f7;

  @media screen and (min-width: 768px) {
    flex: 1;
    position: relative;
    display: flex;
    flex-direction: row;
    padding: 2.5rem 1rem 1rem;
    height: 63vh;
  }
`;

export const ContentLeft = styled.div`
  @media screen and (min-width: 768px) {
    flex: 7;
    display: flex;
    flex-direction: column;
    height: 100%;
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
  }
`;

export const ContentRight = styled.div`
  display: block;
  @media screen and (min-width: 768px) {
    position: sticky;
    top: 0;
    display: block;
    flex: 3;
    margin-left: 1rem;
  }
  p {
    font-size: 0.9rem;
    font-weight: 700;
    color: #ff3333;
    word-break: keep-all;
    padding: 0 0.5rem;
    line-height: 1.3;
  }
`;
