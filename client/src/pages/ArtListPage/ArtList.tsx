/* eslint no-underscore-dangle: 0 */
import { useState, useEffect } from 'react';
import instance from 'util/axios';
import Masonry from 'react-masonry-css';
import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import QuickBtns from 'components/QuickBtns/QuickBtns';
import FilteringTab from 'components/FilteringTab/FilteringTab';
import PageNation from 'components/PageNation/PageNation';
import LoginGuideModal from 'components/Modal/LoginGuideModal';
import { ArtListMapping } from 'components/ArtListMapping/ArtListMapping';
import { AdminProductsType } from '../../util/type';
import { ArtListContainer, ArtListWrap } from './styled';

const ArtList = () => {
  const [curPage, setCurPage] = useState<number>(1);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isOpenLoginModal, setIsOpenLoginModal] = useState<boolean>(false);
  const [artList, setArtList] = useState<AdminProductsType>({
    products: [
      {
        likes: [''],
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

  const openLoginModalHandler = () => {
    setIsOpenLoginModal(!isOpenLoginModal);
  };

  const likedHandler = (id: string | undefined) => {
    const userInfo = localStorage.getItem('lumiereUserInfo');
    if (!userInfo) {
      openLoginModalHandler();
    }
    instance
      .patch('/products/zzim', {
        productId: id,
        zzim: !isLiked,
      })
      .then(() => setIsLiked(!isLiked));
  };

  useEffect(() => {
    // axios 요청
    instance
      .get<AdminProductsType>('/products', { params: { pageNumber: curPage } })
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
          {artList.products.map((art) => {
            return (
              <ArtListMapping
                art={art}
                openLoginModalHandler={openLoginModalHandler}
                key={art._id}
              />
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
      {/* Modal */}
      {isOpenLoginModal && (
        <LoginGuideModal clickModalHandler={openLoginModalHandler} />
      )}
    </ArtListContainer>
  );
};
export default ArtList;
