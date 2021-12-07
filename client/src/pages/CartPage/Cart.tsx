import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';
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
  return (
    <CartContainer>
      <Header />
      <CartTitleWrap>
        <CartTitle>아트 쇼핑백</CartTitle>
      </CartTitleWrap>
      <CartContentWrap>
        <CartContentLeftWrap>
          <CartMenu />
          <CartList />
        </CartContentLeftWrap>
        <CartPay />
      </CartContentWrap>
      <Footer />
    </CartContainer>
  );
};
export default Cart;
