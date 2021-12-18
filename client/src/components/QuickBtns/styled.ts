import styled from 'styled-components';

export const QuickBtnsContainer = styled.div`
  position: fixed;
  right: 1rem;
  bottom: 4rem;
  z-index: var(--top-index);
  display: flex;
  flex-direction: column;

  > a {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  > a:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }
  > a:first-child {
    background-color: rgba(255, 255, 255, 0.8);
    img {
      width: 50px;
    }
  }
  > a:last-child {
    margin-top: 0.2rem;
  }
  @media screen and (min-width: 768px) {
    bottom: 2.8rem;
  }
`;
