import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import instance from 'util/axios';
import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import QuickBtns from 'components/QuickBtns/QuickBtns';
import PageNation from 'components/PageNation/PageNation';
import { ArtistsType } from '../../util/type';
import {
  ArtistListContainer,
  ArtistListWrap,
  ArtistWrap,
  ArtistInfoBox,
  NameWrap,
  CountWrap,
} from './styled';

const ArtistList = () => {
  const [curPage, setCurPage] = useState<number>(1);
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
    instance
      .get<ArtistsType>('/artists')
      .then((res) => {
        console.log(res.data);
        setArtistList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const pageChangeHandler = (page: number) => {
    setCurPage(page);
    instance
      .get<ArtistsType>('/artists', { params: { pageNumber: page } })
      .then((res) => {
        setArtistList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <ArtistListContainer>
      <Header />
      <h1>작가소개</h1>
      <h2>저희 Lumière와 함께하고 있는 작가분들입니다.</h2>
      <ArtistListWrap>
        {artistList.artists.map((art, idx) => {
          const { _id, aka, name, thumbnail, countOfWorks } = art;
          return (
            <ArtistWrap key={_id} className="artistWrapBorder">
              <Link to={`/artistdetail/${_id}`}>
                <div className="imageDiv">
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
      <PageNation
        curPage={curPage}
        totalPages={artistList.pages}
        pageChangeHandler={pageChangeHandler}
      />
      <QuickBtns />
      <Footer />
    </ArtistListContainer>
  );
};
export default ArtistList;
