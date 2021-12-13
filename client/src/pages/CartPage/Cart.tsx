import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';
import { useState, useEffect } from 'react';
import instance from 'util/axios';
import { OrderProducts } from 'util/type';
import { CartMenu } from 'components/Cart/CartMenu';
import { CartList } from 'components/Cart/CartList';
import { CartPay } from 'components/Cart/CartPay';
import {
  CartContainer,
  CartTitle,
  CartContentWrap,
  CartTitleWrap,
  CartContentLeftWrap,
} from './styled';

const Cart = () => {
  // 로컬스토리지 상태관리
  const [cartListState, setCartListState] = useState<string[]>([]);

  // CheckBox 상태 관리
  const [checkBoxList, setCheckBoxList] = useState<string[]>([]);

  // 작품 상태
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

  const [totalPriceState, setTotalPriceState] = useState<number>(0);

  // 로컬스토리지 갱신을 위한 useEffect
  useEffect(() => {
    const localInfo = localStorage.getItem('cartItems');
    setCartListState(JSON.parse(localInfo || '[]'));
  }, []);

  // 작품 정보및 품절 여부 받아오기위한 useEffect
  useEffect(() => {
    instance
      .get('/products/cart-items', { params: { productId: cartListState } })
      .then((res) => {
        setCartProductState(res.data);
      })
      .catch((err) => {
        window.location.assign('/error');
        console.log(err);
      });
  }, [cartListState]);

  useEffect(() => {
    setTotalPriceState(
      cartProductState.reduce((acc, cur) => {
        if (cur.inStock) {
          return acc + cur.price;
        }
        return acc;
      }, 0),
    );
  }, [cartProductState]);

  return (
    <CartContainer>
      <Header />
      <CartTitleWrap>
        <CartTitle>아트 쇼핑백</CartTitle>
      </CartTitleWrap>
      <CartContentWrap>
        <CartContentLeftWrap>
          <CartMenu
            checkBoxList={checkBoxList}
            setCheckBoxList={setCheckBoxList}
          />
          <CartList
            cartProductState={cartProductState}
            checkBoxList={checkBoxList}
            setCheckBoxList={setCheckBoxList}
          />
        </CartContentLeftWrap>
        <CartPay
          totalPriceState={totalPriceState}
          cartListState={cartListState}
          setCartProductState={setCartProductState}
          cartProductState={cartProductState}
        />
      </CartContentWrap>
      <Footer />
    </CartContainer>
  );
};
export default Cart;
