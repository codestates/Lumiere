/* eslint-disable */
import styled from 'styled-components/macro';

// SignUpTitle.tsx
export const SignUpTitleWrap = styled.div`
  text-align: center;
  span {
    font-size: 0.8rem;
  }

  @media only screen and (min-width: 768px) {
    span {
      font-size: 0.9rem;
    }
  }
`;

export const SignUpSub = styled.h1`
  margin-bottom: 0.8rem;
  font-size: 1.35rem;
  font-weight: 800;

  @media only screen and (min-width: 768px) {
    font-size: 1.8rem;
  }
`;

export const MoveSignInBtn = styled.button`
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
// SignUpContent.tsx
export const SignUpContentWrap = styled.div`
  margin-top: 1rem;

  @media only screen and (min-width: 768px) {
    width: 100%;
    margin-top: 2.5rem;
  }
`;

export const SignUpInpuForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  /* height: 100%; */

  & > label {
    font-weight: 700;
    font-size: 1rem;
    position: relative;
  }
`;

export const SigunUpInputFormInput = styled.input<{
  err: string;
  errboolean: boolean;
}>`
  display: block;
  width: 100%;
  height: 2.3rem;
  margin-top: 0.7rem;
  border-radius: 4px;
  padding: 0 0 0 0.5rem;
  border: ${({ err, errboolean }) =>
    !err && !errboolean
      ? '1px solid #DCD9D9'
      : err && !errboolean
      ? '2px solid #D45B5B'
      : '2px solid #51AF42'};

  &::placeholder {
    font-size: 0.9rem;
  }
`;

export const SignUpErrImg = styled.div`
  position: absolute;
  top: 2rem;
  right: 0.3rem;
  z-index: 0;

  svg {
    font-size: 1.6rem;
    color: red;
  }

  .pass {
    color: green;
  }
`;

export const SignUpErrMessage = styled.span<{ err: string }>`
  visibility: ${({ err }) => (err ? 'visible' : 'hidden')};
  display: block;
  margin: 0.4rem 0 0.8rem 0;
  font-size: 0.6rem;
  color: #d55b5b;

  @media only screen and (min-width: 768px) {
    font-size: 0.85rem;
  }
`;

export const SignUpBtnWrap = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;

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

// SignUpPrivacy.tsx
export const SignUpPrivacyWrap = styled.div`
  margin: 0.1rem 0 1rem 0;

  > div {
    display: flex;
    flex-direction: column;
  }

  label {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2rem;
    height: 2rem;

    &:hover {
      cursor: pointer;
    }
  }

  input:hover {
    cursor: pointer;
  }

  button {
    padding: 0 0 0 0.5rem;
    color: green;
    font-size: 0.9rem;
    border: none;
    background: none;

    &:hover {
      cursor: pointer;
    }
  }

  @media only screen and (min-width: 768px) {
    margin: 2rem 0 3rem 0;

    input[type='checkbox'] {
      transform: scale(1.5);
    }

    input {
      vertical-align: text-top;
    }
  }
`;

export const PrivacyMessage = styled.span<{ privacyErrState: boolean }>`
  visibility: ${({ privacyErrState }) =>
    privacyErrState ? 'visible' : 'hidden'};
  color: #d55b5b;
  font-size: 0.8rem;

  @media only screen and (min-width: 768px) {
    font-size: 0.85rem;
  }
`;

export const PraivacyLabelWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-weight: 700;
  margin-bottom: 0.4rem;
`;
