import styled from 'styled-components';

/* 공유 버튼 리스트 컨테이너 */
export const ShareContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  width: 13rem;
  padding: 0 0.5rem;
  background-color: #ffffff;
  border-radius: 0.2rem;
  box-shadow: 0 0 0.4rem 0.1rem rgba(0, 0, 0, 0.1);
  text-align: center;

  > h4 {
    padding: 0.7rem 0;
    font-size: 1rem;
    font-weight: 700;
    color: var(--color-black);
    border-top: 1px solid #eeeeee;
    border-bottom: none;
  }
  /* 닫기 버튼 */
  > button {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 2.5rem;
    height: 2.5rem;
    font-size: 1.4rem;
    background: none;
    border: none;
    cursor: pointer;
  }
  @media (min-width: 768px) {
    flex-direction: column;
    height: 7rem;

    > h4 {
      margin: 0;
      padding: 0.7rem 0;
      font-size: 1rem;
      font-weight: 700;
      border-top: none;
      border-bottom: 1px solid #eeeeee;
    }
    /* 닫기 버튼 */
    > button {
      top: 0;
    }
  }
`;

export const ShareBtnWrap = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  padding: 0.5rem 0;

  > button {
    width: 2.5rem;
    height: 2.5rem;
    margin: 0.25rem;
    padding: 0;
    background: none;
    border: none;
    cursor: pointer;

    > svg {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  > button:nth-child(3) {
    > img {
      width: 100%;
      height: 100%;
    }
  }
  > button:nth-child(4) {
    padding: 0.5rem;
    background: #bbbbbb;
    border-radius: 50%;

    > svg {
      border-radius: 0;
      color: #ffffff;
    }
  }
`;
