import styled from 'styled-components';

export const ArtistListContainer = styled.div`
  padding: 6vh 1rem;
  @media screen and (min-width: 768px) {
    padding: 6vh 1rem 6vh 1rem;
  }
`;

export const ArtistListWrap = styled.div`
  max-width: 1152px;
  width: 100%;
  margin: 0 auto;
  /* padding: 0 0.5rem; */
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  @media screen and (min-width: 768px) {
    justify-content: space-between;
    /* display: flex;
    flex-wrap: wrap; */
  }
`;

export const ArtistWrap = styled.div`
  border-radius: 0.2rem;
  overflow: hidden;
  margin-top: 1%;
  /* width: 23rem; */
  width: 33%;
  &.artistWrapBorder {
    /* margin-left: 1rem; */
    /* margin-bottom: 0.8rem; */
    background-clip: padding-box;
    border: 1px solid #dfdfdf;
  }
  .imageDiv {
    height: 100%;
    position: relative;
    width: 100%;
    padding-bottom: 100%;
    overflow: hidden;
  }
  .notInStock {
    border: 3px solid #e97272;
  }
  /* @media screen and (min-width: 768px) {
    .imageDiv {
      height: 100%;
    }
  } */
  img {
    /* height: 100%;
    display: block;
    width: 100%; */
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
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

export const ArtistRecordWrap = styled.div`
  padding: 1rem;
  font-size: 18px;
  background-color: #f7f7f7;
  width: 100%auto;
  height: 10rem;
  overflow: auto;
  letter-spacing: 0px;
`;

export const HeadWrap = styled.div`
  max-width: 1152px;
  margin: 0 auto;
  border-bottom: 1px solid #eee;
  padding-bottom: 1rem;
  .h2 {
    color: #222;
    font-size: 1.2rem;
    margin: 1rem 1rem 0.5rem 0rem;
    font-weight: bold;
  }
`;

export const ButtonWrap = styled.div`
  max-width: 1152px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  padding-top: 1rem;
  .circle {
    background-color: #e97272;
    width: 18px;
    height: 18px;
    border-radius: 9px;
    margin-right: 0.5rem;
  }
  .soldout {
    flex: 1;
    @media screen and (min-width: 567px) {
      flex: 2;
    }
    @media screen and (min-width: 700px) {
      flex: 3;
    }
    @media screen and (min-width: 1084px) {
      flex: 4;
    }
  }
  .filter {
    input {
      margin: 0px;
    }
    flex: 1;
    text-align: right;
    label {
      margin: 5px;
      vertical-align: middle;
    }
  }
`;

export const NumberOfWorksWrap = styled.div`
  text-align: center;
  margin: 1rem 0;
`;

export const HtagWrap = styled.div`
  display: flex;
  .htags {
    flex: 1;
    display: flex;
    flex-direction: row;
    @media screen and (min-width: 767px) {
      flex-direction: column;
    }
  }
  .buttonswrap {
    margin: 3rem 1rem 1rem 0rem;
    .likeit {
      fill: red;
    }
    svg {
      width: 2rem;
      height: 100%;
      margin-left: 0.4rem;
      padding: 0.4rem;
      color: #aaaaaa;
    }
  }
  h1 {
    color: #222;
    font-size: 1.8rem;
    margin: 3rem 1rem 1rem 0rem;
    @media screen and (min-width: 767px) {
      margin: 3rem 1rem 0rem 0rem;
    }
    /* display: block; */
    /* margin: 0 auto; */
    /* overflow: hidden; */
    font-weight: bold;
  }
  h2 {
    margin: 4rem 1rem 1rem 0rem;
    @media screen and (min-width: 767px) {
      margin: 0rem;
    }
    color: #808080;
  }
`;
