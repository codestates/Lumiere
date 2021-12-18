/* eslint no-underscore-dangle: 0 */
import React, { useState } from 'react';
import instance from 'util/axios';
import CartSelectDeleteModal from 'components/Modal/CartSelectDeleteModal';
import { OrderProducts } from 'util/type';
import { CartMenuWrap, AllSelectLabelWrap, SelectBtnWrap } from './styled';

type CartProductsProps = {
  checkBoxList: string[];
  setCheckBoxList: (check: string[]) => void;
};

export const CartMenu = ({
  checkBoxList,
  setCheckBoxList,
}: CartProductsProps) => {
  const [isSelectModal, setIsSelectModal] = useState(false);

  const cartItems = localStorage.getItem('cartItems');
  const arr = JSON.parse(cartItems || '{}');

  const clickModalHandler = () => {
    setIsSelectModal(!isSelectModal);
  };

  const soldoutDeleteHandler = () => {
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
        window.location.assign('/error');
      });
  };

  const selectDeleteHandler = () => {
    const newArr = arr.filter((el: string) => {
      return !checkBoxList.includes(el);
    });
    localStorage.setItem('cartItems', JSON.stringify(newArr));
    window.location.reload();
  };

  const allCheckBoxHanlder = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.checked) {
      setCheckBoxList([...arr]);
    }

    if (!e.currentTarget.checked) {
      setCheckBoxList([]);
    }
  };

  return (
    <CartMenuWrap>
      {isSelectModal && (
        <CartSelectDeleteModal
          clickModalHandler={clickModalHandler}
          selectDeleteHandler={selectDeleteHandler}
        />
      )}
      <AllSelectLabelWrap>
        <label htmlFor="all-Check">
          <input
            type="checkbox"
            id="all-Check"
            onChange={allCheckBoxHanlder}
            checked={arr.length !== 0 && checkBoxList.length === arr.length}
          />
        </label>
        전체선택
      </AllSelectLabelWrap>
      <SelectBtnWrap>
        <button type="button" onClick={soldoutDeleteHandler}>
          품절작품삭제
        </button>
        <button type="button" onClick={clickModalHandler}>
          선택작품삭제
        </button>
      </SelectBtnWrap>
    </CartMenuWrap>
  );
};
