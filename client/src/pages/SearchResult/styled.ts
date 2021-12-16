import styled from 'styled-components';

export const ArtListContainer = styled.div`
  padding: 6vh 0 0;

  @media screen and (min-width: 768px) {
    padding: 6vh 1rem 0;
  }
`;
export const ArtListWrap = styled.div`
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
