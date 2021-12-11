import { useState, useEffect } from 'react';
import { VscPass } from 'react-icons/vsc';
import { IoMdClose } from 'react-icons/io';
import { useComma } from 'util/functions';
import instance from 'util/axios';
import { OrderProducts } from 'util/type';
import {
  ProductContentWrap,
  ProductContent,
  ImgWrap,
  ProductDlWrap,
  ListDeleteBtnWrap,
  ListCheckBtnWrap,
} from './styled';

export const CartList = ({ cartListState }: { cartListState: string[] }) => {
  // 상품정보 상태 관리
  const [cartProductState, setCartProductState] = useState<
    Array<OrderProducts>
  >([
    {
      artist: {
        _id: '',
        name: '',
      },
      image: '',
      inStock: true,
      info: {
        size: '',
        canvas: 0,
      },
      price: 0,
      title: '',
      _id: '',
    },
  ]);

  useEffect(() => {
    instance
      .get('/products/cart-items', { params: { productId: cartListState } })
      .then((res) => {
        setCartProductState(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [cartListState]);

  console.log(cartProductState);

  return (
    <ProductContentWrap>
      {cartProductState.map((el) => {
        return (
          <ProductContent key={el.title}>
            <ListDeleteBtnWrap>
              <button type="button">
                <IoMdClose />
              </button>
            </ListDeleteBtnWrap>
            <ListCheckBtnWrap>
              <button type="button">
                <VscPass />
              </button>
            </ListCheckBtnWrap>
            <ImgWrap>
              <img src={el.image} alt={`${el.artist} ${el.image}`} />
            </ImgWrap>
            <ProductDlWrap>
              <dt>{el.title}</dt>
              <dd>{el.artist.name}</dd>
              <dd>{`${el.info.size}(${el.info.canvas}호)`}</dd>
              <dd>{`${useComma(el.price)} 원`}</dd>
            </ProductDlWrap>
          </ProductContent>
        );
      })}
    </ProductContentWrap>
  );
};
