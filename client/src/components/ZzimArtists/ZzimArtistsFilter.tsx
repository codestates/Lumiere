/* eslint no-underscore-dangle: 0 */
import React, { useState } from 'react';
import instance from 'util/axios';
import SelectDeleteModal from 'components/Modal/ZzimSelectDeleteModal';
import { ZzimArtistsType } from 'util/type';
import { FilterMenuWrap, AllSelectLabelWrap, SelectBtnWrap } from './styled';

type ZzimArtistsProps = {
  checkBoxList: string[];
  setCheckBoxList: (check: string[]) => void;
  setArtistsState: (artistsState: ZzimArtistsType[]) => void;
  artistsState: ZzimArtistsType[];
};

export const ZzimArtistsFilter = ({
  checkBoxList,
  setCheckBoxList,
  setArtistsState,
  artistsState,
}: ZzimArtistsProps) => {
  const [isSelectModal, setIsSelectModal] = useState(false);
  const arr = artistsState.map((el) => el._id);
  const clickModalHandler = () => {
    if (checkBoxList.length) setIsSelectModal(!isSelectModal);
  };

  const selectDeleteHandler = () => {
    instance
      .patch('/artists/zzim', { artistId: checkBoxList, zzim: false })
      .then(() =>
        instance.get('/artists/zzim').then((res) => {
          setArtistsState(res.data);
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
          선택작가삭제
        </button>
      </SelectBtnWrap>
    </FilterMenuWrap>
  );
};
