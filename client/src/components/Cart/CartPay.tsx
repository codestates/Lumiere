/* eslint no-underscore-dangle: 0 */
import { TiEquals, TiPlus } from 'react-icons/ti';
import { useState } from 'react';
import instance from 'util/axios';
import { useNavigate } from 'react-router-dom';
import CartSoldOutModal from 'components/Modal/CartSoldOutModal';
import { useComma } from 'util/functions';
import { OrderProducts } from 'util/type';
import {
  CartPayWrap,
  CartPayContentWrap,
  CartPayCountWrap,
  CartPayDescriptionWrap,
  CartPayClickBtn,
} from './styled';

type CartProps = {
  // 배열을 넘겼으니 배열을 받아야함
  totalPriceState: number;
  checkBoxList: string[];
  cartListState: string[];
  cartProductState: OrderProducts[];
  setCartProductState: (check: OrderProducts[]) => void;
};

export const CartPay = ({
  totalPriceState,
  checkBoxList,
  cartListState,
  cartProductState,
  setCartProductState,
}: CartProps) => {
  const [isSoldOutModal, setIsSoldOutModal] = useState(false);

  const history = useNavigate();

  const orderSoldOutHandler = () => {
    instance
      .get('/products/cart-items', { params: { productId: cartListState } })
      .then((res) => {
        setCartProductState(res.data);
        const newArr = cartProductState.filter((el) => {
          return checkBoxList.includes(el._id) && el.inStock;
        });
        if (checkBoxList.length === 0) {
          clickModalHandler();
          return;
        }
        if (newArr.length === checkBoxList.length) {
          history('/order', { state: { id: checkBoxList } });
        } else {
          clickModalHandler();
        }
      })
      .catch(() => {
        window.location.assign('/error');
      });
  };

  const clickModalHandler = () => {
    setIsSoldOutModal(!isSoldOutModal);
  };

  return (
    <CartPayWrap>
      {isSoldOutModal && (
        <CartSoldOutModal clickModalHandler={clickModalHandler} />
      )}
      <CartPayContentWrap>
        <CartPayCountWrap>
          <CartPayDescriptionWrap>
            <dt>총 상품 금액</dt>
            <dd>{`${useComma(totalPriceState)}원`}</dd>
          </CartPayDescriptionWrap>
          <TiPlus />
          <CartPayDescriptionWrap>
            <dt>배송비</dt>
            <dd>{totalPriceState === 0 ? `0 원` : `10,000원`}</dd>
          </CartPayDescriptionWrap>
          <TiEquals />
          <CartPayDescriptionWrap>
            <dt>결제예정금액</dt>
            <dd>
              {totalPriceState === 0
                ? `${useComma(totalPriceState)}원`
                : `${useComma(totalPriceState + 10000)}원`}
            </dd>
          </CartPayDescriptionWrap>
        </CartPayCountWrap>
        <CartPayClickBtn type="button" onClick={orderSoldOutHandler}>
          주문하기
        </CartPayClickBtn>
      </CartPayContentWrap>
    </CartPayWrap>
  );
};
