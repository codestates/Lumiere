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

export const ArtWrap = styled.div`
  border-radius: 0.2rem;
  overflow: hidden;

  &.my-masonry-grid_column {
    margin-left: 1rem; /* gutter size */
    margin-bottom: 0.8rem;
    background-clip: padding-box;
    border: 1px solid #eeeeee;
  }

  img {
    width: 100%;
  }
`;

export const ArtInfoBox = styled.div`
  position: relative;
  padding: 0.8rem;

  h4 {
    margin-bottom: 0.5rem;
    font-size: 1.2rem;
    color: #111111;
  }
  p {
    line-height: 1.4;
    color: #888888;
  }
  svg {
    position: absolute;
    top: 0.6rem;
    right: 0.7rem;
    font-size: 1.3rem;
    color: #aaaaaa;
  }
`;
