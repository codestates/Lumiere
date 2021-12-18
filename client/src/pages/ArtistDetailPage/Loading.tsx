import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import {
  ArtListWrap,
  ArtistWrap,
  ArtistRecordWrap,
  HeadWrap,
  HtagWrap,
  ButtonWrap,
  NumberOfWorksWrap,
} from './styled';
import { ArtListDummy } from './dummy';

export const LoadingArtistDetail = () => {
  return (
    <>
      <HeadWrap>
        <HtagWrap>
          <div
            className="htags"
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              marginTop: '3rem',
              paddingRight: '2rem',
              textAlign: 'left',
            }}
          >
            <Skeleton
              variant="text"
              animation="wave"
              width="100%"
              height="2.2rem"
              style={{ minWidth: '20vw', marginRight: '1rem' }}
            />
            <Skeleton
              variant="text"
              animation="wave"
              width="100%"
              height="1.5rem"
              style={{ minWidth: '10vw', marginRight: '1rem' }}
            />
          </div>
          <div className="buttonswrap">
            <Skeleton
              variant="circular"
              animation="wave"
              width="2rem"
              height="2rem"
              style={{ display: 'inline-block' }}
            />
            <Skeleton
              variant="circular"
              animation="wave"
              width="2rem"
              height="2rem"
              style={{ display: 'inline-block', marginLeft: '0.4rem' }}
            />
          </div>
        </HtagWrap>
        <h2>작가의 말</h2>
        <ArtistRecordWrap>
          <Stack spacing={1}>
            <Skeleton
              variant="text"
              animation="wave"
              width="100%"
              height="2.5rem"
            />
          </Stack>
        </ArtistRecordWrap>
      </HeadWrap>
      <ButtonWrap>
        <div className="circle" />
        <div className="soldout">판매완료</div>
        <div className="filter">
          <label htmlFor="solding">
            <input type="checkbox" id="solding" />
          </label>
          판매 중인 작품 우선 보기
        </div>
      </ButtonWrap>
      <NumberOfWorksWrap>0 개의 작품</NumberOfWorksWrap>
      <ArtListWrap>
        {ArtListDummy.map((art) => (
          <ArtistWrap key={art.id} className="artistWrapBorder">
            <a href="#top">
              <div className="imageDiv">
                <Stack
                  spacing={1}
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                  }}
                >
                  <Skeleton
                    variant="rectangular"
                    animation="wave"
                    width="100%"
                    height="100%"
                  />
                </Stack>
              </div>
            </a>
          </ArtistWrap>
        ))}
      </ArtListWrap>
    </>
  );
};
