/* eslint no-underscore-dangle: 0 */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import instance from 'util/axios';
import { v4 as uuidv4 } from 'uuid';
import Masonry from 'react-masonry-css';
import { MdOutlineArrowForwardIos } from 'react-icons/md';
import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import Slider from 'components/Slider/Slider';
import QuickBtns from 'components/QuickBtns/QuickBtns';
import { useRecoilState } from 'recoil';
import { IsSigninState } from 'States/IsLoginState';
import { LandingService, LandingServiceToLogIn } from './dummy';
import {
  LandingContainer,
  LandingWrap,
  LatestSection,
  ServiceSection,
  ServiceTitle,
  ServiceList,
  ServiceBox,
  StartBtnBox,
} from './styled';

const Landing = () => {
  const [banners, setBanners] = useState([]);
  const [latestArtList, setLatestArtList] = useState([]);
  const [isLogin, setIsLogin] = useRecoilState(IsSigninState);

  // useEffect(() => {
  //   const url = new URL(window.location.href);
  //   const { search } = url;
  //   console.log(search);
  //   const code = search.split('=')[1].split('&')[0];
  //   console.log(code);
  //   axios
  //     .get('http://localhost:5000/oauth/google', {
  //       params: { code },
  //     })
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  useEffect(() => {
    // axios 요청
    instance
      .get('/events')
      .then((res) => {
        console.log(res.data);
        setBanners(res.data);
        instance
          .get('/products/latest')
          .then((res) => {
            console.log(res);
            setLatestArtList(res.data);
          })
          .catch((res) => {
            window.location.assign('/error');
            console.log(res.message);
          });
      })
      .catch((err) => {
        window.location.assign('/error');
        console.log(err);
      });
  }, []);

  return (
    <LandingContainer>
      <Header />
      <LandingWrap>
        <Slider banners={banners} />
        <LatestSection>
          <h1>최신작 소개</h1>
          <Masonry
            breakpointCols={3}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {/* array of JSX items */}

            {latestArtList.map((art, idx) => {
              const { _id, image } = art;
              return (
                <div
                  role="button"
                  tabIndex={0}
                  key={uuidv4()}
                  className="my-masonry-grid_column hoverClick"
                  onClick={() => window.location.assign(`/artdetail/${_id}`)}
                  onKeyDown={() => window.location.assign(`/artdetail/${_id}`)}
                >
                  <img src={image} alt={`최신작 ${idx}`} />
                </div>
              );
            })}
          </Masonry>
        </LatestSection>
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
            {(isLogin ? LandingServiceToLogIn : LandingService).map(
              (service) => {
                return (
                  <ServiceBox key={service.id}>
                    <Link to={service.link}>
                      <MdOutlineArrowForwardIos />
                      <span>{service.name}</span>
                    </Link>
                  </ServiceBox>
                );
              },
            )}
          </ServiceList>
        </ServiceSection>
        <StartBtnBox>
          <Link to="/artlist">작품 구경하기</Link>
        </StartBtnBox>
      </LandingWrap>
      <QuickBtns />
      <Footer />
    </LandingContainer>
  );
};
export default Landing;
