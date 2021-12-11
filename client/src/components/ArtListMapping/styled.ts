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
    flex: 7;
  }
  .heartIcon {
    flex: 1;
  }
  h4 {
    margin-bottom: 0.5rem;
    font-size: 18px;
    font-weight: bold;
    color: #111111;
    @media screen and (max-width: 767px) {
      font-size: 16px;
    }
  }
  p {
    line-height: 1.5;
    font-size: 12px;
    color: #989898;
    @media screen and (max-width: 767px) {
      font-size: 14px;
    }
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
