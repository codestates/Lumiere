/* eslint no-underscore-dangle: 0 */
import React, { useState } from 'react';
import instance from 'util/axios';
import SelectDeleteModal from 'components/Modal/ZzimSelectDeleteModal';
import { OrderProducts } from 'util/type';
import { FilterMenuWrap, AllSelectLabelWrap, SelectBtnWrap } from './styled';

type ZzimProductsProps = {
  checkBoxList: string[];
  setCheckBoxList: (check: string[]) => void;
  setProductState: (productState: OrderProducts[]) => void;
  productState: OrderProducts[];
};

export const ZzimProductsFilter = ({
  checkBoxList,
  setCheckBoxList,
  setProductState,
  productState,
}: ZzimProductsProps) => {
  const [isSelectModal, setIsSelectModal] = useState(false);
  const arr = productState.map((el) => el._id);
  const clickModalHandler = () => {
    if (checkBoxList.length) setIsSelectModal(!isSelectModal);
  };

  const selectDeleteHandler = () => {
    instance
      .patch('/products/zzim', { productId: checkBoxList, zzim: false })
      .then(() =>
        instance.get('/products/zzim').then((res) => {
          setProductState(res.data);
          clickModalHandler();
        }),
      );
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
    <FilterMenuWrap>
      {isSelectModal && (
        <SelectDeleteModal
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
        <button type="button" onClick={clickModalHandler}>
          선택작품삭제
        </button>
      </SelectBtnWrap>
    </FilterMenuWrap>
  );
};
