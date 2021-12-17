import styled from 'styled-components';

export const ArtistListContainer = styled.div`
  padding: 6vh 0 0;

  @media screen and (min-width: 768px) {
    padding: 6vh 1rem 0;
  }

  > h1 {
    margin: 3rem 1rem 1rem 1rem;
    font-size: 1.8rem;
    font-weight: bold;
    color: #222;
    @media screen and (min-width: 1152px) {
      text-align: center;
    }
  }
  > h2 {
    margin: 0rem 0rem 2rem 1rem;
    color: #808080;
    @media screen and (min-width: 1152px) {
      margin-bottom: 3rem;
      text-align: center;
    }
  }
`;

export const ArtistListWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  max-width: 1152px;
  width: 100%;
  margin: 0 auto;
  margin-bottom: 1.5rem;

  @media screen and (min-width: 768px) {
    justify-content: flex-start;
    padding: 0;
  }
`;

export const ArtistWrap = styled.div`
  border-radius: 0.2rem;
  overflow: hidden;

  > a > div:first-child {
    height: 14rem;
    overflow: hidden;
    > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: all 0.5s;
    }
  }
  &.artistWrapBorder {
    margin-left: 0.5rem; /* gutter size */
    margin-bottom: 0.8rem;
    background-clip: padding-box;
    border: 1px solid #dfdfdf;
  }
  &:hover > a > div:first-child > img {
    transform: scale(1.1);
  }

  @media screen and (max-width: 543px) {
    width: 95%;
    margin: 0 0 6% 0;
  }
  @media screen and (max-width: 1152px) {
    width: 46%;
    margin: 0 1.8% 1.8% 0;
  }
  @media screen and (min-width: 1152px) {
    width: 23rem;
  }
  @media screen and (min-width: 768px) {
    > a > div:first-child {
      height: 11rem;
    }
  }
`;

export const ArtistInfoBox = styled.div`
  position: relative;
  display: flex;
  padding: 0.8rem;

  .h4,
  .p {
    margin-right: 0.5rem;
  }
  h4,
  .h4 {
    margin-bottom: 0.5rem;
    font-size: 18px;
    font-weight: bold;
    color: #111111;
    @media screen and (max-width: 767px) {
      font-size: 16px;
    }
  }
  p,
  .p {
    line-height: 1.5;
    font-size: 12px;
    color: #989898;
  }
  svg {
    position: absolute;
    top: 0.6rem;
    right: 0.7rem;
    font-size: 1.3rem;
    color: #aaaaaa;
  }
`;

export const NameWrap = styled.div`
  flex: 20;
  padding-top: 0.5rem;
`;

export const CountWrap = styled.div`
  flex: 2;
  flex-direction: column;

  .noneBottomBolder {
    border-bottom: 0rem;
  }
  div {
    border: 1px solid #dfdfdf;
    height: 50%;
    text-align: center;
    padding: 0.5rem;
    width: 46px;
    font-size: 12px;
    color: #000;
  }
`;
