import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';
import { useState, useEffect } from 'react';
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
  //  최초로 카트페이지에 들어오는 순간 로컬스토리지에 있는 배열을  상태에 담음 (배열은 전역관리)
  //  배열을 cartList에 넘겨서 useEffect로 상품 정보를 랜더링 (CartList컴포너트)
  //  배열을 cartPay를 넘겨서 총액 계산

  // 로컬스토리지 배열 상태에 담기
  const [cartListState, setCartListState] = useState<string[]>([]);

  // 로컬스토리지 갱신을 위한 useEffect
  useEffect(() => {
    const localInfo = localStorage.getItem('cartItems');
    setCartListState(JSON.parse(localInfo || '[]'));
  }, []);

  return (
    <CartContainer>
      <Header />
      <CartTitleWrap>
        <CartTitle>아트 쇼핑백</CartTitle>
      </CartTitleWrap>
      <CartContentWrap>
        <CartContentLeftWrap>
          <CartMenu />
          <CartList cartListState={cartListState} />
        </CartContentLeftWrap>
        <CartPay />
      </CartContentWrap>
      <Footer />
    </CartContainer>
  );
};
export default Cart;
