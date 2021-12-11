import styled from 'styled-components/macro';

export const SignUpContainer = styled.section`
  max-width: 1200px;
  margin: 0 auto;

  Footer {
    display: none;
  }

  @media only screen and (min-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    height: auto;
    padding: 0;

    Footer {
      display: flex;
      width: 100%;
    }
  }
`;

export const SignUpWrap = styled.div`
  padding: 10vh 2.5rem 2rem;
  width: 100%;
  height: 100%;

  @media only screen and (min-width: 768px) {
    flex: 0 0 82vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 60%;
    padding: 10vh 0 2rem;
  }
`;
