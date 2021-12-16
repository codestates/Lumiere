import styled from 'styled-components';

export const VerifyPasswordContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100%;
  > div:nth-child(1) {
    flex: 1;
    display: flex;
    align-items: flex-end;
    > h3 {
      font-size: 1.1rem;
      font-weight: 700;
    }
  }
  > div:nth-child(2) {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 1rem 1rem;
    > input {
      max-width: 400px;
      width: 100%;
      margin-bottom: 0.5rem;
      padding: 0.5rem 1rem;
      border: 1px solid #eeeeee;
      background: #ffffff;
      border-radius: 4px;
      &:focus {
        outline: 1px solid #eeeeee;
      }
    }
    > span {
      font-size: 0.8rem;
      font-weight: 700;
      color: #d55b5b;
    }
  }
  > div:last-child {
    flex: 1;
    width: 100%;
    padding: 0 1rem;
    > button {
      display: block;
      max-width: 400px;
      width: 100%;
      margin: auto;
      padding: 0.8rem;
      font-size: 1.1rem;
      font-weight: 800;
      color: #ffffff;
      letter-spacing: 0.5rem;
      background-color: var(--color-black);
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  }
`;
