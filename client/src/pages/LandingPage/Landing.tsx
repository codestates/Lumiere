/* eslint no-underscore-dangle: 0 */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import instance from 'util/axios';
import { saveAs } from 'file-saver';
import { useRecoilState } from 'recoil';
import { IsSigninState } from 'States/IsLoginState';
import { MdOutlineArrowForwardIos } from 'react-icons/md';
import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import Slider from 'components/Slider/Slider';
import QuickBtns from 'components/QuickBtns/QuickBtns';
import { LoadingSlide, LoadingLatest } from './Loading';
import { LandingService, LandingServiceToLogIn } from './dummy';
import {
  LandingContainer,
  LandingWrap,
  LatestSection,
  LatestImgWrap,
  ServiceSection,
  ServiceTitle,
  ServiceList,
  ServiceBox,
  StartBtnBox,
  ArtistApplySection,
} from './styled';

const Landing = () => {
  const [banners, setBanners] = useState([]);
  const [latestArtList, setLatestArtList] = useState([]);
  const [isLogin, setIsLogin] = useRecoilState(IsSigninState);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // axios 요청
    instance
      .get('/events')
      .then((res) => {
        setBanners(res.data);
        instance
          .get('/products/latest')
          .then((res) => {
            setLatestArtList(res.data);
            setIsLoading(false);
          })
          .catch(() => {
            window.location.assign('/error');
          });
      })
      .catch(() => {
        window.location.assign('/error');
      });
  }, []);

  const fileSaveHandler = () => {
    saveAs('/files/LUMIERE.zip', 'LUMIERE');
  };

  return (
    <LandingContainer>
      <Header />
      {isLoading ? <LoadingSlide /> : <Slider banners={banners} />}
      <LandingWrap>
        <LatestSection>
          <h1>최신작 소개</h1>
          <LatestImgWrap>
            {isLoading ? (
              <LoadingLatest />
            ) : (
              latestArtList.map((art, idx) => {
                const { _id, image } = art;
                return (
                  <div key={_id}>
                    <Link to={`/artdetail/${_id}`}>
                      <img src={image} alt={`최신작 ${idx}`} />
                    </Link>
                  </div>
                );
              })
            )}
          </LatestImgWrap>
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
        <ArtistApplySection>
          <div>
            <img src="/images/introduction.jpeg" alt="서비스 예시 이미지" />
          </div>
          <div>
            <h1>
              Lumiere의<span>&nbsp;작가 지원하기</span>
            </h1>
            <p>신청서를 작성하여 이메일로 보내주세요 :-&#41;</p>
            <div>
              <button type="button" onClick={fileSaveHandler}>
                신청서 다운로드
              </button>
            </div>
          </div>
        </ArtistApplySection>
      </LandingWrap>
      <QuickBtns isLoading={isLoading} />
      <Footer />
    </LandingContainer>
  );
};
export default Landing;
