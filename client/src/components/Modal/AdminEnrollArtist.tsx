/* eslint no-underscore-dangle: 0 */
import { ArtistsProduct } from 'util/type';
import adminInstance from 'util/axios';
import React, { useState, useEffect } from 'react';
import S3 from 'react-aws-s3-typescript';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import {
  AdminEditProductWrap,
  AdminEditProductTextWrap,
  ButtonWrap,
  TitleWrap,
} from './styled';

dotenv.config();

type GreetingProps = {
  NO: () => void;
  el: ArtistsProduct;
  HowManyArtists: number;
};

const AdminEnrollArtist = ({ NO, el, HowManyArtists }: GreetingProps) => {
  const [artistInfo, setArtistInfo] = useState<ArtistsProduct>(el);
  const makeDigit = (num: number) => {
    if (num >= 0 && num <= 9) return `000${num}`;
    if (num >= 10 && num <= 99) return `00${num}`;
    if (num >= 100 && num <= 999) return `0${num}`;
    if (num >= 1000 && num <= 9999) return num;
    return '1만을 넘음 관리자 문의';
  };

  useEffect(
    () =>
      setArtistInfo({
        ...el,
        code: `${makeDigit(HowManyArtists)}`,
        artCode: '0001',
      }),
    [],
  );

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
    if (e.target.className === 'productTitle') {
      setArtistInfo({ ...artistInfo, title: e.target.value });
    }
    if (e.target.className === 'productDetails') {
      setArtistInfo({
        ...artistInfo,
        info: { ...artistInfo.info, details: e.target.value },
      });
    }
    if (e.target.className === 'lesswidth productSize') {
      setArtistInfo({
        ...artistInfo,
        info: { ...artistInfo.info, size: e.target.value },
      });
    }
    if (e.target.className === 'lesswidth textright') {
      setArtistInfo({
        ...artistInfo,
        info: { ...artistInfo.info, canvas: +e.target.value },
      });
    }
    if (e.target.className === 'createdAt') {
      setArtistInfo({
        ...artistInfo,
        info: { ...artistInfo.info, createdAt: e.target.value },
      });
    }
    if (e.target.className === 'price') {
      setArtistInfo({
        ...artistInfo,
        price: Number(e.target.value),
      });
    }
  };

  const nullGuard = () => {
    const res = Object.entries(artistInfo).map((el) => {
      if (el[1] === '' || !el[1]) return false;
      if (el[1] === 'info') {
        Object.entries(artistInfo.info).map((el) => {
          if (el[1] === '') return false;
          return true;
        });
      }
      return true;
    });
    return res.every((el) => el);
  };

  const enrollHandler = () => {
    if (nullGuard()) {
      adminInstance
        .post('/artists', {
          artist: {
            code: artistInfo.code,
            name: artistInfo.name,
            aka: artistInfo.aka,
            record: artistInfo.record,
            thumbnail: artistInfo.thumbnail,
          },
          product: {
            artCode: artistInfo.artCode,
            title: artistInfo.title,
            image: artistInfo.image,
            theme: artistInfo.theme,
            info: {
              details: artistInfo.info.details,
              size: artistInfo.info.size,
              canvas: artistInfo.info.canvas,
              createdAt: artistInfo.info.createdAt,
            },
            price: artistInfo.price,
          },
        })
        .then(() => {
          alert('작가 등록이 완료되었습니다.');
          window.location.reload();
        });
    } else {
      alert('오류발생, 빈칸없이 입력해주세요');
    }
  };

  const imageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const s3config = {
      bucketName: process.env.REACT_APP_BUCKET_NAME as string,
      region: process.env.REACT_APP_REGION as string,
      accessKeyId: process.env.REACT_APP_ACCESS_ID as string,
      secretAccessKey: process.env.REACT_APP_ACCESS_KEY as string,
    };
    const ReactS3Client = new S3(s3config);
    const file = e.target.files[0];
    ReactS3Client.uploadFile(file, uuidv4())
      .then((data) => {
        setArtistInfo({
          ...artistInfo,
          image: data.location,
          thumbnail: data.location,
        });
      })
      .catch(() => window.location.assign('/error'));
  };

  const themeHandler = (e: string) => {
    setArtistInfo({
      ...artistInfo,
      theme: e,
    });
  };
  return (
    <AdminEditProductWrap onClick={(e) => e.stopPropagation()}>
      <button type="button" onClick={NO} className="closeButton">
        &times;
      </button>
      <AdminEditProductTextWrap>
        <TitleWrap>작가 등록</TitleWrap>
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
        <TitleWrap>작품 등록</TitleWrap>
        <div>
          <span>작품 코드</span>
          <input type="text" value={artistInfo.artCode} disabled />
        </div>
        <div>
          <span>작품명</span>
          <input
            type="text"
            value={artistInfo.title}
            onChange={artistInfoHandler}
            className="productTitle"
          />
        </div>
        <div>
          <span>제작방법</span>
          <input
            type="text"
            value={artistInfo.info.details}
            onChange={artistInfoHandler}
            className="productDetails"
          />
        </div>
        <div className="marign-left">
          <span>작품테마</span>
          <button
            type="button"
            onClick={() => themeHandler('인물')}
            className="test"
          >
            인물
          </button>
          <button type="button" onClick={() => themeHandler('풍경')}>
            풍경
          </button>
          <button type="button" onClick={() => themeHandler('정물')}>
            정물
          </button>
          <button type="button" onClick={() => themeHandler('동물')}>
            동물
          </button>
          <button type="button" onClick={() => themeHandler('상상')}>
            상상
          </button>
          <button type="button" onClick={() => themeHandler('추상')}>
            추상
          </button>
          <span>{artistInfo.theme ? artistInfo.theme : '<< 선택해주세요'}</span>
        </div>
        <div>
          <span className="leftMargin">작품 사이즈</span>
          <input
            type="text"
            value={artistInfo.info.size}
            className="lesswidth productSize"
            onChange={artistInfoHandler}
          />
          <span className="canvasSize">호 수</span>
          <input
            type="text"
            value={artistInfo.info.canvas}
            className="lesswidth textright"
            onChange={artistInfoHandler}
          />
          <span>호</span>
        </div>
        <div>
          <span>제작년도</span>
          <input
            type="text"
            value={artistInfo.info.createdAt}
            className="createdAt"
            onChange={artistInfoHandler}
          />
        </div>
        <div>
          <span>금액</span>
          <input
            type="text"
            value={artistInfo.price}
            className="price"
            onChange={artistInfoHandler}
          />
        </div>
        <div>
          <span>작품 이미지</span>
          <img src={artistInfo.image} alt="작품이미지" />
          <input type="checkbox" className="checkbox" defaultChecked />
          <span>작가 썸네일로 사용</span>
          <div>
            <input
              id="editicon"
              type="file"
              accept="image/*"
              onChange={imageHandler}
            />
          </div>
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

export default AdminEnrollArtist;
