import styled from 'styled-components';

export const LandingContainer = styled.div`
  h1 {
    margin: 2.5rem 0 1.5rem;
    font-size: 1.3rem;
    font-weight: 800;
    text-align: center;
  }
`;

export const LandingWrap = styled.div`
  max-width: 1152px;
  width: 100%;
  margin: 0 auto;
  padding: 6vh 0 0 0;
`;

export const LatestSection = styled.section`
  margin-bottom: 1.5rem;
  padding: 0 1rem 0 2.5rem;
  /* font-size: 1.3rem; */
  .my-masonry-grid {
    display: -webkit-box; /* Not needed if autoprefixing */
    display: -ms-flexbox; /* Not needed if autoprefixing */
    display: flex;
    width: auto;
    margin-left: -30px; /* gutter size offset */
  }
  .my-masonry-grid_column {
    padding-left: 0.5rem; /* gutter size */
    background-clip: padding-box;
  }

  /* Style your items */
  .my-masonry-grid_column > img {
    /* change div to reference your elements you put in <Masonry> */
    /* background: grey; */
    width: 100%;
    margin-bottom: 1rem;
  }
`;

export const ServiceSection = styled.section`
  h1 {
    margin: 2.5rem 0 1rem 2rem;
    text-align: left;
  }
  p {
    margin: 0 0 2rem 2rem;
    line-height: 1.4;
    color: #666666;
  }

  @media screen and (min-width: 768px) {
    h1,
    p {
      margin-left: 0;
      text-align: center;
    }
  }
`;

export const ServiceTitle = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  z-index: -1;
  height: 2rem;
  padding: 0 2rem;

  div {
    width: 100%;
    height: 1px;
    background-color: #e3d899;
    span {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 0.3rem 3rem;
      background-color: #ffffff;
      border: 1px solid #e3d899;
      border-radius: 2rem;
    }
  }

  @media screen and (min-width: 768px) {
    padding: 0 5rem;
  }
`;

export const ServiceList = styled.ul`
  display: flex;
  flex-direction: column;
  padding-left: 3.4rem;

  @media screen and (min-width: 768px) {
    flex-direction: row;
    padding: 0 1rem;
  }
`;

export const ServiceBox = styled.li`
  a {
    display: flex;
    flex-direction: column;
    margin-bottom: 0.6rem;
    padding: 1rem;
    color: #ffffff;
    background-color: var(--color-black);
    span {
      padding-top: 1rem;
      color: #ffffff;
    }
  }

  @media screen and (min-width: 768px) {
    flex: 1;
    &:nth-child(2) {
      margin: 0 1rem;
    }
  }
`;

export const StartBtnBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 18vh;

  a {
    padding-bottom: 0.5rem;
    font-size: 1.6rem;
    font-weight: 800;
    border-bottom: 2px solid var(--color-black);
    transition: all 0.5s;
  }
  a:hover,
  a:focus {
    font-size: 1.7rem;
    border-bottom: 2px solid #eeeeee;
  }
`;
