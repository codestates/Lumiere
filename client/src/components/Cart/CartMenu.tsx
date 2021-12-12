/* eslint no-underscore-dangle: 0 */
import instance from 'util/axios';
import { OrderProducts } from 'util/type';
import { VscPass } from 'react-icons/vsc';
import { CartMenuWrap, AllSelectBtnWrap, SelectBtnWrap } from './styled';

export const CartMenu = () => {
  const soldoutDeleteHandler = () => {
    const cartItems = localStorage.getItem('cartItems');
    const arr = JSON.parse(cartItems || '{}');
    instance
      .get('/products/cart-items', { params: { productId: arr } })
      .then((res) => {
        const newArr = res.data.filter((el: OrderProducts) => {
          return el.inStock === true;
        });
        localStorage.setItem(
          'cartItems',
          JSON.stringify(
            newArr.map((el: OrderProducts) => {
              return el._id;
            }),
          ),
        );
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <CartMenuWrap>
      <AllSelectBtnWrap>
        <button type="button">
          <div>
            <VscPass />
          </div>
          전체선택
        </button>
      </AllSelectBtnWrap>
      <SelectBtnWrap>
        <button type="button" onClick={soldoutDeleteHandler}>
          품절상품삭제
        </button>
        <button type="button">선택상품삭제</button>
      </SelectBtnWrap>
    </CartMenuWrap>
  );
};
