import styled from 'styled-components';

export const ArtistListContainer = styled.div`
  padding: 6vh 0 0;
  @media screen and (min-width: 768px) {
    padding: 6vh 1rem 0;
  }
  h1 {
    color: #222;
    font-size: 1.8rem;
    margin: 3rem 1rem 1rem 1rem;
    font-weight: bold;
    @media screen and (min-width: 1152px) {
      text-align: center;
    }
  }
  h2 {
    margin: 0rem 0rem 2rem 1rem;
    color: #808080;
    @media screen and (min-width: 1152px) {
      text-align: center;
      margin-bottom: 3rem;
    }
  }
`;

export const ArtistListWrap = styled.div`
  max-width: 1152px;
  width: 100%;
  margin: 0 auto;
  /* padding: 0 1rem; */
  margin-bottom: 1.5rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  @media screen and (min-width: 768px) {
    padding: 0;
    justify-content: flex-start;
    /* display: flex;
    flex-wrap: wrap; */
  }
`;

export const ArtistWrap = styled.div`
  border-radius: 0.2rem;
  overflow: hidden;
  /* width: 23rem; */
  @media screen and (max-width: 1152px) {
    width: 46%;
    margin: 0 1.8% 1.8% 0;
  }
  @media screen and (max-width: 543px) {
    width: 95%;
    margin: 0 0 3.846154% 0;
  }
  @media screen and (min-width: 1152px) {
    width: 23rem;
  }
  &.artistWrapBorder {
    margin-left: 1rem; /* gutter size */
    margin-bottom: 0.8rem;
    background-clip: padding-box;
    border: 1px solid #dfdfdf;
  }
  .imageDiv {
    height: 14rem;
  }
  @media screen and (min-width: 768px) {
    .imageDiv {
      height: 11rem;
    }
  }
  img {
    /* height: 100%;
    display: block;
    width: 100%; */
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const ArtistInfoBox = styled.div`
  position: relative;
  padding: 0.8rem;
  display: flex;
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
    color: #989;
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
