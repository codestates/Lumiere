/* eslint no-underscore-dangle: 0 */
import ZzimDeleteModal from 'components/Modal/ZzimDeleteModal';
import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { useComma } from 'util/functions';
import { OrderProducts } from 'util/type';
import { Link } from 'react-router-dom';
import instance from 'util/axios';
import {
  ProductContentWrap,
  ProductContent,
  ImgWrap,
  ProductDlWrap,
  ListDeleteBtnWrap,
  ListCheckLabelWrap,
  EmptyImageWrap,
} from './styled';

type ProductsProps = {
  productState: OrderProducts[];
  checkBoxList: string[];
  setCheckBoxList: (check: string[]) => void;
  setProductState: (productState: OrderProducts[]) => void;
};

export const ZzimProductList = ({
  productState,
  checkBoxList,
  setCheckBoxList,
  setProductState,
}: ProductsProps) => {
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
    instance
      .patch('/products/zzim', { productId: target, zzim: false })
      .then(() =>
        instance.get('/products/zzim').then((res) => {
          setProductState(res.data);
          clickModalHandler();
        }),
      );
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
        <ZzimDeleteModal
          clickModalHandler={clickModalHandler}
          deleteHandler={deleteHandler}
          deleteTarget={deleteTarget}
        />
      )}
      {productState.length === 0 ? (
        <EmptyImageWrap>
          <img
            src={`/images/EmptyZzim/hanging-cat-${
              Math.floor(Math.random() * 2) + 1
            }.png`}
            alt="emptyCat"
          />
          <div>아직 아무것도 없네요!</div>
        </EmptyImageWrap>
      ) : (
        productState.map((el) => {
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
                <Link to={`/artdetail/${el._id}`}>
                  <img src={el.image} alt={`${el.artist} ${el.image}`} />
                </Link>
              </ImgWrap>
              <ProductDlWrap>
                <div
                  role="button"
                  tabIndex={0}
                  className="ddwrap"
                  onClick={() => window.location.assign(`/artdetail/${el._id}`)}
                  onKeyDown={() =>
                    window.location.assign(`/artdetail/${el._id}`)
                  }
                >
                  <dt>{el.title}</dt>
                  <dd>{el.artist.name}</dd>
                  <dd>{`${el.info.size} (${el.info.canvas}호)`}</dd>
                  <dd>{el.inStock ? `${useComma(el.price)} 원` : `품절`}</dd>
                </div>
                <div className="blankwrap"> </div>
              </ProductDlWrap>
            </ProductContent>
          );
        })
      )}
    </ProductContentWrap>
  );
};
