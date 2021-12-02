import styled from 'styled-components/macro';

export const HeaderContainer = styled.header`
  position: relative;
  display: flex;
  height: 3rem;
  padding: 0.6rem 1rem;
  border-bottom: 1px solid #f2f2f2;
`;
export const MenuContainer = styled.div`
  display: flex;
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
    justify-content: flex-start;
    margin: 0;
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
