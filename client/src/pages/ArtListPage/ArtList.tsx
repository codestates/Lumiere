import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import instance from 'util/axios';
import Masonry from 'react-masonry-css';
import { AiOutlineHeart } from 'react-icons/ai';
import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import QuickBtns from 'components/QuickBtns/QuickBtns';
import FilteringTab from 'components/FilteringTab/FilteringTab';
import PageNation from 'components/PageNation/PageNation';
import { AdminProductsType } from '../../util/type';
import { ArtListContainer, ArtListWrap, ArtWrap, ArtInfoBox } from './styled';

const ArtList = () => {
  const [curPage, setCurPage] = useState<number>(1);
  const [artList, setArtList] = useState<AdminProductsType>({
    products: [
      {
        artist: {
          code: '',
          name: '',
          aka: '',
          record: '',
          thumbnail: '',
          joinAt: new Date(),
          countOfWorks: 0,
          isActive: false,
        },
        artCode: '',
        title: '',
        image: '',
        theme: '',
        info: {
          details: '',
          size: '',
          canvas: 0,
          createdAt: '',
        },
        price: 0,
        view: 0,
        inStock: false,
        updatedAt: new Date(),
        _id: '',
      },
    ],
    page: 0,
    pages: 0,
  });
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    767: 2,
  };
  const pageChangeHandler = (page: number) => {
    setCurPage(page);
    instance
      .get<AdminProductsType>('/products', { params: { pageNumber: page } })
      .then((res) => {
        setArtList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    // axios 요청
    instance
      .get<AdminProductsType>('/products', { params: { pageNumber: curPage } })
      .then((res) => {
        setArtList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(artList.page);
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
          {artList.products.map((art, idx) => {
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
        <PageNation
          curPage={curPage}
          totalPages={artList.pages}
          pageChangeHandler={pageChangeHandler}
        />
      </ArtListWrap>
      <QuickBtns />
      <Footer />
    </ArtListContainer>
  );
};
export default ArtList;
