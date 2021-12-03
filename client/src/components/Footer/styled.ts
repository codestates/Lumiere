import styled from 'styled-components/macro';

export const FooterContainer = styled.footer`
  display: flex;
  padding: 1.5rem;
  background-color: #ffffff;
  border-top: 1px solid #f2f2f2;
`;

export const TeamInfoBox = styled.ul`
  display: flex;
  flex-direction: column;
  flex: 1;
  li {
    display: flex;
    flex-direction: column;
    h3 {
      margin-bottom: 0.5rem;
      font-size: 1.2rem;
      font-weight: bold;
    }
    span {
      padding: 0 0 0.3rem 0.6rem;
      color: #aaaaaa;
    }
    a {
      padding: 0 0 0.3rem 0.6rem;
      color: #aaaaaa;
    }
    a:hover {
      font-weight: bold;
    }
  }
  li:nth-child(1) {
    flex: 1;
    margin-bottom: 1rem;
  }
  @media screen and (min-width: 768px) {
    flex-direction: row;
  }
`;

export const SiteInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  text-align: right;
  h1 {
    font-size: 1.5rem;
    font-weight: 800;
    color: var(--color-black);
  }
`;
