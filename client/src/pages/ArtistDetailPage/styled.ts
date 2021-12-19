import styled from 'styled-components';

export const ArtistDeatilContainer = styled.div`
  padding: 6vh 1rem;

  @media screen and (min-width: 768px) {
    padding: 6vh 1rem 6vh 1rem;
  }
`;

export const ArtListWrap = styled.div`
  max-width: 1152px;
  width: 100%;
  margin: 0 auto;
  padding-bottom: 3rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

export const ArtistWrap = styled.div`
  width: 33%;
  padding: 0.2rem;
  background-clip: padding-box;
  overflow: hidden;

  > a > div {
    position: relative;
    width: 100%;
    height: 100%;
    padding-bottom: 100%;
    border: 1px solid #dfdfdf;
    border-radius: 0.2rem;
    overflow: hidden;
  }
  .notInStock {
    border: 3px solid #e97272;
  }
  img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 0.5s;
  }
  img:hover {
    transform: scale(1.1);
  }
`;

export const ArtistRecordWrap = styled.div`
  padding: 1rem;
  background-color: #f7f7f7;
  width: 100%auto;
  height: 10rem;
  overflow: auto;
  letter-spacing: 0px;
  word-break: keep-all;
`;

export const HeadWrap = styled.div`
  max-width: 1152px;
  margin: 0 auto;
  border-bottom: 1px solid #eee;
  padding-bottom: 1rem;
  > h2 {
    color: #222;
    font-size: 1.2rem;
    margin: 1.5rem 1rem 0.5rem 0rem;
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
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
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
    flex: 1;
    text-align: right;
    cursor: default;
    input {
      margin: 0px;
      cursor: pointer;
    }
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
    position: relative;
    margin: 2rem 1rem 1.5rem 0rem;
    padding: 0.4rem 0;
    .likeit {
      fill: red;
    }
    > div {
      position: absolute;
      bottom: 0.2rem;
      right: 2rem;
      z-index: var(--nav-index);
      @media screen and (min-width: 768px) {
        top: 0.2rem;
      }
    }
    > svg {
      width: 2rem;
      height: 100%;
      margin-left: 0.4rem;
      padding: 0.4rem;
      color: #aaaaaa;
      cursor: pointer;
    }
  }
  h1 {
    color: #222;
    font-size: 1.8rem;
    margin: 3rem 1rem 1rem 0rem;
    font-weight: bold;
    @media screen and (min-width: 767px) {
      margin: 3rem 1rem 0.5rem 0rem;
    }
  }
  h2 {
    margin: 4rem 1rem 1rem 0rem;
    color: #808080;
    @media screen and (min-width: 767px) {
      margin: 0rem;
    }
  }
`;
