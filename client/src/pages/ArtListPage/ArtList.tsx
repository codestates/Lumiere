/* eslint no-underscore-dangle: 0 */
import { useState } from 'react';
import instance from 'util/axios';
import Masonry from 'react-masonry-css';
import Header from 'components/Header/Header';
import { useRecoilState } from 'recoil';
import { IsSigninState } from 'States/IsLoginState';
import Footer from 'components/Footer/Footer';
import QuickBtns from 'components/QuickBtns/QuickBtns';
import FilteringTab from 'components/FilteringTab/FilteringTab';
import PageNation from 'components/PageNation/PageNation';
import LoginGuideModal from 'components/Modal/LoginGuideModal';
import { ArtListMapping } from 'components/ArtListMapping/ArtListMapping';
import { AdminProductsType } from '../../util/type';
import { ArtListContainer, ArtListWrap } from './styled';
import { LoadingArtList } from './Loading';
import { ArtListDummy } from './dummy';

const ArtList = () => {
  const [isLogin, setIsLogin] = useRecoilState(IsSigninState);
  const [curPage, setCurPage] = useState<number>(1);
  const [isOpenLoginModal, setIsOpenLoginModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
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

  // `/products?keyword=${keyword}&pageNumber=${pageNumber}` 요청 API 주소
  const pageChangeHandler = (page: number) => {
    setCurPage(page);
    setIsLoading(true);
    instance
      .get<AdminProductsType>('/products', { params: { pageNumber: page } })
      .then((res) => {
        setArtList(res.data);
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

  const openLoginModalHandler = () => {
    setIsOpenLoginModal(!isOpenLoginModal);
  };

  const filteringHandler = (type: {
    theme?: string;
    sizeMin?: number;
    sizeMax?: number;
    priceMin?: number;
    priceMax?: number;
  }) => {
    if (!type) {
      setIsLoading(true);
      instance
        .get<AdminProductsType>('/products', {
          params: { pageNumber: curPage },
        })
        .then((res) => {
          setArtList(res.data);
          setIsLoading(false);
        })
        .catch((err) => {
          if (err.response.status === 401 && isLogin) {
            alert('로그인이 만료되었습니다. 다시 로그인해주세요.');
            localStorage.removeItem('lumiereUserInfo');
            setIsLogin(false);
            window.location.assign('/signin');
          } else window.location.assign('/error');
        });
    } else {
      setCurPage(1);
      setIsLoading(true);
      instance
        .get('/products/filter', {
          params: {
            pageNumber: 1,
            theme: type.theme,
            sizeMin: type.sizeMin,
            sizeMax: type.sizeMax,
            priceMin: type.priceMin,
            priceMax: type.priceMax,
          },
        })
        .then((res) => {
          setArtList(res.data);
          setIsLoading(false);
        })
        .catch((err) => {
          if (err.response.status === 401 && isLogin) {
            alert('로그인이 만료되었습니다. 다시 로그인해주세요.');
            localStorage.removeItem('lumiereUserInfo');
            setIsLogin(false);
            window.location.assign('/signin');
          } else window.location.assign('/error');
        });
    }
  };

  return (
    <ArtListContainer>
      <Header />
      <FilteringTab filteringHandler={filteringHandler} />
      <ArtListWrap>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {isLoading
            ? ArtListDummy.map((art) => <LoadingArtList key={art.id} />)
            : artList.products.map((art) => {
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
      <QuickBtns isLoading={isLoading} />
      <Footer />
      {/* Modal */}
      {isOpenLoginModal && (
        <LoginGuideModal clickModalHandler={openLoginModalHandler} />
      )}
    </ArtListContainer>
  );
};

export default ArtList;
