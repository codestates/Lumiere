import {
  IntroductionWrap,
  DescriptionWrap,
  ImageWrap,
  TitleBox,
  TextWrap,
} from './styled';

interface Props {
  image: string;
  title: string;
}

const Introduction = ({ image, title }: Props) => {
  return (
    <IntroductionWrap>
      <DescriptionWrap>
        <div>VOL.2</div>
        <div>MINIMANIMO</div>
        <div>2021</div>
      </DescriptionWrap>
      <TitleBox>
        <h1>LUMIERE</h1>
        <h3>루미에르 아트웍 온라인 갤러리</h3>
      </TitleBox>
      <ImageWrap>
        <img
          src="/images/introduction.jpeg"
          alt="작품 전시 인테리어 예시 이미지"
        />
        <div>
          <img src={image} alt={`${title} 전시 예시`} />
        </div>
      </ImageWrap>
      <TextWrap>
        <div>
          <h4>PREMIUM DESIGN</h4>
          <p>신입 작가들의 유니크한 작품 업데이트</p>
        </div>
        <div>
          <h4>HARMONIOUS</h4>
          <p>내 공간에 어울리는 작품 간편하게 검색</p>
        </div>
        <div>
          <h4>RELAXATION</h4>
          <p>부담스럽지 않은 금액으로 기분 전환</p>
        </div>
      </TextWrap>
    </IntroductionWrap>
  );
};
export default Introduction;
