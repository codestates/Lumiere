import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import instance from 'util/axios';
import Header from 'components/Header/Header';
import { useRecoilState } from 'recoil';
import { IsSigninState } from 'States/IsLoginState';
import Footer from 'components/Footer/Footer';
import QuickBtns from 'components/QuickBtns/QuickBtns';
import PageNation from 'components/PageNation/PageNation';
import { ArtistsType } from '../../util/type';
import { LoadingArtistList } from './Loading';
import {
  ArtistListContainer,
  ArtistListWrap,
  ArtistWrap,
  ArtistInfoBox,
  NameWrap,
  CountWrap,
} from './styled';

const ArtistList = () => {
  const [isLogin, setIsLogin] = useRecoilState(IsSigninState);
  const [curPage, setCurPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(true);
  const [artistList, setArtistList] = useState<ArtistsType>({
    artists: [
      {
        code: '',
        name: '',
        aka: '',
        record: '',
        thumbnail: '',
        joinAt: new Date(),
        countOfWorks: 0,
        isActive: false,
        _id: '',
      },
    ],
    page: 0,
    pages: 0,
  });
  useEffect(() => {
    setIsLoading(true);
    instance
      .get<ArtistsType>('/artists')
      .then((res) => {
        setArtistList(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          alert('로그인이 만료되었습니다. 다시 로그인해주세요.');
          localStorage.removeItem('lumiereUserInfo');
          setIsLogin(false);
          window.location.assign('/signin');
        } else window.location.assign('/error');
      });
  }, []);

  const pageChangeHandler = (page: number) => {
    setCurPage(page);
    setIsLoading(true);
    instance
      .get<ArtistsType>('/artists', { params: { pageNumber: page } })
      .then((res) => {
        setArtistList(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          alert('로그인이 만료되었습니다. 다시 로그인해주세요.');
          localStorage.removeItem('lumiereUserInfo');
          setIsLogin(false);
          window.location.assign('/signin');
        } else window.location.assign('/error');
      });
  };

  return (
    <ArtistListContainer>
      <Header />
      <h1>작가소개</h1>
      <h2>저희 Lumière와 함께하고 있는 작가분들입니다.</h2>
      {isLoading ? (
        <LoadingArtistList />
      ) : (
        <ArtistListWrap>
          {artistList.artists.map((art, idx) => {
            const { _id, aka, name, thumbnail, countOfWorks } = art;
            return (
              <ArtistWrap key={_id} className="artistWrapBorder">
                <Link to={`/artistdetail/${_id}`}>
                  <div>
                    <img src={thumbnail} alt={`최신작 ${idx}`} />
                  </div>
                  <ArtistInfoBox>
                    <NameWrap>
                      <h4>{name}</h4>
                      <p>
                        {aka}
                        <br />
                      </p>
                    </NameWrap>
                    <CountWrap>
                      <div className="noneBottomBolder">작품</div>
                      <div>{countOfWorks}</div>
                    </CountWrap>
                  </ArtistInfoBox>
                </Link>
              </ArtistWrap>
            );
          })}
        </ArtistListWrap>
      )}
      <PageNation
        curPage={curPage}
        totalPages={artistList.pages}
        pageChangeHandler={pageChangeHandler}
      />
      <QuickBtns isLoading={isLoading} />
      <Footer />
    </ArtistListContainer>
  );
};
export default ArtistList;
