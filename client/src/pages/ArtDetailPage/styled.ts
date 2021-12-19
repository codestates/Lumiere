import styled from 'styled-components';

export const ArtDetailContainer = styled.div`
  margin-top: 6vh;
  margin-bottom: 5rem;
  Footer {
    display: none;
  }
  @media screen and (min-width: 768px) {
    margin-bottom: 0;
    Footer {
      display: flex;
    }
  }
`;

export const ArtDetailWrap = styled.div`
  max-width: 1152px;
  margin: 0 auto;
  padding: 0 1rem;
`;

export const DetailInfoWrap = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
    padding: 2rem 1rem;
  }
`;

export const DetailImgBox = styled.div`
  max-height: 40vh;
  height: 40vh;
  padding: 1.5rem 1rem 2rem 0.5rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    filter: drop-shadow(0.5rem 0.5rem 0px rgba(0, 0, 0, 0.25));
  }

  @media screen and (min-width: 768px) {
    /* flex: 1; */
    width: 66%;
    padding: 2rem 2rem 2.5rem 1.5rem;
    background-color: #f6f6f6;
  }
`;

export const IntroductionSection = styled.section`
  @media screen and (min-width: 768px) {
    width: 66%;
  }
`;

export const DetailInfoBox = styled.div`
  margin: 0.5rem 0 1rem;
  font-weight: 700;
  .likeit {
    fill: red;
  }

  > div > h4 {
    margin: auto 0;
    font-size: 1.2rem;
  }
  > div {
    display: flex;
    padding: 0.4rem 0;
    line-height: 1.2;

    > span {
      width: 5rem;
      color: #aaaaaa;
    }
    > div {
      flex: 1;
    }
  }
  > div:first-child {
    margin-bottom: 0.5rem;
    padding: 0.4rem 0;
    > div {
      display: none;
    }
  }
  > div:nth-child(2) div a {
    display: flex;
    align-items: center;
  }
  > div:nth-child(5) {
    > span {
      margin: auto 0;
    }
    > div {
      font-size: 1.2rem;
      font-weight: 800;
      text-align: right;
    }
  }
  > div:last-child {
    padding: 0;
  }

  @media screen and (min-width: 768px) {
    position: sticky;
    top: 7vh;
    z-index: var(--button-index);
    width: 30%;
    margin: 0;

    > div:first-child > div {
      display: block;
      min-width: 5rem;
      text-align: right;
      > div {
        position: absolute;
        top: 0.4rem;
        right: 2rem;
        z-index: var(--nav-index);
      }
      > svg {
        width: 2rem;
        height: 100%;
        margin-left: 0.4rem;
        padding: 0.4rem;
        color: #aaaaaa;
        cursor: pointer;
      }
    }
  }
`;

export const OrderBtnBox = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: var(--button-index);
  display: flex;
  width: 100%;
  .addShoppingBag {
    cursor: pointer;
  }
  .buttonDisplayNone,
  .loading_btn {
    display: none;
  }

  > div {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 3.5rem;
    margin: 0;
    padding: 0;
    font-size: 1.2rem;
    font-weight: 800;
    background-color: #eeeeee;
    &:hover {
      background-color: #f4f4f4;
    }
    &.primary_button {
      cursor: pointer;
      color: #ffffff;
      background-color: var(--color-black);
      &:hover {
        background-color: #4d4d4d;
      }
    }
    &.cursorNone {
      cursor: not-allowed;
    }
  }
  > a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 3.5rem;
    height: 3.5rem;
    font-size: 1.5rem;
    color: #aaaaaa;
    background-color: #ffffff;
    border: 1px solid #eeeeee;
    > div {
      position: absolute;
      bottom: 0.5rem;
      right: 4rem;
      z-index: var(--nav-index);
    }
  }

  @media screen and (min-width: 768px) {
    position: relative;
    margin-top: 0.5rem;

    > div {
      height: 2.8rem;
      font-size: 1rem;
      transition: all 0.5s;
      &:hover {
        font-size: 1.1rem;
      }
    }
    > a {
      display: none;
    }
  }
`;

/* 작가의 다른 작품, 추천 작품 */
export const SuggestionSection = styled.section`
  position: relative;
  margin: 2.5rem 0;

  > h2 {
    font-size: 1.4rem;
    font-weight: 800;
    margin-bottom: 1.5rem;
    text-align: center;
  }
  > a {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 5rem;
    height: 1.4rem;
    font-size: 0.9rem;
    font-weight: 700;
    color: #888888;
  }
`;

export const SuggestionImgWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;

  > div {
    width: 50%;
    height: 14rem;
    padding: 0.5rem;
    overflow: hidden;
    > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      cursor: pointer;
      transition: all 0.5s;
    }
    > img:hover {
      transform: scale(1.1);
    }
  }

  @media screen and (min-width: 768px) {
    justify-content: center;

    > div {
      width: 25%;
    }
  }
`;
