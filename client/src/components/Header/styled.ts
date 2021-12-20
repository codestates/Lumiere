import styled from 'styled-components/macro';

export const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: var(--nav-index);
  width: 100vw;
  background-color: #ffffff;
  border-bottom: 1px solid #f2f2f2;
`;

export const HeaderWrap = styled.header`
  display: flex;
  justify-content: flex-end;
  max-width: 1200px;
  min-width: 320px;
  width: 100%;
  height: 6vh;
  margin: auto;
  padding: 0.6rem 0.4rem 0.6rem 1rem;

  > nav:nth-child(2) {
    display: none;
  }

  @media screen and (min-width: 768px) {
    > nav:nth-child(1) {
      display: none;
    }
  }
`;

export const HambugerBtn = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: var(--nav-btn-index);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 6vh;
  height: 6vh;
  font-size: 2rem;
  text-align: center;
  background: #ffffff;
  border-radius: 0 0 0.8rem 0;

  @media screen and (min-width: 768px) {
    display: none;
  }
`;

export const LogoBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: flex-end;
  align-items: center;

  img {
    height: 1.5rem;
  }

  @media screen and (min-width: 768px) {
    position: relative;
    top: 0;
    left: 0;
    transform: translate(0, 0);
    justify-content: flex-start;
    margin: 0;
  }
`;

export const MainMenu = styled.nav`
  display: none;

  @media screen and (min-width: 768px) {
    flex: 4;
    display: block;

    .curPage {
      color: var(--color-black);
    }

    > ul {
      display: flex;
      align-items: center;
      height: 100%;
      margin-left: 2rem;
      > li {
        margin: 0 0.2rem;
        > div {
          display: inline;
          cursor: pointer;
        }
      }
      > li > button {
        border: none;
        background: none;
        display: inline-block;
        font-size: 1rem;
        cursor: pointer;
      }
      > li > a,
      > li > button,
      > li > div {
        padding: 0.2rem 0.4rem;
        font-weight: 700;
        color: #888888;
        border-bottom: 2px solid #ffffff;
        transition: all 0.5s;
      }
      > li > a:hover,
      > li > button:hover {
        color: var(--color-black);
        border-bottom: 2px solid #eeeeee;
      }
      > li > div:hover {
        color: var(--color-black);
        border-bottom: 2px solid #eeeeee;
      }
    }
  }
`;

export const AdminMenu = styled.li`
  position: relative;

  > a {
    position: relative;
    z-index: 1;
  }
  > ul {
    display: none;
  }
  &:hover {
    > ul {
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      padding-top: 2.3rem;

      > li {
        display: flex;
        width: 8rem;
        background-color: rgba(0, 0, 0, 0.5);
        border-bottom: 1px solid #eeeeee;
      }
      > li > a {
        width: 100%;
        padding: 0.5rem 0;
        font-size: 0.9rem;
        color: #ffffff;
        text-align: center;
      }
      > li > a:hover {
        font-weight: 800;
        background-color: var(--color-black);
      }
      > li:last-child {
        border-bottom: none;
      }
    }
  }
  > a {
    padding-bottom: 3rem;
  }
`;

export const IconBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
  font-size: 1.4rem;
  color: #000;

  button {
    margin: 0;
    padding: 0;
    background: none;
    border: none;
  }
  div,
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2rem;
    font-size: 1.6rem;
    cursor: pointer;
  }
  div:nth-child(3) {
    display: none;
  }
  @media screen and (min-width: 768px) {
    div,
    button {
      font-size: 1.3rem;
    }
    div:nth-child(3) {
      display: flex;
    }
  }
`;

export const HeaderInfoBox = styled.div`
  display: none;

  @media screen and (min-width: 768px) {
    display: flex;
    height: 100%;
    margin-left: 0.2rem;
    padding: 0 0 0 0.4rem;
    border-left: 1px solid #eeeeee;
  }
`;

/* 검색창 영역 */
export const SearchContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: -999;
  width: 100%;
  background-color: #ffffff;
  border: 1px solid #f2f2f2;
  opacity: 0;
  transition: all 0.5s;
  &.search {
    display: flex;
    justify-content: center;
    align-items: center;
    top: 6vh;
    opacity: 1;
  }
`;

export const SearchWrap = styled.div`
  display: flex;
  max-width: 820px;
  min-width: 320px;
  width: 100%;
  margin: auto;
  padding: 0.5rem;
  #header-searchBar-form {
    position: relative;
    display: block;
    width: 100%;
  }
`;

export const SearchBarInputWrapper = styled.div`
  display: block;
  border: none;
  outline: none;
  box-sizing: border-box;
  width: 100%;
  padding: 0 10px 0 10px;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  background-color: #eee;
  color: #222;
  border-radius: 2px;
  #header-searchBar-sq {
    display: block;
    border: none;
    outline: none;
    width: 100%;
    padding: 0 10px;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    background-color: #eee;
    color: #222;
    border-radius: 2px;
  }
  input::-webkit-search-decoration,
  input::-webkit-search-cancel-button,
  input::-webkit-search-results-button,
  input::-webkit-search-results-decoration {
    display: none;
  }
  > label {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2rem;
    height: 100%;
    transition: all 0.5s;
    &:hover {
      transform: scale(1.2);
    }
    > input {
      display: none;
    }
  }
  svg {
    cursor: pointer;
  }
`;
