import styled from 'styled-components/macro';

export const SignInContainer = styled.section`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 3rem 2.5rem;

  @media only screen and (min-width: 768px) {
    /* PC버전 rem 상대단위 기준점 */
    padding: 3rem 15rem;
  }
`;
