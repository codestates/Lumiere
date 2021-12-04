import { Link } from 'react-router-dom';
import { MdOutlineArrowForwardIos } from 'react-icons/md';
import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import {
  LandingContainer,
  ServiceSection,
  ServiceTitle,
  ServiceList,
  ServiceBox,
  StartBtnBox,
} from './styled';

const Landing = () => {
  return (
    <LandingContainer>
      <Header />
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
          <ServiceBox>
            <Link to="/artlist">
              <MdOutlineArrowForwardIos />
              <span>판매작품 구경하기</span>
            </Link>
          </ServiceBox>
          <ServiceBox>
            <Link to="artists">
              <MdOutlineArrowForwardIos />
              <span>작가들의 포트폴리오 구경하기</span>
            </Link>
          </ServiceBox>
          <ServiceBox>
            <Link to="/signup">
              <MdOutlineArrowForwardIos />
              <span>회원가입하기</span>
            </Link>
          </ServiceBox>
        </ServiceList>
      </ServiceSection>
      <StartBtnBox>
        <Link to="/artlist">작가 구경하기테스트</Link>
      </StartBtnBox>
      <Footer />
    </LandingContainer>
  );
};
export default Landing;
