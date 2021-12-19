import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import { GrPrevious, GrNext } from 'react-icons/gr';
import {
  SlideContainer,
  SlideWrap,
  SlideInfoBox,
  SliderButtonBox,
  SliderButton,
  DotsContainer,
  Dot,
} from './styled';

type Props = {
  banners: Array<{
    _id: string;
    image: string;
    heading: string;
    content: string;
    linkname: string;
    link: string;
  }>;
};

const Slider = ({ banners }: Props) => {
  const [slideIndex, setSlideIndex] = useState(0);

  const nextSlideHandler = () => {
    if (slideIndex < banners.length - 1) {
      setSlideIndex(slideIndex + 1);
    } else if (slideIndex === banners.length - 1) {
      setSlideIndex(0);
    }
  };
  const prevSlideHandler = () => {
    if (slideIndex > 0) {
      setSlideIndex(slideIndex - 1);
    } else if (slideIndex === 0) {
      setSlideIndex(banners.length - 1);
    }
  };

  return (
    <SlideContainer>
      {banners.map((banner, idx) => {
        return (
          <SlideWrap
            key={uuidv4()}
            className={slideIndex === idx ? 'current_slide' : ''}
          >
            <img src={banner.image} alt={banner.heading} />
            <SlideInfoBox>
              <div>
                <div>
                  <h3>{banner.heading}</h3>
                  <p>{banner.content}</p>
                </div>
                <Link to={banners[slideIndex].link}>{banner.linkname}</Link>
              </div>
            </SlideInfoBox>
          </SlideWrap>
        );
      })}
      <SliderButtonBox>
        <SliderButton onClick={prevSlideHandler}>
          <GrPrevious />
        </SliderButton>
        <SliderButton onClick={nextSlideHandler}>
          <GrNext />
        </SliderButton>
      </SliderButtonBox>
      <DotsContainer>
        {Array.from({ length: banners.length }).map((item, idx) => {
          return (
            <Dot
              key={uuidv4()}
              className={slideIndex === idx ? 'current_dot' : ''}
              onClick={() => setSlideIndex(idx)}
            />
          );
        })}
      </DotsContainer>
    </SlideContainer>
  );
};

export default Slider;
