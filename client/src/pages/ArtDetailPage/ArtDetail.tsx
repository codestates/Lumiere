import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import instance from 'util/axios';
// import { ProductDetail, ProductsByArtist, ProductsByRandom } from 'util/type';
import { ArtDetailContainer } from './styled';

const ArtDetail = () => {
  const [productDetail, setProductDetail] = useState({});
  // const [artListByArtist, setArtListByArtist] = useState([]);
  // const [productsByRandom, setProductsByRandom] = useState([]);
  // const [title, setTitle] = useState('');

  const location = useLocation();

  useEffect(() => {
    if (location.state.id) {
      instance
        .get(`/products/${location.state.id}`)
        .then((res) => {
          const {
            artCode,
            artist,
            image,
            inStock,
            info,
            likes,
            price,
            theme,
            title,
            _id,
          } = res.data.productDetail;
          // console.log('detail: ', productDetail);
          // console.log('artist: ', productsByArtist);
          // console.log('random: ', productsByRandom);
          // console.log(JSON.parse(res.data));
          // setProductDetail();
          // setArtListByArtist(productsByArtist);
          setProductDetail({
            code: artCode,
            artistInfo: artist,
            url: image,
            inStockValue: inStock,
            infoText: info,
            likesArr: likes,
            priceNum: price,
            themeText: theme,
            id: _id,
            titleText: title,
          });
          // setTitle(title);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);
  console.log(productDetail);
  return (
    <ArtDetailContainer>
      <h1>ArtDetail</h1>
      <span>hello</span>
      {/* <div>{artListByArtist.length ? artListByArtist : ''}</div> */}
      {/* <div>{title}</div> */}
      {/* <div>{productDetail.priceNum ? productDetail.priceNum : ''}</div> */}
    </ArtDetailContainer>
  );
};
export default ArtDetail;
