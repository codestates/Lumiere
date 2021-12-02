import styled from 'styled-components/macro';

export const LandingContainer = styled.div`
  margin-top: 6vh;
`;

export const ServiceSection = styled.section`
  h1 {
    margin-bottom: 1rem;
    padding: 2rem 0 0 2rem;
    font-size: 1.3rem;
    font-weight: 800;
  }
  p {
    margin-bottom: 2rem;
    padding-left: 2rem;
    line-height: 1.4;
    color: #666666;
  }

  @media screen and (min-width: 768px) {
    h1,
    p {
      padding-left: 0;
      text-align: center;
    }
  }
`;

export const ServiceTitle = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  height: 2rem;
  padding: 0 2rem;

  div {
    width: 100%;
    height: 1px;
    background-color: #e3d899;
    span {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 0.2rem 2.5rem;
      background-color: #ffffff;
      border: 1px solid #e3d899;
      border-radius: 2rem;
    }
  }

  @media screen and (min-width: 768px) {
    padding: 0 5rem;
  }
`;

export const ServiceList = styled.ul`
  display: flex;
  flex-direction: column;
  padding-left: 3.4rem;

  @media screen and (min-width: 768px) {
    flex-direction: row;
    padding: 0 1rem;
  }
`;

export const ServiceBox = styled.li`
  a {
    display: flex;
    flex-direction: column;
    margin-bottom: 0.6rem;
    padding: 1rem;
    color: #ffffff;
    background-color: var(--color-black);
    span {
      padding-top: 1rem;
      color: #ffffff;
    }
  }

  @media screen and (min-width: 768px) {
    flex: 1;
    &:nth-child(2) {
      margin: 0 1rem;
    }
  }
`;
