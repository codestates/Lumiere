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
  height: 100%;
  font-size: 2rem;
  text-align: center;
  background: #ffffff;
  border-radius: 0 0 0.8rem 0;

  @media screen and (min-width: 768px) {
    display: none;
  }
`;

export const LogoBox = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 3rem;

  img {
    height: 1.5rem;
  }

  @media screen and (min-width: 768px) {
    flex: 0;
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
      > li > a,
      > li > div {
        padding: 0.2rem 0.4rem;
        font-weight: 700;
        color: #888888;
        border-bottom: 2px solid #ffffff;
        transition: all 0.5s;
      }
      > li > a:hover {
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
