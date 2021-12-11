import styled from 'styled-components';

export const ArtWrap = styled.div`
  border-radius: 0.2rem;
  overflow: hidden;
  cursor: pointer;

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
  display: flex;
  flex-direction: row;
  .title {
    flex: 5;
  }
  .heartIcon {
    flex: 1;
  }
  h4 {
    margin-bottom: 0.5rem;
    font-size: 1.2rem;
    color: #111111;
  }
  p {
    line-height: 1.4;
    color: #888888;
  }
  .likeit {
    fill: red;
  }
  svg {
    position: absolute;
    top: 0.6rem;
    right: 0.7rem;
    font-size: 1.3rem;
    color: #aaaaaa;
  }
`;
