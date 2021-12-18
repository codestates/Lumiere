import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import {
  IntroductionWrap,
  DescriptionWrap,
  ImageWrap,
  TitleBox,
  TextWrap,
} from 'components/Introduction/styled';
import {
  ArtDetailWrap,
  DetailInfoWrap,
  DetailImgBox,
  IntroductionSection,
  DetailInfoBox,
  OrderBtnBox,
  SuggestionSection,
  SuggestionImgWrap,
} from './styled';
import { ProductsByArtistDummy, ProductsByRandomDummy } from './dummy';

export const LoadingArtDetail = () => {
  return (
    <ArtDetailWrap>
      <DetailInfoWrap>
        <DetailImgBox>
          <Skeleton
            variant="rectangular"
            animation="wave"
            width="100%"
            height="100%"
          />
        </DetailImgBox>
        <DetailInfoBox>
          <div>
            <Skeleton
              variant="text"
              animation="wave"
              width="100%"
              height="1.2rem"
            />
            <div>
              <Stack
                spacing={1}
                style={{ display: 'flex', justifyContent: 'space-around' }}
                className="loading_btn"
              >
                <Skeleton
                  variant="circular"
                  animation="wave"
                  width="2rem"
                  height="2rem"
                />
                <Skeleton
                  variant="circular"
                  animation="wave"
                  width="2rem"
                  height="2rem"
                />
              </Stack>
            </div>
          </div>
          <div>
            <span>작가</span>
            <div>
              <Skeleton
                variant="text"
                animation="wave"
                width="100%"
                height="100%"
              />
            </div>
          </div>
          <div>
            <span>작품정보</span>
            <div>
              <Skeleton
                variant="text"
                animation="wave"
                width="100%"
                height="50%"
              />
              <Skeleton
                variant="text"
                animation="wave"
                width="100%"
                height="50%"
              />
            </div>
          </div>
          <div>
            <span>작품코드</span>
            <div>
              <Skeleton
                variant="text"
                animation="wave"
                width="100%"
                height="100%"
              />
            </div>
          </div>
          <div>
            <span>작품금액</span>
            <Skeleton
              variant="text"
              animation="wave"
              width="100%"
              height="2rem"
            />
          </div>
          <OrderBtnBox>
            <Stack spacing={1}>
              <Skeleton
                variant="rectangular"
                animation="wave"
                width="100%"
                height="100%"
              />
            </Stack>
            <Stack spacing={1}>
              <Skeleton
                variant="rectangular"
                animation="wave"
                width="100%"
                height="100%"
              />
            </Stack>
            <a href="#top">
              <Skeleton
                variant="circular"
                animation="wave"
                width="2rem"
                height="2rem"
              />
            </a>
            <a href="#top">
              <Skeleton
                variant="circular"
                animation="wave"
                width="2rem"
                height="2rem"
              />
            </a>
          </OrderBtnBox>
        </DetailInfoBox>
        {/* 서비스소개 섹션 */}
        <IntroductionSection>
          <IntroductionWrap>
            <DescriptionWrap>
              <Skeleton
                variant="rectangular"
                animation="wave"
                width="100%"
                height="100%"
              />
              <Skeleton
                variant="rectangular"
                animation="wave"
                width="100%"
                height="100%"
              />
              <Skeleton
                variant="rectangular"
                animation="wave"
                width="100%"
                height="100%"
              />
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
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  width="100%"
                  height="100%"
                />
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
        </IntroductionSection>
      </DetailInfoWrap>
      <SuggestionSection>
        <h2>이 작가의 다른 작품</h2>
        <SuggestionImgWrap>
          {ProductsByArtistDummy.map((product) => (
            <Stack key={product.id} spacing={1}>
              <Skeleton
                variant="rectangular"
                animation="wave"
                width="100%"
                height="100%"
              />
            </Stack>
          ))}
        </SuggestionImgWrap>
      </SuggestionSection>
      <SuggestionSection>
        <h2>Lumiere의 추천 작품</h2>
        <SuggestionImgWrap>
          {ProductsByRandomDummy.map((product) => (
            <Stack key={product.id} spacing={1}>
              <Skeleton
                variant="rectangular"
                animation="wave"
                width="100%"
                height="100%"
              />
            </Stack>
          ))}
        </SuggestionImgWrap>
      </SuggestionSection>
    </ArtDetailWrap>
  );
};
