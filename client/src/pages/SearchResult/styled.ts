import styled from 'styled-components';

export const ArtListContainer = styled.div`
  padding: 6vh 0 0;

  @media screen and (min-width: 768px) {
    padding: 6vh 1rem 0;
  }
`;
export const ArtListWrap = styled.div`
  position: relative;
  max-width: 1152px;
  width: 100%;
  margin: 0 auto;
  padding: 0 1rem;
  margin-bottom: 1.5rem;

  /* font-size: 1.3rem; */
  .my-masonry-grid {
    display: -webkit-box; /* Not needed if autoprefixing */
    display: -ms-flexbox; /* Not needed if autoprefixing */
    display: flex;
    width: auto;
    margin-left: -1rem; /* gutter size offset */
  }

  @media screen and (min-width: 768px) {
    padding: 0;
  }
`;

export const BlankResultWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 1152px;
  width: 100vw;
  height: 30vh;
  margin-top: -2rem;
  line-height: 1.5;
  > h3 {
    font-size: 1.3rem;
    margin-bottom: 0.5rem;
    font-weight: bold;
  }
  > p {
    margin-bottom: 0.5rem;
  }
  > p:last-child {
    color: #aaaaaa;
  }
  @media screen and (min-width: 768px) {
    margin-left: 1rem;
  }
`;
