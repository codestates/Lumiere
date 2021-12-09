import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import instance from 'util/axios';
import Masonry from 'react-masonry-css';
import { AiOutlineHeart } from 'react-icons/ai';
import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import QuickBtns from 'components/QuickBtns/QuickBtns';
import FilteringTab from 'components/FilteringTab/FilteringTab';
import { Product } from '../../util/type';
import { ArtListContainer, ArtListWrap, ArtWrap, ArtInfoBox } from './styled';

const ArtList = () => {
  const [artList, setArtList] = useState<Array<Product>>([]);
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    767: 2,
  };

  useEffect(() => {
    // axios 요청
    instance
      .get<Product>('/products')
      .then((res) => {
        console.log(res.data);
        setArtList([res.data].flat());
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
            const { _id, title, image, artist, info } = art;
            const { name } = artist;
            const { size } = info;
            console.log(_id);
            return (
              <ArtWrap key={_id} className="my-masonry-grid_column">
                <Link to={`/artdetail/${_id}`}>
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
                </Link>
              </ArtWrap>
            );
          })}
        </Masonry>
      </ArtListWrap>
      <QuickBtns />
      <Footer />
    </ArtListContainer>
  );
};
export default ArtList;
