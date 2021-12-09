/* eslint no-underscore-dangle: 0 */
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import instance from 'util/axios';
import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import QuickBtns from 'components/QuickBtns/QuickBtns';
import { FiShare2 } from 'react-icons/fi';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import LoginGuideModal from 'components/Modal/LoginGuideModal';
import { ArtistDetailType } from '../../util/type';
import {
  ArtistListContainer,
  ArtistListWrap,
  ArtistWrap,
  ArtistRecordWrap,
  HeadWrap,
  HtagWrap,
  ButtonWrap,
  NumberOfWorksWrap,
} from './styled';

const ArtistDetail = () => {
  const [artistInfo, setArtistInfo] = useState<Array<ArtistDetailType>>([]);
  const [productFilter, setProductFilter] = useState([
    { image: '', inStock: true, _id: '' },
  ]);
  const [isClickCheckbox, setIsClickCheckbox] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isOpenLoginModal, setIsOpenLoginModal] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    // axios 요청
    const userInfo = localStorage.getItem('lumiereUserInfo');
    instance
      .get<ArtistDetailType>(`/artists/${location.state.id}`)
      .then((res) => {
        setArtistInfo([res.data].flat());
        setIsLiked(
          !![res.data][0].artistDetail.likes.find(
            (el) => el === JSON.parse(userInfo || '{}')._id,
          ),
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const clickCheckboxHandler = () => {
    setIsClickCheckbox(!isClickCheckbox);
    setProductFilter(
      artistInfo[0].products
        .filter((el) => el.inStock)
        .concat(artistInfo[0].products.filter((el) => !el.inStock)),
    );

    setIsLiked(
      !!artistInfo[0].artistDetail.likes.find(
        (el) => el === '61a438f08f72e06afed3a3192',
      ),
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
      .then(() => setIsLiked(!isLiked));
  };
  return (
    <ArtistListContainer>
      {console.log(artistInfo)}
      <Header />
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
            <FiShare2 />
            {isLiked ? (
              <AiFillHeart onClick={likedHandler} className="likeit"/>
            ) : (
              <AiOutlineHeart onClick={likedHandler} />
            )}
          </div>
        </HtagWrap>
        <h2 className="h2">작가의 말</h2>
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
      <ArtistListWrap>
        {artistInfo[0] &&
          (isClickCheckbox ? productFilter : artistInfo[0].products).map(
            (art, idx) => {
              const { _id, inStock, image } = art;
              return (
                <ArtistWrap key={_id} className="artistWrapBorder">
                  <Link to={`/artdetail/${_id}`} state={{ id: _id }}>
                    <div className="imageDiv">
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
      </ArtistListWrap>
      <QuickBtns />
      <Footer />
      {/* Modal */}
      {isOpenLoginModal && (
        <LoginGuideModal clickModalHandler={openLoginModalHandler} />
      )}
    </ArtistListContainer>
  );
};
export default ArtistDetail;
