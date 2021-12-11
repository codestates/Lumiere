/* eslint no-underscore-dangle: 0 */
import { useState, useEffect } from 'react';
import PageNation from 'components/PageNation/PageNation';
import instance from 'util/axios';
import Masonry from 'react-masonry-css';
import { Product } from 'util/type';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { ArtWrap, ArtInfoBox } from './styled';

type GreetingProps = {
  art: Product;
  openLoginModalHandler: () => void;
};

export const ArtListMapping = ({
  art,
  openLoginModalHandler,
}: GreetingProps) => {
  const { _id, title, image, artist, info } = art;
  const { name } = artist;
  const { size } = info;
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    767: 2,
  };

  useEffect(() => {
    // axios 요청
    const userInfo = localStorage.getItem('lumiereUserInfo');
    setIsLiked(
      !!art.likes.find((el) => el === JSON.parse(userInfo || '{}')._id),
    );
  }, []);

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

  return (
    <ArtWrap key={_id} className="my-masonry-grid_column">
      <div
        role="button"
        tabIndex={0}
        onClick={() => window.location.assign(`/artdetail/${_id}`)}
        onKeyDown={() => window.location.assign(`/artdetail/${_id}`)}
      >
        <img src={image} alt={`최신작 ${_id}`} />
      </div>
      <ArtInfoBox>
        <div
          className="title"
          role="button"
          tabIndex={0}
          onClick={() => window.location.assign(`/artdetail/${_id}`)}
          onKeyDown={() => window.location.assign(`/artdetail/${_id}`)}
        >
          <h4>{title}</h4>
          <p>
            {name}
            <br />
            {size} ({art.info.canvas}호)
          </p>
        </div>
        <div className="heartIcon">
          {isLiked ? (
            <AiFillHeart className="likeit" onClick={() => likedHandler(_id)} />
          ) : (
            <AiOutlineHeart onClick={() => likedHandler(_id)} />
          )}
        </div>
      </ArtInfoBox>
    </ArtWrap>
  );
};
