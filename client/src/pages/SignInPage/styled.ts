import styled from 'styled-components/macro';

export const SignInContainer = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  height: 100vh;

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

export const SignInWrap = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 10vh 2.5rem 2rem;

  @media only screen and (min-width: 768px) {
    flex: 0 0 82vh;
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
    width: 60%;
    padding: 10vh 0 2rem;
  }
`;
