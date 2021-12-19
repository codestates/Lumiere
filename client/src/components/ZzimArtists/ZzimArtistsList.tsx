/* eslint no-underscore-dangle: 0 */
import ZzimDeleteModal from 'components/Modal/ZzimDeleteModal';
import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { ZzimArtistsType } from 'util/type';
import { Link } from 'react-router-dom';
import instance from 'util/axios';
import {
  ArtistsContentWrap,
  ArtistsContent,
  ImgWrap,
  ArtistDlWrap,
  ListDeleteBtnWrap,
  ListCheckLabelWrap,
  EmptyImageWrap,
} from './styled';

type ArtistsProps = {
  artistsState: ZzimArtistsType[];
  checkBoxList: string[];
  setCheckBoxList: (check: string[]) => void;
  setArtistsState: (artistsState: ZzimArtistsType[]) => void;
};

export const ZzimArtistsList = ({
  artistsState,
  checkBoxList,
  setCheckBoxList,
  setArtistsState,
}: ArtistsProps) => {
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
      .patch('/artists/zzim', { artistId: target, zzim: false })
      .then(() =>
        instance.get('/artists/zzim').then((res) => {
          setArtistsState(res.data);
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
    <ArtistsContentWrap>
      {isModal && (
        <ZzimDeleteModal
          clickModalHandler={clickModalHandler}
          deleteHandler={deleteHandler}
          deleteTarget={deleteTarget}
        />
      )}
      {artistsState.length === 0 ? (
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
        artistsState.map((el) => {
          return (
            <ArtistsContent key={el._id}>
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
                <Link to={`/artistdetail/${el._id}`}>
                  <img src={el.thumbnail} alt={`${el.name} ${el.thumbnail}`} />
                </Link>
              </ImgWrap>
              <ArtistDlWrap>
                <div
                  role="button"
                  tabIndex={0}
                  className="ddwrap"
                  onClick={() =>
                    window.location.assign(`/artistdetail/${el._id}`)
                  }
                  onKeyDown={() =>
                    window.location.assign(`/artistdetail/${el._id}`)
                  }
                >
                  <dt>{el.name}</dt>
                  <dd>{el.aka}</dd>
                  <dd>{`작품 수 : ${el.countOfWorks}`}</dd>
                </div>
                <div className="blankwrap"> </div>
              </ArtistDlWrap>
            </ArtistsContent>
          );
        })
      )}
    </ArtistsContentWrap>
  );
};
