import styled from 'styled-components/macro';

// SigninTitle
export const SignInTitleWrap = styled.div`
  text-align: center;
  span {
    font-size: 0.8rem;
  }

  @media only screen and (min-width: 768px) {
    width: 100%;
    margin-bottom: 3rem;
    span {
      font-size: 0.9rem;
    }
  }
`;

export const SignInSub = styled.h1`
  margin-bottom: 0.8rem;
  font-size: 1.35rem;
  font-weight: 800;

  @media only screen and (min-width: 768px) {
    font-size: 1.8rem;
  }
`;

export const MoveSignUpBtn = styled.button`
  font-size: 1rem;
  font-weight: 700;
  border: none;
  background: none;
  text-decoration: underline;
  text-decoration-color: #473f3f;
  text-underline-position: under;

  &:hover {
    color: var(--color-red);
    text-decoration-color: var(--color-red);
    cursor: pointer;
  }
`;
// SignInContent;
export const SignInContentWrap = styled.div`
  flex: 5;
  display: flex;
  margin-top: 2.5rem;

  @media only screen and (min-width: 768px) {
    display: flex;
    width: 100%;
    height: 100%;
  }

  form {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  form label {
    font-weight: 700;
    font-size: 1rem;
    margin-bottom: 1.7rem;
    position: relative;
  }

  form label input {
    display: block;
    width: 100%;
    height: 2.3rem;
    margin-top: 0.8rem;
    border-radius: 4px;
    border: 1px solid #dcd9d9;
    padding: 0 0 0 0.5rem;
  }

  input::placeholder {
    font-size: 0.9rem;
  }
`;

export const SignInBtnWrap = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  text-align: center;

  @media only screen and (min-width: 768px) {
    flex: 3;
    width: 100%;
  }

  button {
    height: 4rem;
    font-size: 1.35rem;
    font-weight: 800;
    color: #ffffff;
    background-color: var(--color-black);
    border-radius: 4px;
    border: none;
    transition: all 0.5s;

    &:hover {
      cursor: pointer;
      transform: scale(1.05);
    }
  }
`;

export const SignInErrMessage = styled.span<{ err: string }>`
  visibility: ${(props) => (props.err === 'nothing' ? 'hidden' : 'visible')};
  margin-bottom: 0.8rem;
  color: red;
`;

// SignInSocail
export const SignInSocialWrap = styled.ul`
  flex: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;

  li {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 4rem;
    height: 4rem;
    margin: 0 0.6rem;
    padding: 0.2rem;
    font-size: 2rem;
    background-color: #ffffff;
    border: 1px solid #aaaaaa;
    border-radius: 50%;
    transition: all 1s;
    a {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    &:hover {
      background-color: var(--color-black);
      svg {
        color: #fff;
      }
    }
  }

  li:nth-child(1) {
    padding: 0;
    font-size: 2.5rem;
  }

  @media only screen and (min-width: 768px) {
    li {
      margin: 0 1rem;
    }
    li svg {
      font-size: 2.2rem;
    }
    li:nth-child(1) svg {
      font-size: 2.5rem;
    }
  }
`;
export const SocailBtn = styled.button`
  width: 100%;
  height: 100%;
  border: none;
  background: none;
`;
