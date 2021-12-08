import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import instance from 'util/axios';
import { ProductDetail } from 'util/type';
import { ArtDetailContainer } from './styled';

const ArtDetail = () => {
  const [productDetail, setProductDetail] = useState<Array<ProductDetail>>([]);
  // const [artListByArtist, setArtListByArtist] = useState([]);
  // const [productsByRandom, setProductsByRandom] = useState([]);
  // const [title, setTitle] = useState('');

  const location = useLocation();

  useEffect(() => {
    if (location.state.id) {
      instance
        .get(`/products/${location.state.id}`)
        .then((res) => {
          console.log(res.data);
          setProductDetail([res.data].flat());
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);
  // console.log(productDetail[0].productDetail.artCode);
  return (
    <ArtDetailContainer>
      <h1>ArtDetail</h1>
      <span>hello</span>
      {productDetail[0] && (
        <div>
          {productDetail[0].productDetail.title}
          <img
            src={productDetail[0].productDetail.image}
            alt={productDetail[0].productDetail.title}
          />
        </div>
      )}
    </ArtDetailContainer>
  );
};
export default ArtDetail;
