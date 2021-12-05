import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import instance from 'util/axios';
import { MdOutlineArrowForwardIos } from 'react-icons/md';
import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import Slider from 'components/Slider/Slider';
import { LandingService } from './dummy';
import {
  LandingContainer,
  ServiceSection,
  ServiceTitle,
  ServiceList,
  ServiceBox,
  StartBtnBox,
} from './styled';

const Landing = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    // axios 요청
    instance
      .get('/events')
      .then((res) => {
        console.log(res.data);
        setBanners(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <LandingContainer>
      <Header />
      <Slider banners={banners} />
      <ServiceSection>
        <ServiceTitle>
          <div>
            <span>SERVICE</span>
          </div>
        </ServiceTitle>
        <h1>LUMIERE</h1>
        <p>
          신인 작가를 후원하고
          <br />
          원하는 공간에 어울리는 작품을 구매해보세요!
        </p>
        <ServiceList>
          {LandingService.map((service) => {
            return (
              <ServiceBox key={service.id}>
                <Link to={service.link}>
                  <MdOutlineArrowForwardIos />
                  <span>{service.name}</span>
                </Link>
              </ServiceBox>
            );
          })}
        </ServiceList>
      </ServiceSection>
      <StartBtnBox>
        <Link to="/artlist">작가 구경하기</Link>
      </StartBtnBox>
      <Footer />
    </LandingContainer>
  );
};
export default Landing;
