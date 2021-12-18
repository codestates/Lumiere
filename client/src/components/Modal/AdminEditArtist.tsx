/* eslint no-underscore-dangle: 0 */
import { Artists } from 'util/type';
import adminInstance from 'util/axios';
import React, { useState } from 'react';
import dotenv from 'dotenv';
import {
  AdminEditProductWrap,
  AdminEditProductTextWrap,
  ButtonWrap,
  TitleWrap,
} from './styled';

dotenv.config();

type GreetingProps = {
  NO: () => void;
  el: Artists;
};

const AdminEditArtist = ({ NO, el }: GreetingProps) => {
  const [artistInfo, setArtistInfo] = useState<Artists>(el);

  const artistInfoHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.className === 'name') {
      setArtistInfo({
        ...artistInfo,
        name: e.target.value,
      });
    }
    if (e.target.className === 'enname') {
      setArtistInfo({
        ...artistInfo,
        aka: e.target.value,
      });
    }
    if (e.target.className === 'record') {
      setArtistInfo({
        ...artistInfo,
        record: e.target.value,
      });
    }
  };

  const nullGuard = () => {
    const res = Object.entries(artistInfo).map((el) => {
      if (el[1] === '' || !el[1]) return false;
      return true;
    });
    return res.every((el) => el);
  };

  const enrollHandler = () => {
    if (nullGuard()) {
      adminInstance
        .patch(`/artists/${artistInfo._id}`, {
          name: artistInfo.name,
          aka: artistInfo.aka,
          record: artistInfo.record,
        })
        .then((res) => {
          alert('작가 수정이 완료되었습니다.');
          window.location.reload();
        });
    } else {
      alert('오류발생, 빈칸없이 입력해주세요');
    }
  };

  return (
    <AdminEditProductWrap onClick={(e) => e.stopPropagation()}>
      <button type="button" onClick={NO} className="closeButton">
        &times;
      </button>
      <AdminEditProductTextWrap>
        <TitleWrap>작가 정보 수정</TitleWrap>
        <div>
          <span>고유번호</span>
          <input type="text" value={`A${artistInfo.code}`} disabled />
        </div>
        <div>
          <span>작가명</span>
          <input
            type="text"
            value={artistInfo.name}
            className="name"
            onChange={artistInfoHandler}
          />
        </div>
        <div>
          <span>활동명(영문)</span>
          <input
            type="text"
            value={artistInfo.aka}
            className="enname"
            onChange={artistInfoHandler}
          />
        </div>
        <div>
          <span>작가소개</span>
          <input
            value={artistInfo.record}
            className="record"
            onChange={artistInfoHandler}
          />
        </div>
      </AdminEditProductTextWrap>
      <ButtonWrap>
        <button type="button" onClick={enrollHandler}>
          확인
        </button>
        <button type="button" onClick={NO} className="nobutton">
          아니요
        </button>
      </ButtonWrap>
    </AdminEditProductWrap>
  );
};

export default AdminEditArtist;
