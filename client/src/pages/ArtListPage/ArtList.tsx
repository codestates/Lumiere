import { useState, useEffect } from 'react';
import instance from 'util/axios';
import Masonry from 'react-masonry-css';
import { AiOutlineHeart } from 'react-icons/ai';
import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import FilteringTab from 'components/FilteringTab/FilteringTab';
import { ArtListContainer, ArtListWrap, ArtWrap, ArtInfoBox } from './styled';

const ArtList = () => {
  const [artList, setArtList] = useState([]);
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    767: 2,
  };

  useEffect(() => {
    // axios 요청
    instance
      .get('/products')
      .then((res) => {
        console.log(res.data);
        setArtList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <ArtListContainer>
      <Header />
      <FilteringTab />
      <ArtListWrap>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {artList.map((art, idx) => {
            const { id, title, image, artist, info } = art;
            const { name } = artist;
            const { size } = info;
            console.log(art);
            return (
              <ArtWrap key={id} className="my-masonry-grid_column">
                <img src={image} alt={`최신작 ${idx}`} />
                <ArtInfoBox>
                  <h4>{title}</h4>
                  <p>
                    {name}
                    <br />
                    {size}
                  </p>
                  <AiOutlineHeart />
                </ArtInfoBox>
              </ArtWrap>
            );
          })}
        </Masonry>
      </ArtListWrap>
      <Footer />
    </ArtListContainer>
  );
};
export default ArtList;
