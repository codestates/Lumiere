import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import instance from 'util/axios';
import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import QuickBtns from 'components/QuickBtns/QuickBtns';
import { Artists } from '../../util/type';
import {
  ArtistListContainer,
  ArtistListWrap,
  ArtistWrap,
  ArtistInfoBox,
  NameWrap,
  CountWrap,
} from './styled';

const ArtistList = () => {
  const [artistList, setArtistList] = useState<Array<Artists>>([]);

  useEffect(() => {
    instance
      .get<Artists>('/artists')
      .then((res) => {
        setArtistList([res.data].flat());
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <ArtistListContainer>
      <Header />
      <h1>작가소개</h1>
      <h2>저희 Lumière와 함께하고 있는 작가분들입니다.</h2>
      <ArtistListWrap>
        {artistList.map((art, idx) => {
          const { _id, aka, name, thumbnail, countOfWorks } = art;
          // const { name } = artist;
          return (
            <ArtistWrap key={_id} className="artistWrapBorder">
              <Link to={`/artistdetail/${_id}`} state={{ id: _id }}>
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
      <QuickBtns />
      <Footer />
    </ArtistListContainer>
  );
};
export default ArtistList;
