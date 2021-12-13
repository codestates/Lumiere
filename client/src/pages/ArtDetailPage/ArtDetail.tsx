/* eslint no-underscore-dangle: 0 */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import instance from 'util/axios';
import { useComma } from 'util/functions';
import { ProductDetail } from 'util/type';
import Header from 'components/Header/Header';
import QuickBtns from 'components/QuickBtns/QuickBtns';
import ShareBox from 'components/ShareBox/ShareBox';
import Introduction from 'components/Introduction/Introduction';
import { FiShare2 } from 'react-icons/fi';
import { MdOutlineArrowForwardIos } from 'react-icons/md';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import LoginGuideModal from 'components/Modal/LoginGuideModal';
import {
  ArtDetailContainer,
  ArtDetailWrap,
  DetailInfoWrap,
  DetailImgBox,
  IntroductionSection,
  DetailInfoBox,
  OrderBtnBox,
  SuggestionSection,
  SuggestionImgWrap,
} from './styled';

const ArtDetail = () => {
  const [productDetail, setProductDetail] = useState<Array<ProductDetail>>([]);
  const [clickToShare, setClickToShare] = useState(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isOpenLoginModal, setIsOpenLoginModal] = useState<boolean>(false);

  const currentUrl = window.location.href;

  useEffect(() => {
    const userInfo = localStorage.getItem('lumiereUserInfo');
    instance
      .get<ProductDetail>(`/products/${currentUrl.split('artdetail/')[1]}`)
      .then((res) => {
        setProductDetail([res.data].flat());
        setIsLiked(
          !!res.data.productDetail.likes.find(
            (el) => el === JSON.parse(userInfo || '{}')._id,
          ),
        );
      })
      .catch(() => {
        window.location.assign('/error');
      });
  }, []);

  const addToCartHandler: (productId: string) => void = (productId) => {
    const cartItems = localStorage.getItem('cartItems');
    if (!cartItems) {
      localStorage.setItem('cartItems', JSON.stringify([productId]));
    } else if (!JSON.parse(cartItems).includes(productId)) {
      const cartArr = JSON.parse(cartItems);
      cartArr.push(productId);
      localStorage.setItem('cartItems', JSON.stringify(cartArr));
    } else {
      alert('이미 장바구니에 담겨있습니다');
    }
  };

  const clickToShareHandler = () => {
    setClickToShare(!clickToShare);
  };

  const openLoginModalHandler = () => {
    setIsOpenLoginModal(!isOpenLoginModal);
  };

  const likedHandler = () => {
    const userInfo = localStorage.getItem('lumiereUserInfo');
    if (!userInfo) {
      openLoginModalHandler();
    }
    instance
      .patch('/products/zzim', {
        productId: productDetail[0].productDetail._id,
        zzim: !isLiked,
      })
      .then(() => setIsLiked(!isLiked))
      .catch(() => {
        window.location.assign('/error');
      });
  };

  return (
    <ArtDetailContainer>
      <Header />
      {productDetail[0] && (
        <ArtDetailWrap>
          <DetailInfoWrap>
            <DetailImgBox>
              <img
                src={productDetail[0].productDetail.image}
                alt={productDetail[0].productDetail.title}
              />
            </DetailImgBox>
            <DetailInfoBox>
              <div>
                <h4>{productDetail[0].productDetail.title}</h4>
                <div>
                  {clickToShare && (
                    <div>
                      <ShareBox clickToShareHandler={clickToShareHandler} />
                    </div>
                  )}
                  <FiShare2 onClick={clickToShareHandler} />
                  {isLiked ? (
                    <AiFillHeart onClick={likedHandler} className="likeit" />
                  ) : (
                    <AiOutlineHeart onClick={likedHandler} />
                  )}
                </div>
              </div>
              <div>
                <span>작가</span>
                <div>
                  <Link
                    to={`/artistdetail/${productDetail[0].productDetail.artist._id}`}
                  >
                    {productDetail[0].productDetail.artist.name}
                    <MdOutlineArrowForwardIos />
                  </Link>
                </div>
              </div>
              <div>
                <span>작품정보</span>
                <div>
                  {productDetail[0].productDetail.info.details}
                  <br />
                  {productDetail[0].productDetail.info.size}(
                  {productDetail[0].productDetail.info.canvas}호),
                  {productDetail[0].productDetail.info.createdAt}
                </div>
              </div>
              <div>
                <span>작품코드</span>
                <div>
                  A{productDetail[0].productDetail.artist.code}-
                  {productDetail[0].productDetail.artCode}
                </div>
              </div>
              <div>
                <span>작품금액</span>
                {productDetail[0].productDetail.inStock ? (
                  <div>{useComma(productDetail[0].productDetail.price)}원</div>
                ) : (
                  <div>품절</div>
                )}
              </div>
              <OrderBtnBox>
                <div
                  onClick={() =>
                    addToCartHandler(productDetail[0].productDetail._id)
                  }
                  onKeyPress={() =>
                    addToCartHandler(productDetail[0].productDetail._id)
                  }
                  role="button"
                  tabIndex={0}
                >
                  아트 쇼핑백
                </div>
                <div className="primary_button">바로구매</div>
                <Link to="#top" onClick={clickToShareHandler}>
                  {clickToShare && (
                    <div>
                      <ShareBox clickToShareHandler={clickToShareHandler} />
                    </div>
                  )}
                  <FiShare2 />
                </Link>
                <Link to="#top">
                  {isLiked ? (
                    <AiFillHeart onClick={likedHandler} className="likeit" />
                  ) : (
                    <AiOutlineHeart onClick={likedHandler} />
                  )}
                </Link>
              </OrderBtnBox>
            </DetailInfoBox>
            {/* 서비스소개 섹션 */}
            <IntroductionSection>
              <Introduction
                image={productDetail[0].productDetail.image}
                title={productDetail[0].productDetail.title}
              />
            </IntroductionSection>
          </DetailInfoWrap>

          <SuggestionSection>
            <h2>이 작가의 다른 작품</h2>
            <Link
              to={`/artistdetail/${productDetail[0].productDetail.artist._id}`}
            >
              더보기
              <MdOutlineArrowForwardIos />
            </Link>
            <SuggestionImgWrap>
              {productDetail[0].productsByArtist.map((product, idx) => {
                return (
                  <div
                    key={product._id}
                    role="button"
                    tabIndex={0}
                    onClick={() =>
                      window.location.assign(`/artdetail/${product._id}`)
                    }
                    onKeyDown={() =>
                      window.location.assign(`/artdetail/${product._id}`)
                    }
                  >
                    <img src={product.image} alt={`작가의 다른 작품 ${idx}`} />
                  </div>
                );
              })}
            </SuggestionImgWrap>
          </SuggestionSection>
          <SuggestionSection>
            <h2>Lumiere의 추천 작품</h2>
            <SuggestionImgWrap>
              {productDetail[0].productsByRandom.map((product, idx) => {
                return (
                  <div
                    key={product._id}
                    role="button"
                    tabIndex={0}
                    onClick={() =>
                      window.location.assign(`/artdetail/${product._id}`)
                    }
                    onKeyDown={() =>
                      window.location.assign(`/artdetail/${product._id}`)
                    }
                  >
                    <img
                      src={product.image}
                      alt={`Lumiere의 추천 작품 ${idx}`}
                    />
                  </div>
                );
              })}
            </SuggestionImgWrap>
          </SuggestionSection>
        </ArtDetailWrap>
      )}
      <QuickBtns />
      {/* Modal */}
      {isOpenLoginModal && (
        <LoginGuideModal clickModalHandler={openLoginModalHandler} />
      )}
    </ArtDetailContainer>
  );
};
export default ArtDetail;
