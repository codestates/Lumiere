import styled from 'styled-components/macro';

// SigninTitle
export const SignInTitleWrap = styled.div`
  flex: 1;
  text-align: center;
  span {
    font-size: 0.8rem;
  }
`;

export const SignInSub = styled.h2`
  margin-bottom: 0.8rem;
  font-size: 1.35rem;
  font-weight: 800;
`;

export const MoveSignUpBtn = styled.button`
  font-size: 1rem;
  font-weight: 700;
  border: none;
  background: none;
  text-decoration: underline;
  text-decoration-color: #473f3f;
  text-underline-position: under;
`;
// SignInContent;
export const SignInContentWrap = styled.div`
  flex: 6;

  form {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }

  form label {
    font-weight: 700;
    margin-bottom: 2rem;
  }

  form label input {
    display: block;
    width: 100%;
    height: 2rem;
    margin-top: 0.8rem;
    border-radius: 4px;
    border: 1px solid #dcd9d9;
  }

  input::placeholder {
    font-size: 0.7rem;
  }
`;

export const SignInBtnWrap = styled.div`
  display: flex;
  flex-direction: column;
  flex: 5;
  text-align: center;

  span {
    margin-bottom: 0.8rem;
    font-size: 0.8rem;
  }

  button {
    height: 4rem;
    font-size: 1.35rem;
    font-weight: 800;
    color: #ffffff;
    background-color: var(--color-black);
    border-radius: 4px;
    border: none;
  }
`;

// SignInSocail
export const SignInSocialWrap = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 4;
  margin-bottom: 1rem;

  li {
    position: relative;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    border: 1px solid #ededed;
  }

  li:nth-child(2) {
    margin-left: 1rem;
  }

  li:nth-child(3) {
    margin-left: 1rem;
  }

  li svg {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 80%;
    height: 80%;
    transform: translate(-50%, -50%);
  }
`;
