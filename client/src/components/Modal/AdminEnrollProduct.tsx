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
    return '1?????? ?????? ????????? ??????';
  };

  const editHandler = () => {
    if (isThumbnail)
      instance.patch(`/artists/${el._id}`, { thumbnail: editImage });
    instance
      .post('/products', {
        ...productInfo,
      })
      .then(() => {
        alert('????????? ?????????????????????.');
        window.location.reload();
      })
      .catch(() => {
        alert('???????????? ??????????????? ??????????????????.');
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
        <TitleWrap>?????? ??????</TitleWrap>
        <div>
          <span>????????????</span>
          <input type="text" value={`A${el.code}`} disabled />
        </div>
        <div>
          <span>?????????</span>
          <input type="text" value={el.name} disabled />
        </div>
        <div>
          <span>?????????(??????)</span>
          <input type="text" value={el.aka} disabled />
        </div>
        <div>
          <span>????????????</span>
          <IntroduceText value={el.record} disabled />
        </div>
        <TitleWrap>?????? ??????</TitleWrap>
        <div>
          <span>?????? ??????</span>
          <input
            type="text"
            value={`A${el.code}-${makeDigit(el.countOfWorks + 1)}`}
            disabled
          />
        </div>
        <div>
          <span>?????????</span>
          <input
            type="text"
            value={productInfo.title}
            onChange={productInfoHandler}
            className="productTitle"
          />
        </div>
        <div>
          <span>????????????</span>
          <input
            type="text"
            value={productInfo.info.details}
            onChange={productInfoHandler}
            className="productDetails"
          />
        </div>
        <div className="marign-left">
          <span>????????????</span>
          <button type="button" onClick={() => themeHandler('??????')}>
            ??????
          </button>
          <button type="button" onClick={() => themeHandler('??????')}>
            ??????
          </button>
          <button type="button" onClick={() => themeHandler('??????')}>
            ??????
          </button>
          <button type="button" onClick={() => themeHandler('??????')}>
            ??????
          </button>
          <button type="button" onClick={() => themeHandler('??????')}>
            ??????
          </button>
          <button type="button" onClick={() => themeHandler('??????')}>
            ??????
          </button>
          <span>
            {productInfo.theme ? productInfo.theme : '<< ??????????????????'}
          </span>
        </div>
        <div>
          <span className="leftMargin">?????? ?????????</span>
          <input
            type="text"
            value={productInfo.info.size}
            className="lesswidth productSize"
            onChange={productInfoHandler}
          />
          <span className="canvasSize">??? ???</span>
          <input
            type="text"
            value={productInfo.info.canvas}
            className="lesswidth textright"
            onChange={productInfoHandler}
          />
          <span>???</span>
        </div>
        <div>
          <span>????????????</span>
          <input
            type="text"
            value={productInfo.info.createdAt}
            className="createdAt"
            onChange={productInfoHandler}
          />
        </div>
        <div>
          <span>??????</span>
          <input
            type="text"
            value={productInfo.price}
            className="price"
            onChange={productInfoHandler}
          />
        </div>
        <div>
          <span>?????? ?????????</span>
          <img src={editImage} alt="???????????????" />
          <input
            type="checkbox"
            className="checkbox"
            onClick={setImageProductInfo}
          />
          <span>?????? ???????????? ??????</span>
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
          ??????
        </button>
        <button type="button" onClick={NO} className="nobutton">
          ?????????
        </button>
      </ButtonWrap>
    </AdminEditProductWrap>
  );
};

export default AdminEnrollProduct;
