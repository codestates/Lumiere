/* eslint no-underscore-dangle: 0 */
import { Product, Artists } from 'util/type';
import instance from 'util/axios';
import React, { useState, useEffect } from 'react';
import S3 from 'react-aws-s3-typescript';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import {
  AdminEditProductWrap,
  AdminEditProductTextWrap,
  ButtonWrap,
  IntroduceText,
  TitleWrap,
} from './styled';

dotenv.config();

type GreetingProps = {
  NO: () => void;
  el: Artists;
};

const AdminEnrollProduct = ({ NO, el }: GreetingProps) => {
  const [productInfo, setProductInfo] = useState<Product>({
    likes: [''],
    artist: el,
    artCode: '',
    title: '',
    image: '',
    theme: '',
    info: {
      details: '',
      size: '',
      canvas: 0,
      createdAt: '',
    },
    price: 0,
    view: 0,
    inStock: true,
    updatedAt: new Date(),
  });

  useEffect(
    () =>
      setProductInfo({
        ...productInfo,
        artCode: makeDigit(el.countOfWorks + 1).toString(),
      }),
    [],
  );

  const [editImage, setEditImage] = useState(productInfo.image);
  const [isThumbnail, setIsThumbNail] = useState<boolean>(false);

  const productInfoHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.className === 'productTitle') {
      setProductInfo({ ...productInfo, title: e.target.value });
    }
    if (e.target.className === 'productArtist') {
      setProductInfo({
        ...productInfo,
        artist: { ...productInfo.artist, name: e.target.value },
      });
    }
    if (e.target.className === 'productDetails') {
      setProductInfo({
        ...productInfo,
        info: { ...productInfo.info, details: e.target.value },
      });
    }
    if (e.target.className === 'lesswidth productSize') {
      setProductInfo({
        ...productInfo,
        info: { ...productInfo.info, size: e.target.value },
      });
    }
    if (e.target.className === 'lesswidth textright') {
      setProductInfo({
        ...productInfo,
        info: { ...productInfo.info, canvas: +e.target.value },
      });
    }
    if (e.target.className === 'createdAt') {
      setProductInfo({
        ...productInfo,
        info: { ...productInfo.info, createdAt: e.target.value },
      });
    }
    if (e.target.className === 'price') {
      setProductInfo({
        ...productInfo,
        price: Number(e.target.value),
      });
    }
  };

  const makeDigit = (num: number) => {
    if (num >= 0 && num <= 9) return `000${num}`;
    if (num >= 10 && num <= 99) return `00${num}`;
    if (num >= 100 && num <= 999) return `0${num}`;
    if (num >= 1000 && num <= 9999) return num;
    return '1만을 넘음 관리자 문의';
  };

  const editHandler = () => {
    if (isThumbnail)
      instance.patch(`/artists/${el._id}`, { thumbnail: editImage });
    instance
      .post('/products', {
        ...productInfo,
      })
      .then(() => {
        alert('작품이 등록되었습니다.');
        window.location.reload();
      })
      .catch(() => {
        alert('오류발생 담당자에게 문의바랍니다.');
      });
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
    ReactS3Client.uploadFile(file, uuidv4()).then((data) => {
      setEditImage(data.location);
      setProductInfo({
        ...productInfo,
        image: data.location,
      });
    });
  };

  const setImageProductInfo = () => {
    setIsThumbNail(!isThumbnail);
  };

  const themeHandler = (e: string) => {
    setProductInfo({
      ...productInfo,
      theme: e,
    });
  };

  return (
    <AdminEditProductWrap onClick={(e) => e.stopPropagation()}>
      <button type="button" onClick={NO} className="closeButton">
        &times;
      </button>
      <AdminEditProductTextWrap>
        <TitleWrap>작가 정보</TitleWrap>
        <div>
          <span>고유번호</span>
          <input type="text" value={`A${el.code}`} disabled />
        </div>
        <div>
          <span>작가명</span>
          <input type="text" value={el.name} disabled />
        </div>
        <div>
          <span>활동명(영문)</span>
          <input type="text" value={el.aka} disabled />
        </div>
        <div>
          <span>작가소개</span>
          <IntroduceText value={el.record} disabled />
        </div>
        <TitleWrap>작품 등록</TitleWrap>
        <div>
          <span>작품 코드</span>
          <input
            type="text"
            value={`A${el.code}-${makeDigit(el.countOfWorks + 1)}`}
            disabled
          />
        </div>
        <div>
          <span>작품명</span>
          <input
            type="text"
            value={productInfo.title}
            onChange={productInfoHandler}
            className="productTitle"
          />
        </div>
        <div>
          <span>제작방법</span>
          <input
            type="text"
            value={productInfo.info.details}
            onChange={productInfoHandler}
            className="productDetails"
          />
        </div>
        <div className="marign-left">
          <span>작품테마</span>
          <button type="button" onClick={() => themeHandler('인물')}>
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
          <span>
            {productInfo.theme ? productInfo.theme : '<< 선택해주세요'}
          </span>
        </div>
        <div>
          <span className="leftMargin">작품 사이즈</span>
          <input
            type="text"
            value={productInfo.info.size}
            className="lesswidth productSize"
            onChange={productInfoHandler}
          />
          <span className="canvasSize">호 수</span>
          <input
            type="text"
            value={productInfo.info.canvas}
            className="lesswidth textright"
            onChange={productInfoHandler}
          />
          <span>호</span>
        </div>
        <div>
          <span>제작년도</span>
          <input
            type="text"
            value={productInfo.info.createdAt}
            className="createdAt"
            onChange={productInfoHandler}
          />
        </div>
        <div>
          <span>금액</span>
          <input
            type="text"
            value={productInfo.price}
            className="price"
            onChange={productInfoHandler}
          />
        </div>
        <div>
          <span>작품 이미지</span>
          <img src={editImage} alt="작품이미지" />
          <input
            type="checkbox"
            className="checkbox"
            onClick={setImageProductInfo}
          />
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
        <button type="button" onClick={editHandler}>
          확인
        </button>
        <button type="button" onClick={NO} className="nobutton">
          아니요
        </button>
      </ButtonWrap>
    </AdminEditProductWrap>
  );
};

export default AdminEnrollProduct;
