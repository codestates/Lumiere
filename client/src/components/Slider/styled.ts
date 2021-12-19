import styled from 'styled-components';

export const SlideContainer = styled.div`
  width: 100%;
  height: 80vh;
  position: relative;
`;

export const SlideWrap = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  opacity: 0;

  &.current_slide {
    opacity: 1;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const SlideInfoBox = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 26vh;
  min-height: 126px;
  padding: 1.5rem;
  background-color: rgba(255, 255, 255, 0.5);

  > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    max-width: 1200px;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    h3 {
      margin-bottom: 0.4rem;
      font-size: 1.4rem;
      font-weight: 700;
      color: #111111;
    }
    p {
      font-size: 1.2rem;
      line-height: 1.2;
      color: #111111;
    }
    a {
      width: 10rem;
      height: 3rem;
      text-align: center;
      line-height: 3rem;
      font-size: 1.1rem;
      font-weight: 700;
      color: #ffffff;
      background-color: var(--color-black);
      border-radius: 0.4rem;
      transition: all 0.5s;
    }
    a:hover {
      background-color: #555555;
    }
  }

  @media screen and (min-width: 768px) {
    height: 20vh;
    min-height: 150px;
    padding: 2rem;

    > div {
      flex-direction: row;
      h3 {
        margin-bottom: 1rem;
      }
    }
  }
`;

export const SliderButtonBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 1200px;
  width: 100%;
  height: 5rem;
  margin: 0 auto;
`;

export const SliderButton = styled.button`
  /* display: none; */
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 5rem;
  font-size: 1.5rem;
  background: rgba(0, 0, 0, 0.4);
  border: none;

  > svg polyline {
    stroke: rgba(255, 255, 255, 0.8);
  }

  &:last-of-type {
    right: 0;
  }

  @media screen and (min-width: 768px) {
    width: 4rem;
    font-size: 2rem;
  }
`;

export const DotsContainer = styled.div`
  cursor: pointer;
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  display: flex;

  @media screen and (min-width: 768px) {
    left: 50%;
    transform: translateX(-50%);
    justify-content: center;
  }
`;

export const Dot = styled.div`
  width: 1rem;
  height: 1rem;
  margin: 0.5rem;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.6);

  &.current_dot {
    background-color: rgba(0, 0, 0, 0.6);
    border: none;
  }
`;
