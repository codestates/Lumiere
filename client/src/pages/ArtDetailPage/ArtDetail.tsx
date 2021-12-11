import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import instance from 'util/axios';
import { ProductDetail } from 'util/type';
import Header from 'components/Header/Header';
import QuickBtns from 'components/QuickBtns/QuickBtns';
import { FiShare2 } from 'react-icons/fi';
import { BiHeart } from 'react-icons/bi';
import { MdOutlineArrowForwardIos } from 'react-icons/md';
import {
  ArtDetailContainer,
  ArtDetailWrap,
  DetailInfoWrap,
  DetailImgBox,
  DetailInfoBox,
  OrderBtnBox,
} from './styled';

const ArtDetail = () => {
  const [productDetail, setProductDetail] = useState<Array<ProductDetail>>([]);
  const [artistId, setArtistId] = useState('');

  useEffect(() => {
    instance
      .get(`/products/${window.location.href.split('artdetail/')[1]}`)
      .then((res) => {
        const { _id } = res.data.productDetail.artist;
        setArtistId(_id);
        setProductDetail([res.data].flat());
      })
      .catch((err) => {
        window.location.replace('/error');
      });
  }, []);

  return (
    <ArtDetailContainer>
      <Header />
      <ArtDetailWrap>
        {productDetail[0] && (
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
                  <FiShare2 />
                  <BiHeart />
                </div>
              </div>
              <div>
                <span>작가</span>
                <div>
                  <Link
                    to={`/artistdetail/${artistId}`}
                    state={{ id: artistId }}
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
                  {productDetail[0].productDetail.info.size},{' '}
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
                  <div>
                    {productDetail[0].productDetail.price
                      .toString()
                      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
                    원
                  </div>
                ) : (
                  <div>품절</div>
                )}
              </div>
              <OrderBtnBox>
                <div>아트 쇼핑백</div>
                <div className="primary_button">바로구매</div>
                <Link to="#top">
                  <FiShare2 />
                </Link>
                <Link to="#top">
                  <BiHeart />
                </Link>
              </OrderBtnBox>
            </DetailInfoBox>
            <div className="test">hello</div>
          </DetailInfoWrap>
        )}
      </ArtDetailWrap>
      <QuickBtns />
    </ArtDetailContainer>
  );
};
export default ArtDetail;
