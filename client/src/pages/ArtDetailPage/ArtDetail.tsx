/* eslint no-underscore-dangle: 0 */
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import instance from 'util/axios';
import { useComma } from 'util/functions';
import { ProductDetail } from 'util/type';
import Header from 'components/Header/Header';
import { useRecoilState } from 'recoil';
import { IsSigninState } from 'States/IsLoginState';
import QuickBtns from 'components/QuickBtns/QuickBtns';
import ShareBox from 'components/ShareBox/ShareBox';
import Introduction from 'components/Introduction/Introduction';
import Alert from 'components/Alert/Alert';
import { FiShare2 } from 'react-icons/fi';
import { MdOutlineArrowForwardIos } from 'react-icons/md';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import LoginGuideModal from 'components/Modal/LoginGuideModal';
import Footer from 'components/Footer/Footer';
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
import { LoadingArtDetail } from './Loading';

const ArtDetail = () => {
  const [isLogin, setIsLogin] = useRecoilState(IsSigninState);
  const [productDetail, setProductDetail] = useState<Array<ProductDetail>>([]);
  const [clickToShare, setClickToShare] = useState(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isOpenLoginModal, setIsOpenLoginModal] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState('success');
  const [alertMessage, setAlertMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const history = useNavigate();
  const currentUrl = window.location.href;

  useEffect(() => {
    setIsLoading(true);
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
        setIsLoading(false);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          alert('???????????? ?????????????????????. ?????? ?????????????????????.');
          localStorage.removeItem('lumiereUserInfo');
          setIsLogin(false);
          window.location.assign('/signin');
        } else window.location.assign('/error');
      });
  }, []);

  const addToCartHandler: (productId: string) => void = (productId) => {
    const cartItems = localStorage.getItem('cartItems');
    if (!isLogin) {
      openLoginModalHandler();
    } else if (!cartItems) {
      localStorage.setItem('cartItems', JSON.stringify([productId]));
      setSeverity('success');
      setAlertMessage('????????? ?????? ???????????? ???????????????!');
      alertOpenHandler();
    } else if (!JSON.parse(cartItems).includes(productId)) {
      const cartArr = JSON.parse(cartItems);
      cartArr.push(productId);
      localStorage.setItem('cartItems', JSON.stringify(cartArr));
      setSeverity('success');
      setAlertMessage('????????? ?????? ???????????? ???????????????!');
      alertOpenHandler();
    } else {
      setSeverity('warning');
      setAlertMessage('????????? ?????? ?????????????????? ?????? ????????????!');
      alertOpenHandler();
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
      .catch((err) => {
        if (err.response.status === 401 && isLogin) {
          alert('???????????? ?????????????????????. ?????? ?????????????????????.');
          localStorage.removeItem('lumiereUserInfo');
          setIsLogin(false);
          window.location.assign('/signin');
        }
      });
  };

  const purchaseHandler: (productId: string) => void = (productId) => {
    if (!isLogin) {
      openLoginModalHandler();
    } else {
      instance
        .get<ProductDetail>(`/products/${currentUrl.split('artdetail/')[1]}`)
        .then((res) => {
          if (res.data.productDetail.inStock) {
            history('/order', { state: { id: [productId] } });
          } else {
            alert('?????? ????????? ???????????????.');
          }
        })
        .catch((err) => {
          if (err.response.status === 401 && !isLogin) {
            alert('???????????? ?????????????????????. ?????? ?????????????????????.');
            localStorage.removeItem('lumiereUserInfo');
            setIsLogin(false);
            window.location.assign('/signin');
          } else window.location.assign('/error');
        });
    }
  };

  // Alert Handler (Snackbar)
  const alertOpenHandler = () => {
    setOpen(true);
  };

  const alertCloseHandler = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  // ShareBox ???????????? Alert Handler
  const linkCopyAlertHandler = () => {
    setSeverity('success');
    setAlertMessage('????????? ????????????????????? :-)');
    alertOpenHandler();
  };

  return (
    <ArtDetailContainer>
      <Header />
      {isLoading ? (
        <LoadingArtDetail />
      ) : (
        productDetail[0] && (
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
                        <ShareBox
                          clickToShareHandler={clickToShareHandler}
                          linkCopyAlertHandler={linkCopyAlertHandler}
                        />
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
                  <span>??????</span>
                  <div>
                    <Link
                      to={`/artistdetail/${productDetail[0].productDetail.artist._id}`}
                    >
                      {productDetail[0].productDetail.artist.name}(
                      {productDetail[0].productDetail.artist.aka})
                      <MdOutlineArrowForwardIos />
                    </Link>
                  </div>
                </div>
                <div>
                  <span>????????????</span>
                  <div>
                    {productDetail[0].productDetail.info.details}
                    <br />
                    {productDetail[0].productDetail.info.size}(
                    {productDetail[0].productDetail.info.canvas}???),
                    {productDetail[0].productDetail.info.createdAt}
                  </div>
                </div>
                <div>
                  <span>????????????</span>
                  <div>
                    A{productDetail[0].productDetail.artist.code}-
                    {productDetail[0].productDetail.artCode}
                  </div>
                </div>
                <div>
                  <span>????????????</span>
                  {productDetail[0].productDetail.inStock ? (
                    <div>
                      {useComma(productDetail[0].productDetail.price)}???
                    </div>
                  ) : (
                    <div>??????</div>
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
                    className={
                      productDetail[0].productDetail.inStock
                        ? 'addShoppingBag'
                        : 'buttonDisplayNone'
                    }
                    role="button"
                    tabIndex={0}
                  >
                    ?????? ?????????
                  </div>
                  <div
                    role="button"
                    tabIndex={0}
                    className={
                      productDetail[0].productDetail.inStock
                        ? 'primary_button'
                        : 'buttonDisplayNone '
                    }
                    onClick={() =>
                      purchaseHandler(productDetail[0].productDetail._id)
                    }
                    onKeyDown={() =>
                      purchaseHandler(productDetail[0].productDetail._id)
                    }
                  >
                    ????????????
                  </div>
                  <div
                    className={
                      productDetail[0].productDetail.inStock
                        ? 'buttonDisplayNone'
                        : 'primary_button cursorNone'
                    }
                  >
                    ?????? ???????????????
                  </div>
                  <Link to="#top" onClick={clickToShareHandler}>
                    {clickToShare && (
                      <div>
                        <ShareBox
                          clickToShareHandler={clickToShareHandler}
                          linkCopyAlertHandler={linkCopyAlertHandler}
                        />
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
              {/* ??????????????? ?????? */}
              <IntroductionSection>
                <Introduction
                  image={productDetail[0].productDetail.image}
                  title={productDetail[0].productDetail.title}
                />
              </IntroductionSection>
            </DetailInfoWrap>

            <SuggestionSection>
              <h2>??? ????????? ?????? ??????</h2>
              <Link
                to={`/artistdetail/${productDetail[0].productDetail.artist._id}`}
              >
                ?????????
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
                      <img
                        src={product.image}
                        alt={`????????? ?????? ?????? ${idx}`}
                      />
                    </div>
                  );
                })}
              </SuggestionImgWrap>
            </SuggestionSection>
            <SuggestionSection>
              <h2>Lumiere??? ?????? ??????</h2>
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
                        alt={`Lumiere??? ?????? ?????? ${idx}`}
                      />
                    </div>
                  );
                })}
              </SuggestionImgWrap>
            </SuggestionSection>
          </ArtDetailWrap>
        )
      )}
      <QuickBtns isLoading={isLoading} />
      <Footer />
      {/* Alert */}
      <Alert
        open={open}
        severity={severity}
        alertMessage={alertMessage}
        alertCloseHandler={alertCloseHandler}
      />
      {/* Modal */}
      {isOpenLoginModal && (
        <LoginGuideModal clickModalHandler={openLoginModalHandler} />
      )}
    </ArtDetailContainer>
  );
};
export default ArtDetail;
