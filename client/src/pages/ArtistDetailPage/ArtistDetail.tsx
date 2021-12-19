/* eslint no-underscore-dangle: 0 */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import instance from 'util/axios';
import Header from 'components/Header/Header';
import { useRecoilState } from 'recoil';
import { IsSigninState } from 'States/IsLoginState';
import Footer from 'components/Footer/Footer';
import QuickBtns from 'components/QuickBtns/QuickBtns';
import ShareBox from 'components/ShareBox/ShareBox';
import Alert from 'components/Alert/Alert';
import { FiShare2 } from 'react-icons/fi';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import LoginGuideModal from 'components/Modal/LoginGuideModal';
import { ArtistDetailType } from '../../util/type';
import {
  ArtistDeatilContainer,
  ArtListWrap,
  ArtistWrap,
  ArtistRecordWrap,
  HeadWrap,
  HtagWrap,
  ButtonWrap,
  NumberOfWorksWrap,
} from './styled';
import { LoadingArtistDetail } from './Loading';

const ArtistDetail = () => {
  const [isLogin, setIsLogin] = useRecoilState(IsSigninState);
  const [artistInfo, setArtistInfo] = useState<Array<ArtistDetailType>>([]);
  const [productFilter, setProductFilter] = useState([
    { image: '', inStock: true, _id: '' },
  ]);
  const [isClickCheckbox, setIsClickCheckbox] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isOpenLoginModal, setIsOpenLoginModal] = useState<boolean>(false);
  const [clickToShare, setClickToShare] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState('success');
  const [alertMessage, setAlertMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    // axios 요청
    const userInfo = localStorage.getItem('lumiereUserInfo');
    instance
      .get<ArtistDetailType>(
        `/artists/${window.location.href.split('artistdetail/')[1]}`,
      )
      .then((res) => {
        setArtistInfo([res.data].flat());
        setIsLiked(
          !![res.data][0].artistDetail.likes.find(
            (el) => el === JSON.parse(userInfo || '{}')._id,
          ),
        );
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

  const clickCheckboxHandler = () => {
    setIsClickCheckbox(!isClickCheckbox);
    setProductFilter(
      artistInfo[0].products
        .filter((el) => el.inStock)
        .concat(artistInfo[0].products.filter((el) => !el.inStock)),
    );
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
      .patch('/artists/zzim', {
        artistId: artistInfo[0].artistDetail._id,
        zzim: !isLiked,
      })
      .then(() => setIsLiked(!isLiked))
      .catch((err) => {
        if (err.response.status === 401 && isLogin) {
          alert('로그인이 만료되었습니다. 다시 로그인해주세요.');
          localStorage.removeItem('lumiereUserInfo');
          setIsLogin(false);
          window.location.assign('/signin');
        }
      });
  };

  const clickToShareHandler = () => {
    setClickToShare(!clickToShare);
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

  // ShareBox 링크복사 Alert Handler
  const linkCopyAlertHandler = () => {
    setSeverity('success');
    setAlertMessage('링크가 복사되었습니다 :-)');
    alertOpenHandler();
  };

  return (
    <ArtistDeatilContainer>
      <Header />
      {isLoading ? (
        <LoadingArtistDetail />
      ) : (
        <>
          <HeadWrap>
            <HtagWrap>
              <div className="htags">
                <div>
                  <h1>{artistInfo[0] && artistInfo[0].artistDetail.name}</h1>
                </div>
                <div>
                  <h2>{artistInfo[0] && artistInfo[0].artistDetail.aka}</h2>
                </div>
              </div>
              <div className="buttonswrap">
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
            </HtagWrap>
            <h2>작가의 말</h2>
            <ArtistRecordWrap>
              {artistInfo[0] && artistInfo[0].artistDetail.record}
            </ArtistRecordWrap>
          </HeadWrap>
          <ButtonWrap>
            <div className="circle" />
            <div className="soldout">판매완료</div>
            <div className="filter">
              <label htmlFor="solding">
                <input
                  type="checkbox"
                  id="solding"
                  onClick={clickCheckboxHandler}
                />
              </label>
              판매 중인 작품 우선 보기
            </div>
          </ButtonWrap>
          <NumberOfWorksWrap>
            {artistInfo[0] && artistInfo[0].products.length}개의 작품
          </NumberOfWorksWrap>
          <ArtListWrap>
            {artistInfo[0] &&
              (isClickCheckbox ? productFilter : artistInfo[0].products).map(
                (art, idx) => {
                  const { _id, inStock, image } = art;
                  return (
                    <ArtistWrap key={_id}>
                      <Link to={`/artdetail/${_id}`} state={{ id: _id }}>
                        <div>
                          <img
                            src={image}
                            alt={`최신작 ${idx}`}
                            className={inStock ? '' : 'notInStock'}
                          />
                        </div>
                      </Link>
                    </ArtistWrap>
                  );
                },
              )}
          </ArtListWrap>
        </>
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
    </ArtistDeatilContainer>
  );
};
export default ArtistDetail;
