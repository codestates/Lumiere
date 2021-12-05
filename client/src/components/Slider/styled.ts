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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 25vh;
  padding: 1.5rem;
  background-color: rgba(255, 255, 255, 0.4);

  h3,
  p {
    font-size: 1.4rem;
    font-weight: 700;
    color: #111111;
  }
  h3 {
    margin-bottom: 0.4rem;
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

  @media screen and (min-width: 768px) {
    flex-direction: row;
    height: 18vh;
    padding: 2.5rem 2rem;

    h3 {
      margin-bottom: 1rem;
    }
  }
`;

export const SliderButton = styled.button`
  /* display: none; */
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 5rem;
  font-size: 1.5rem;
  background: none;
  border: none;

  &:last-of-type {
    right: 0;
  }

  @media screen and (min-width: 768px) {
    width: 4rem;
    font-size: 2rem;
  }
`;

export const DotsContainer = styled.div`
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
