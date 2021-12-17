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
  &:hover img {
    transform: scale(1.1);
  }
  > div:first-child {
    overflow: hidden;
    > img {
      width: 100%;
      transition: all 0.5s;
    }
  }
`;

export const ArtInfoBox = styled.div`
  position: relative;
  padding: 0.8rem;
  display: flex;
  flex-direction: row;
  .loading {
    margin-right: 0.5rem;
  }
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

export const ArtListLoadingWrap = styled.div`
  display: flex;
  flex-direction: column;
`;
