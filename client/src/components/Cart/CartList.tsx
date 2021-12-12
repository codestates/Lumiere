/* eslint no-underscore-dangle: 0 */
import CartDeleteModal from 'components/Modal/CartDeleteModal';
import React, { useState } from 'react';
import { VscPass } from 'react-icons/vsc';
import { IoMdClose } from 'react-icons/io';
import { useComma } from 'util/functions';
import { OrderProducts } from 'util/type';
import {
  ProductContentWrap,
  ProductContent,
  ImgWrap,
  ProductDlWrap,
  ListDeleteBtnWrap,
  ListCheckBtnWrap,
} from './styled';

type CartProductsProps = {
  // 배열을 넘겼으니 배열을 받아야함
  cartProductState: OrderProducts[];
};

export const CartList = ({ cartProductState }: CartProductsProps) => {
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

  return (
    <ProductContentWrap>
      {isModal && (
        <CartDeleteModal
          clickModalHandler={clickModalHandler}
          deleteHandler={deleteHandler}
          deleteTarget={deleteTarget}
        />
      )}
      {cartProductState.map((el) => {
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
              <dd>{`${el.info.size} (${el.info.canvas}호)`}</dd>
              <dd>{el.inStock ? `${useComma(el.price)} 원` : `품절`}</dd>
            </ProductDlWrap>
          </ProductContent>
        );
      })}
    </ProductContentWrap>
  );
};
