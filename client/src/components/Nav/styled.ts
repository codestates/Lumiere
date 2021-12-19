import styled from 'styled-components';

export const NavContainer = styled.nav`
  position: absolute;
  top: 0;
  left: 0;
  z-index: var(--nav-index);
  width: 100vw;
  height: 100vh;
  padding: 5rem 3rem 0;
  background: var(--color-black);
  transition: all 0.5s;

  > h1 {
    position: absolute;
    top: 0;
    left: 0;
    z-index: var(--nav-index);
    display: flex;
    justify-content: center;
    align-items: flex-end;
    width: 100%;
    height: 6vh;
    font-size: 2rem;
    font-weight: 800;
    color: #ffffff;
  }
  li {
    display: flex;
    flex-direction: column;
    padding: 1rem 0.5rem;
  }
  li > button {
    border: none;
    background: none;
    cursor: pointer;
    text-align: left;
    font-size: 1rem;
  }
  li:nth-child(1) {
    border-bottom: 0.5px solid #666666;
  }
  li a,
  li > button {
    padding: 1rem;
    font-size: 1.1rem;
    color: #ffffff;
    border: 1px solid var(--color-black);
    transition: all 0.5s;
  }
  li > button {
    border: none;
  }
  li a:hover,
  li > button:hover,
  li > button:focus,
  li a:focus {
    border-radius: 2rem;
    border: 1px solid #ffffff;
  }

  @media screen and (min-width: 768px) {
    display: none;
  }
`;

export const NavInfoBox = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: var(--nav-index);
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 24vh;
  padding: 0 1.5rem;
  background: #ffffff;
`;

export const UserInfoBox = styled.div`
  flex: 1.3;
  display: flex;
  align-items: center;

  img {
    height: 8vh;
    margin: 0 1rem;
  }
  p {
    line-height: 1.4;
    font-weight: 700;
    color: #888888;
  }
  div {
    font-size: 1.2rem;
    span {
      font-weight: 700;
    }
  }
  > div {
    display: flex;
    align-items: center;
  }

  @media screen and (min-width: 768px) {
    justify-content: space-between;

    a {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 1.2rem;
    }
    a:nth-child(1) {
      flex: 1;
      margin-right: 0.5rem;
      div {
        margin-left: 1rem;
        font-size: 1rem;
      }
    }
    a:nth-child(2) {
      justify-content: center;
    }
    > div {
      cursor: pointer;
    }
  }
`;

export const NavButtonBox = styled.div`
  flex: 1;
  display: flex;

  a,
  div {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 0.5rem 1rem;
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--color-black);
    border: 1px solid #eeeeee;
    border-radius: 0.3rem;
    box-shadow: 0 0 0.4rem 0 rgba(0, 0, 0, 0.1);
    transition: all 0.5s;
  }
  div {
    cursor: pointer;
  }
  a:hover,
  a:focus,
  div:hover,
  div:focus {
    color: #ffffff;
    background: #888888;
  }

  @media screen and (min-width: 768px) {
    justify-content: space-around;

    > a {
      flex: 0 0 auto;
      margin: 0;
      padding: 0.2rem 0.5rem;
      font-size: 0.9rem;
      font-weight: normal;
      color: #888888;
      border: none;
      box-shadow: none;
      transition: all 0.5s;
    }
    a:hover,
    a:focus {
      font-weight: 700;
    }
  }
`;
