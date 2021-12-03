import styled from 'styled-components/macro';

export const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 50%;
  z-index: var(--button-index);
  transform: translateX(-50%);
  display: flex;
  max-width: 1440px;
  min-width: 320px;
  width: 100vw;
  height: 6vh;
  margin: auto;
  padding: 0.6rem 1rem;
  background-color: #ffffff;
  border-bottom: 1px solid #f2f2f2;

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
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
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

    ul {
      display: flex;
      align-items: center;
      height: 100%;
      margin-left: 2rem;
      li {
        margin: 0 0.2rem;
      }
      li a {
        padding: 0.2rem 0.4rem;
        font-weight: 700;
        color: #888888;
        border-bottom: 2px solid #ffffff;
        transition: all 0.5s;
      }
      li a:hover {
        color: var(--color-black);
        border-bottom: 2px solid #eeeeee;
      }
    }
  }
`;

export const IconBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
  font-size: 1.4rem;
  color: #000;

  div,
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1.5rem;
  }
  a:nth-child(3) {
    display: none;
  }
  @media screen and (min-width: 768px) {
    a {
      width: 2rem;
    }
    a:nth-child(3) {
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
