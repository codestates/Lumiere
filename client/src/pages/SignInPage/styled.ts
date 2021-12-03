import styled from 'styled-components/macro';

export const SignInContainer = styled.section`
  /* 헤더크기만큼 padding-top을 줌 */
  padding-top: 6vh;
`;

export const SignInWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2.5rem 2.5rem;

  @media only screen and (min-width: 768px) {
    padding: 3rem 2.5rem;
  }
`;

export const FooterHandler = styled.div`
  display: none;

  @media only screen and (min-width: 768px) {
    display: block;
  }
`;
