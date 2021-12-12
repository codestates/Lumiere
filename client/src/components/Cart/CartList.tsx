/* eslint no-underscore-dangle: 0 */
import CartDeleteModal from 'components/Modal/CartDeleteModal';
import CartNotListModal from 'components/Modal/CartNotListModal';
import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { useComma } from 'util/functions';
import { OrderProducts } from 'util/type';
import {
  ProductContentWrap,
  ProductContent,
  ImgWrap,
  ProductDlWrap,
  ListDeleteBtnWrap,
  ListCheckLabelWrap,
} from './styled';

type CartProductsProps = {
  // 배열을 넘겼으니 배열을 받아야함
  cartProductState: OrderProducts[];
  checkBoxList: string[];
  setCheckBoxList: (check: string[]) => void;
};

export const CartList = ({
  cartProductState,
  checkBoxList,
  setCheckBoxList,
}: CartProductsProps) => {
  const [isModal, setIsModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<string | undefined>('');

  const clickModalHandler = () => {
    setIsModal(!isModal);
  };

  const deleteModalHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    clickModalHandler();
    setDeleteTarget(e.currentTarget.dataset.id);
  };
  const deleteHandler = (target: string | undefined) => {
    const cartItems = localStorage.getItem('cartItems');
    const newArr = JSON.parse(cartItems || '{}').filter((el: string) => {
      return el !== target;
    });
    localStorage.setItem('cartItems', JSON.stringify(newArr));
    // 페이지 새로고침
    window.location.reload();
  };

  const checkBoxHanlder = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.checked) {
      setCheckBoxList([...checkBoxList, e.target.id]);
    }

    if (!e.currentTarget.checked && checkBoxList.includes(e.target.id)) {
      setCheckBoxList(checkBoxList.filter((el) => el !== e.target.id));
    }
  };

  return (
    <ProductContentWrap>
      {isModal && (
        <CartDeleteModal
          clickModalHandler={clickModalHandler}
          deleteHandler={deleteHandler}
          deleteTarget={deleteTarget}
        />
      )}
      {cartProductState.length === 0 ? (
        <CartNotListModal clickModalHandler={clickModalHandler} />
      ) : (
        // <div>아이우에오</div>
        cartProductState.map((el) => {
          return (
            <ProductContent key={el._id}>
              <ListDeleteBtnWrap>
                <button
                  type="button"
                  onClick={deleteModalHandler}
                  data-id={el._id}
                >
                  <IoMdClose />
                </button>
              </ListDeleteBtnWrap>
              <ListCheckLabelWrap>
                <label htmlFor={el._id}>
                  <input
                    type="checkbox"
                    id={el._id}
                    onChange={checkBoxHanlder}
                    checked={checkBoxList.includes(el._id)}
                  />
                </label>
              </ListCheckLabelWrap>
              <ImgWrap>
                <img src={el.image} alt={`${el.artist} ${el.image}`} />
              </ImgWrap>
              <ProductDlWrap>
                <dt>{el.title}</dt>
                <dd>{el.artist.name}</dd>
                <dd>{`${el.info.size} (${el.info.canvas}호)`}</dd>
                <dd>{el.inStock ? `${useComma(el.price)} 원` : `품절`}</dd>
              </ProductDlWrap>
            </ProductContent>
          );
        })
      )}
    </ProductContentWrap>
  );
};
